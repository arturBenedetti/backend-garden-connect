import type { Request, Response } from "express";

/** Pin major version so production UI does not break on upstream changes. */
const SWAGGER_UI_DIST = "https://unpkg.com/swagger-ui-dist@5.11.0";

/**
 * Serves Swagger UI without reading local node_modules (works on Vercel serverless).
 * Spec is loaded from the same origin as `specPath` (default `/openapi.json`).
 */
export function serveSwaggerUi(specPath = "/openapi.json") {
  return (_req: Request, res: Response) => {
    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Garden Connect API</title>
  <link rel="stylesheet" href="${SWAGGER_UI_DIST}/swagger-ui.css" crossorigin="anonymous" />
  <style>html { box-sizing: border-box; } *, *::before, *::after { box-sizing: inherit; } body { margin: 0; }</style>
</head>
<body>
  <div id="swagger-ui"></div>
  <script src="${SWAGGER_UI_DIST}/swagger-ui-bundle.js" crossorigin="anonymous"></script>
  <script src="${SWAGGER_UI_DIST}/swagger-ui-standalone-preset.js" crossorigin="anonymous"></script>
  <script>
    window.onload = function () {
      window.ui = SwaggerUIBundle({
        url: ${JSON.stringify(specPath)},
        dom_id: "#swagger-ui",
        deepLinking: true,
        presets: [SwaggerUIBundle.presets.apis, SwaggerUIStandalonePreset],
        layout: "StandaloneLayout",
      });
    };
  </script>
</body>
</html>`;
    res.type("html").send(html);
  };
}
