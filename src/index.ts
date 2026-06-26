interface McpToolDefinition {
  name: string;
  description: string;
  inputSchema: {
    type: 'object';
    properties: Record<string, unknown>;
    required?: string[];
  };
}

interface McpToolExport {
  tools: McpToolDefinition[];
  callTool: (name: string, args: Record<string, unknown>) => Promise<unknown>;
  meter?: { credits: number };
  cost?: Record<string, unknown>;
  provider?: string;
}

/**
 * Bundlephobia MCP — npm bundle-size analysis
 *
 * Auth: none. Bundlephobia's first measurement for a new package@version
 * can take 5-30s as it builds + measures on demand. Cached results are
 * fast. Worth setting a generous timeout in agent callers.
 */


const BASE = 'https://bundlephobia.com/api';

const tools: McpToolExport['tools'] = [
  {
    name: 'size',
    description: 'Bundle size analysis — minified + gzipped, tree-shakeability, dependencies, esm/cjs detection.',
    inputSchema: {
      type: 'object',
      properties: {
        package: { type: 'string', description: 'npm package name (scoped allowed)' },
        version: { type: 'string', description: 'Specific version (default latest)' },
        record: { type: 'boolean', description: 'Record the lookup publicly (default true)' },
      },
      required: ['package'],
    },
  },
  {
    name: 'similar',
    description: 'Return npm packages with similar functionality to the given package, each with their minified + gzipped bundle sizes, to aid migration or replacement decisions.',
    inputSchema: {
      type: 'object',
      properties: {
        package: { type: 'string' },
        version: { type: 'string' },
      },
      required: ['package'],
    },
  },
  {
    name: 'history',
    description: 'Fetch minified + gzipped bundle size for each of up to 5 specified versions of an npm package and return them side-by-side for size regression tracking.',
    inputSchema: {
      type: 'object',
      properties: {
        package: { type: 'string' },
        versions: { type: 'string', description: 'Comma-sep version list (max 5 to avoid timeouts)' },
      },
      required: ['package', 'versions'],
    },
  },
  {
    name: 'recent_searches',
    description: 'Return the list of npm packages most recently measured on bundlephobia.com, showing current community interest in bundle-size analysis.',
    inputSchema: { type: 'object', properties: {} },
  },
];

async function callTool(name: string, args: Record<string, unknown>): Promise<unknown> {
  switch (name) {
    case 'size': {
      const pkg = buildPkgArg(reqStr(args, 'package', '"react"'), args.version as string | undefined);
      const params = new URLSearchParams({ package: pkg });
      if (args.record === false) params.set('record', 'false');
      return bpGet(`/size?${params}`);
    }
    case 'similar': {
      const pkg = buildPkgArg(reqStr(args, 'package', '"lodash"'), args.version as string | undefined);
      return bpGet(`/similar-packages?package=${encodeURIComponent(pkg)}`);
    }
    case 'history': {
      const pkg = reqStr(args, 'package', '"react"');
      const versions = reqStr(args, 'versions', '"18.0.0,18.1.0,18.2.0"').split(',').map((v) => v.trim()).filter(Boolean).slice(0, 5);
      const results: { version: string; size?: unknown; error?: string }[] = [];
      for (const v of versions) {
        try {
          const data = await bpGet(`/size?package=${encodeURIComponent(`${pkg}@${v}`)}`);
          results.push({ version: v, size: data });
        } catch (e) {
          results.push({ version: v, error: (e as Error).message });
        }
      }
      return { package: pkg, history: results };
    }
    case 'recent_searches':
      return bpGet('/recent-history');
    default:
      throw new Error(`Unknown tool: ${name}`);
  }
}

function buildPkgArg(pkg: string, version?: string): string {
  return version && version.trim() ? `${pkg}@${version.trim()}` : pkg;
}

async function bpGet(path: string) {
  const res = await fetch(`${BASE}${path}`, {
    headers: {
      Accept: 'application/json',
      'User-Agent': 'pipeworx-mcp-bundlephobia/1.0 (+https://pipeworx.io)',
    },
  });
  if (res.status === 404) throw new Error('Bundlephobia: not found');
  if (res.status === 429) throw new Error('Bundlephobia: rate-limit (HTTP 429)');
  if (!res.ok) {
    const t = await res.text();
    throw new Error(`Bundlephobia error: ${res.status} ${t.slice(0, 200)}`);
  }
  return res.json();
}

function reqStr(args: Record<string, unknown>, key: string, example: string): string {
  const v = args[key];
  if (typeof v !== 'string' || !v.trim()) {
    throw new Error(`Required argument "${key}" is missing. Pass a string like ${example}.`);
  }
  return v;
}

export default { tools, callTool, meter: { credits: 1 } } satisfies McpToolExport;
