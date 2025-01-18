export default function Layout({ children }) {
    return (
      <html lang="en">
        <head>
          <title>URL Redirection Tracing</title>
          <link rel="icon" href="/favicon.ico" />
        </head>
        <body>{children}</body>
      </html>
    );
  }
  