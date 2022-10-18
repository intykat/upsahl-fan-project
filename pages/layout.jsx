export default function RootLayout({ children }) {
    return (
      <html>
        <head>
          <title>Next.js Layouts RFC in 5 Minutes</title>
        </head>
        <body>{children}</body>
      </html>
    );
  }