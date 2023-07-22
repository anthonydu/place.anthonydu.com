import Script from "next/script";
import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://place.anthonydu.com"),
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: true,
      follow: true,
      noarchive: true,
    },
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

        {/* Hotjar Tracking Code for r/place */}
        <Script id="hotjar">
          {`
          (function(h,o,t,j,a,r){
            h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
            h._hjSettings={hjid:3579231,hjsv:6};
            a=o.getElementsByTagName('head')[0];
            r=o.createElement('script');r.async=1;
            r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
            a.appendChild(r);
          })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
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
