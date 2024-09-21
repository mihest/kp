import { Html, Head, Main, NextScript } from "next/document";

export default function _document() {
  return (
    <Html lang="ru" className="scroll-smooth">
      <Head>
          <link rel="icon" type="image/x-icon" href="/logo.png"/>
      </Head>
      <body className="min-h-screen">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
