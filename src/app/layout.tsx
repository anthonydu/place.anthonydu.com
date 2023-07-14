import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "An r/place Clone | by Anthony Du",
  description: "An r/place clone made by Anthony Du.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
