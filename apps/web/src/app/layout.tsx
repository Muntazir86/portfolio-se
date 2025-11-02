import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ghulam Shabbir - Full Stack Developer",
  description: "Interactive portfolio showcasing full-stack development expertise with modern web technologies",
  keywords: ["Full Stack Developer", "React", "Node.js", "TypeScript", "Portfolio"],
  authors: [{ name: "Ghulam Shabbir" }],
  openGraph: {
    title: "Ghulam Shabbir - Full Stack Developer",
    description: "Interactive portfolio showcasing full-stack development expertise",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}
      >
        {children}
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
