import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Юридические услуги | Кушакова Юлия Вячеславовна",
  description:
    "Юридические услуги Кушаковой Юлии Вячеславовны в Омске. Консультации, документы, споры и представительство.",
  icons: {
    icon: "/assets/favicon.svg",
    shortcut: "/assets/favicon.svg",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru">
      <head>
        <meta name="theme-color" content="#111312" />
        <link rel="preload" href="/assets/themis.png" as="image" />
      </head>
      <body>{children}</body>
    </html>
  );
}