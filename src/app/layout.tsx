import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "F8SYNC",
  description: "Personal fortune and timing intelligence platform"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="th">
      <body>{children}</body>
    </html>
  );
}
