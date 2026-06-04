const fs = require('fs');

const mdContent = fs.readFileSync('/home/zack-river/.gemini/antigravity-ide/brain/777b35e7-cf21-49ec-8df7-cba351f48b6d/API_Workflow_and_Relations.md', 'utf8');

const htmlContent = `<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>API Workflow Preview</title>
    <script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; padding: 40px; max-width: 1000px; margin: 0 auto; color: #333; }
        pre { background: #f6f8fa; padding: 16px; border-radius: 6px; overflow-x: auto; }
        code { font-family: ui-monospace, SFMono-Regular, SF Mono, Menlo, Consolas, Liberation Mono, monospace; background: #f6f8fa; padding: 2px 4px; border-radius: 4px; }
        pre code { padding: 0; background: transparent; }
        table { border-collapse: collapse; width: 100%; margin-bottom: 20px; }
        th, td { border: 1px solid #d0d7de; padding: 8px; text-align: left; }
        th { background-color: #f6f8fa; }
        h1, h2, h3 { border-bottom: 1px solid #eaecef; padding-bottom: 0.3em; margin-top: 24px; }
        .mermaid { text-align: center; margin: 30px 0; }
        @media print {
            body { padding: 0; }
            .mermaid { page-break-inside: avoid; }
        }
    </style>
</head>
<body>
    <div id="content"></div>
    <script type="module">
        import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.esm.min.mjs';
        
        const rawMd = \`${mdContent.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$/g, '\\$')}\`;
        
        const renderer = new marked.Renderer();
        const originalCodeRenderer = renderer.code.bind(renderer);
        renderer.code = function({text, lang, escaped}) {
            if (lang === 'mermaid') {
                return '<div class="mermaid">' + text + '</div>';
            }
            return originalCodeRenderer({text, lang, escaped});
        };
        
        document.getElementById('content').innerHTML = marked.parse(rawMd, { renderer: renderer });
        
        mermaid.initialize({ startOnLoad: true, theme: 'default' });
        setTimeout(() => mermaid.run(), 500);
    </script>
</body>
</html>`;

fs.writeFileSync('/home/zack-river/Documents/Projects/InProgress/Graduation/Ding-Platform-Backend/API_Workflow_Preview.html', htmlContent);
console.log('HTML Preview generated successfully!');
