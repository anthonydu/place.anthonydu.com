import { Metadata } from "next";
import Place from "./_components/Place";

export const metadata: Metadata = {
  title: "An r/place Clone | by Anthony Du",
  description: "A realtime r/place clone with live chat, made by Anthony Du.",
  viewport: {
    width: "device-width",
    initialScale: 1,
    viewportFit: "cover",
  },
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "dimgray" },
    { media: "(prefers-color-scheme: light)", color: "white" },
  ],
  openGraph: {
    title: "An r/place Clone",
    description: "A realtime r/place clone with live chat, made by Anthony Du.",
    url: "/",
    siteName: "Anthony Du",
    locale: "en_US",
    type: "website",
  },
  alternates: {
    canonical: "/",
  },
  appleWebApp: {
    capable: true,
    title: "r/place",
    statusBarStyle: "black-translucent",
  },
  manifest: "/manifest.json",
};

export default function Home() {
  return <Place></Place>;
}
