"use client";

import { useState, useEffect } from "react";
import Canvas from "./Canvas";
import ChatBox from "./ChatBox";
import ColorPicker from "./ColorPicker";
import Modal from "./Modal";
import NameModal from "./NameModal";
import { createClient } from "@supabase/supabase-js";

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

export default function Place({ userAgent }: { userAgent: string | null }) {
  const [userName, setUserName] = useState("");
  // coords of pixel selected
  const [select, setSelect] = useState({ x: 0, y: 0 });
  // database change listener
  const [changeListener, setChangeListener] = useState<any>();
  // states for disconnect modal
  const [disconnected, setDisconnected] = useState(false);

  // subscribe to all public database changes
  supabase
    .channel("schema-db-changes")
    .on("postgres_changes", { event: "*", schema: "public" }, (payload) => {
      setChangeListener(payload);
    })
    .subscribe();

  // show disconnect modal for three seconds
  function handleDisconnect() {
    setDisconnected(true);
    setTimeout(() => {
      setDisconnected(false);
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
    if (data === null) setDisconnected(true);
    return data;
  }

  // fetch last 20 rows from messages
  async function fetchMessages() {
    const { data, error } = await supabase.rpc("messages_desc").limit(20);
    console.log("Fetched messages:", data, error);
    if (data === null) setDisconnected(true);
    return data;
  }

  // show name modal on load
  useEffect(() => {
    document.addEventListener("visibilitychange", () => {
      setChangeListener(document.visibilityState);
    });
  }, []);

  return (
    <>
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
        onPick={(color: number) => insertCanvas(select.x, select.y, color)}
      ></ColorPicker>

      <NameModal
        userName={userName}
        setUserName={setUserName}
        userAgent={userAgent}
      ></NameModal>

      <Modal className={disconnected ? "" : "hidden"}>
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
    </>
  );
}
