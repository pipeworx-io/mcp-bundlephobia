# mcp-bundlephobia

Bundlephobia MCP — npm bundle-size analysis

Part of [Pipeworx](https://pipeworx.io) — an MCP gateway connecting AI agents to 965+ live data sources.

## Tools

| Tool | Description |
|------|-------------|
| `size` | Bundle size analysis — minified + gzipped, tree-shakeability, dependencies, esm/cjs detection. |
| `similar` | Return npm packages with similar functionality to the given package, each with their minified + gzipped bundle sizes, to aid migration or replacement decisions. |
| `history` | Fetch minified + gzipped bundle size for each of up to 5 specified versions of an npm package and return them side-by-side for size regression tracking. |
| `recent_searches` | Return the list of npm packages most recently measured on bundlephobia.com, showing current community interest in bundle-size analysis. |

## Quick Start

Add to your MCP client (Claude Desktop, Cursor, Windsurf, etc.):

```json
{
  "mcpServers": {
    "bundlephobia": {
      "url": "https://gateway.pipeworx.io/bundlephobia/mcp"
    }
  }
}
```

Or connect to the full Pipeworx gateway for access to all 965+ data sources:

```json
{
  "mcpServers": {
    "pipeworx": {
      "url": "https://gateway.pipeworx.io/mcp"
    }
  }
}
```

## Using with ask_pipeworx

Instead of calling tools directly, you can ask questions in plain English:

```
ask_pipeworx({ question: "your question about Bundlephobia data" })
```

The gateway picks the right tool and fills the arguments automatically.

## More

- [All tools and guides](https://github.com/pipeworx-io/examples)
- [pipeworx.io](https://pipeworx.io)

## License

MIT
