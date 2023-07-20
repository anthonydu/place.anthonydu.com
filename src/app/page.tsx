"use client";

import { useEffect, useRef, useState } from "react";
import Canvas from "./_components/Canvas";
import ColorPicker from "./_components/ColorPicker";
import { createClient } from "@supabase/supabase-js";
import { colors } from "./colors.json";
import Modal from "./_components/Modal";
import ChatBox from "./_components/ChatBox";
import NameModal from "./_components/NameModal";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_KEY!,
);

async function getPublicIpAddress() {
  try {
    const res = await fetch("https://api.ipify.org");
    return res.text();
  } catch {
    return null;
  }
}

export default function Home() {
  const [userName, setUserName] = useState("");
  // coords of pixel selected
  const [select, setSelect] = useState({ x: 0, y: 0 });
  // database change listener
  const [changeListener, setChangeListener] = useState<any>();
  // refs to modals
  const disconnectRef = useRef<HTMLDialogElement>(null);
  const nameRef = useRef<HTMLDialogElement>(null);

  // subscribe to all public database changes
  supabase
    .channel("schema-db-changes")
    .on("postgres_changes", { event: "*", schema: "public" }, (payload) => {
      setChangeListener(payload);
    })
    .subscribe();

  // show disconnect modal for three seconds
  function handleDisconnect() {
    disconnectRef.current?.showModal();
    setTimeout(() => {
      disconnectRef.current?.close();
    }, 3000);
  }

  // insert row to canvas
  async function insertCanvas(x: number, y: number, color: number) {
    const ip: string | null = await Promise.resolve(getPublicIpAddress());
    if (ip === null) {
      handleDisconnect();
      return;
    }
    const { data, error } = await supabase
      .from("canvas")
      .insert({ x: x, y: y, color: color, ip: ip, name: userName })
      .select();
    console.log("Inserted canvas:", data, error);
    if (data == null) handleDisconnect();
    setChangeListener(fetchCanvas());
  }

  // insert row to messages
  async function insertMessages(sender_name: string, body_text: string) {
    const ip: string | null = await Promise.resolve(getPublicIpAddress());
    if (ip === null) {
      handleDisconnect();
      return;
    }
    const { data, error } = await supabase
      .from("messages")
      .insert({ sender_name: sender_name, body_text: body_text, ip: ip })
      .select();
    console.log("Inserted messages:", data, error);
    if (data == null) handleDisconnect();
    setChangeListener(fetchMessages());
  }

  // fetch latest rows from canvas
  async function fetchCanvas() {
    const { data, error } = await supabase.rpc("latest_canvas");
    console.log("Fetched canvas:", data, error);
    if (data === null) disconnectRef.current?.showModal();
    return data;
  }

  // fetch last 20 rows from messages
  async function fetchMessages() {
    const { data, error } = await supabase.rpc("messages_desc").limit(20);
    console.log("Fetched messages:", data, error);
    if (data === null) disconnectRef.current?.showModal();
    return data;
  }

  // show name modal on load
  useEffect(() => {
    nameRef.current?.showModal();
    document.addEventListener("visibilitychange", () => {
      setChangeListener(document.visibilityState);
    });
  }, []);

  return (
    <main className="font-['Trebuchet_MS']">
      <Canvas
        width="100vw"
        height="100vh"
        size={500}
        pixelSize={8}
        changeListener={changeListener}
        fetchCanvas={fetchCanvas}
        select={select}
        setSelect={setSelect}
      ></Canvas>

      <ChatBox
        userName={userName}
        fetchMessages={fetchMessages}
        changeListener={changeListener}
        onSend={(message: string) => insertMessages(userName, message)}
      ></ChatBox>

      <ColorPicker
        colors={colors}
        onPick={(color: number) => insertCanvas(select.x, select.y, color)}
      ></ColorPicker>

      <NameModal
        ref={nameRef}
        userName={userName}
        setUserName={setUserName}
      ></NameModal>

      <Modal ref={disconnectRef}>
        <div className="flex flex-col items-center gap-2">
          <p className="text-center">
            Connection failed!
            <br />
            Please check your internet
            <br />
            connection and try again.
          </p>
        </div>
      </Modal>
    </main>
  );
}
