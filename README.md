# mcp-bundlephobia

Bundlephobia MCP — npm bundle-size analysis

Part of [Pipeworx](https://pipeworx.io) — an MCP gateway connecting AI agents to 673+ live data sources.

## Tools

| Tool | Description |
|------|-------------|
| `size` | Bundle size analysis — minified + gzipped, tree-shakeability, dependencies, esm/cjs detection. |
| `similar` | Packages with similar functionality + their sizes (for migration planning). |
| `history` | Compare size across recent versions (fetches each version sequentially — slow for large lists). |
| `recent_searches` | What other people have recently been measuring on bundlephobia.com. |

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

Or connect to the full Pipeworx gateway for access to all 673+ data sources:

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
