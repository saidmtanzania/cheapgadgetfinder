import Script from "next/script";

const clientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT?.trim();

export function AdSenseScript() {
  if (!clientId) {
    return null;
  }

  return (
    <Script
      id="adsense-script"
      strategy="afterInteractive"
      async
      crossOrigin="anonymous"
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${clientId}`}
    />
  );
}
