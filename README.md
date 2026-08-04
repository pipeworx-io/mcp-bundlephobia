# @pipeworx/bundlephobia

Bundlephobia MCP — bundle-size analysis for npm packages. Reports minified + gzipped size, tree-shakeability, dependency count, build time estimates. Keyless.

Part of [Pipeworx](https://pipeworx.io) — an MCP gateway connecting AI agents to 1394+ live data sources.

## Tools

- `size(package, version?)` — bundle size for `package` (or `package@version`)
- `similar(package, version?)` — packages with similar functionality + their sizes
- `history(package, version?)` — size history across versions (heuristic: queries each version)
- `recent_searches()` — what other people have been measuring

## Notes

Bundlephobia is rate-limited and sometimes slow on first request (it builds + measures the package on demand). Subsequent requests for the same `package@version` are cached.

## Data source

`https://bundlephobia.com/api/`

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

Or connect to the full Pipeworx gateway for access to all 1394+ data sources:

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

- [Docs and guides](https://pipeworx.io/docs)
- [pipeworx.io](https://pipeworx.io)

## License

MIT
