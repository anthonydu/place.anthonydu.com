"use client";

import { useRef, useState } from "react";
import Canvas from "./_components/Canvas";
import ColorPicker from "./_components/ColorPicker";
import { createClient } from "@supabase/supabase-js";
import { colors } from "./colors.json";
import Dialog from "./_components/Dialog";

const supabase = createClient(
  "https://rgghvleqgupatnabbmha.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJnZ2h2bGVxZ3VwYXRuYWJibWhhIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODk0MjE4OTYsImV4cCI6MjAwNDk5Nzg5Nn0.NLCk86SSkHPDFJRmpoXFxmrgtIupReVwg-krMw_htPc",
);

export default function Home() {
  const [select, setSelect] = useState({ x: 0, y: 0 });
  const [picking, setPicking] = useState(false);
  const [changeListener, setChangeListener] = useState<{
    [key: string]: any;
  }>();
  const dialogRef = useRef<HTMLDialogElement>(null);

  supabase
    .channel("*")
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "canvas" },
      (payload) => {
        setChangeListener(payload);
      },
    )
    .subscribe();

  async function insert(x: number, y: number, color: number) {
    const { data, error } = await supabase
      .from("canvas")
      .insert([{ x: x, y: y, color: color }])
      .select();
    console.log("Inserted: ", data, error);
    if (data == null) {
      dialogRef.current?.showModal();
      setTimeout(() => {
        dialogRef.current?.close();
      }, 3000);
    }
  }

  async function fetch() {
    const { data, error } = await supabase.rpc("latest_canvas");
    console.log("Fetched: ", data, error);
    if (data === null) {
      dialogRef.current?.showModal();
    }
    return data;
  }

  return (
    <main className="font-['Trebuchet_MS']">
      <Canvas
        width="100vw"
        height="100vh"
        size={500}
        pixelSize={8}
        changeListener={changeListener}
        fetch={fetch}
        select={select}
        setSelect={setSelect}
      ></Canvas>
      <button
        className={`absolute bottom-2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white px-10 py-1 font-semibold shadow-md`}
        onClick={() => setPicking(true)}
      >
        Place&nbsp;a&nbsp;Pixel
      </button>
      <ColorPicker
        className={`${
          picking
            ? "visible translate-y-0 opacity-100"
            : "invisible translate-y-[100px] opacity-0"
        } fixed bottom-0 left-0 w-screen transition-all`}
        colors={colors}
        onPick={(color: number) => {
          insert(select.x, select.y, color);
          setPicking(false);
        }}
        onCancel={() => setPicking(false)}
      ></ColorPicker>
      <Dialog ref={dialogRef}></Dialog>
    </main>
  );
}
