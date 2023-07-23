import { Metadata } from "next";
import { headers } from "next/headers";
import Place from "./_components/Place";

export const metadata: Metadata = {
  title: "An r/place Clone | by Anthony Du",
  description: "A realtime r/place clone with live chat, made by Anthony Du.",
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
  appleWebApp: true,
};

export default function Home() {
  const userAgent = headers().get("user-agent");

  return (
    <main className="font-['Trebuchet_MS']">
      <Place userAgent={userAgent}></Place>
    </main>
  );
}
