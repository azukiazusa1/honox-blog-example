import { Style, css } from "hono/css";
import { jsxRenderer } from "hono/jsx-renderer";
import { Script } from "honox/server";
import { Layout } from "../components/Layout";

export default jsxRenderer(({ children, title }) => {
  return (
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{title}</title>
        <Script src="/app/client.ts" />
        <Style>
          {css`
            html {
              font-size: 16px;
              font-family: system-ui, sans-serif;
            }
            body {
              min-height: 100vh;
              color: #262626;
              background-color: #f4f4f4;
            }
            *,
            *::before,
            *::after {
              box-sizing: border-box;
              margin: 0;
              padding: 0;
            }
          }`}
        </Style>
      </head>
      <body>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
});
