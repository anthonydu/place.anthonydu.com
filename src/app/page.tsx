import { Metadata } from "next";
import Canvas from "./_components/Canvas";

export const metadata: Metadata = {
  viewport: {
    width: "device-width",
    initialScale: 1,
    userScalable: false,
  },
};

export default function Home() {
  return (
    <main>
      <Canvas></Canvas>
    </main>
  );
}
