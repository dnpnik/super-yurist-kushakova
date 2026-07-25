import Script from "next/script";
import { siteMarkup } from "./site-markup";

export default function Home() {
  return (
    <>
      <div suppressHydrationWarning dangerouslySetInnerHTML={{ __html: siteMarkup }} />
      <Script src="/script.js?v=20260726" strategy="afterInteractive" />
    </>
  );
}