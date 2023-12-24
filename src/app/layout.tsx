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

        {/* <!-- Default Statcounter code for anthonydu.com --> */}
        <Script type="text/javascript" id="statcounter">
          {`
            var sc_project=12802423; 
            var sc_invisible=1; 
            var sc_security="b192c111";
          `}
        </Script>
        <Script
          type="text/javascript"
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
      </body>
    </html>
  );
}
