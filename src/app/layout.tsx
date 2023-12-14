import Script from "next/script";
import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://place.anthonydu.com"),
  robots: {
    follow: false,
    noarchive: true,
    noimageindex: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}

        {/* Default Statcounter code for r/place https://place.anthonydu.com */}
        <Script id="statcounter">
          {`
          var sc_project=12901741; 
          var sc_invisible=1; 
          var sc_security="4f65a7c4";
        `}
        </Script>
        <Script
          src="https://www.statcounter.com/counter/counter.js"
          async
        ></Script>
        {/* End of Statcounter Code */}

        {/* Google tag (gtag.js) */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-0X7HCECWPX"
        ></Script>
        <Script id="ga4">
          {`
          window.dataLayer = window.dataLayer || [];
          function gtag() {
            dataLayer.push(arguments);
          }
          gtag("js", new Date());

          gtag("config", "G-0X7HCECWPX");
        `}
        </Script>

        <Script
          async
          data-id="101416538"
          src="//static.getclicky.com/js"
        ></Script>
        <Script
          data-goatcounter="https://anthonydu.goatcounter.com/count"
          async
          src="//gc.zgo.at/count.js"
        ></Script>
      </body>
    </html>
  );
}
