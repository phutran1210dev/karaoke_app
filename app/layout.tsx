import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "🎤Karaoke Lab - Cute Dancing Girl",
  description: "Sing along with our adorable dancing girl character in this kawaii karaoke app!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
