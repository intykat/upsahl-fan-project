export default function RootLayout({ children }) {
    return (
      <html>
        <head>
          <title>Next.js Layouts</title>
        </head>
        <body>{children}</body>
      </html>
    );
  }