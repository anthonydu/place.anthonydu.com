import { ComponentProps, useEffect, useRef, useState } from "react";
import Loading from "./Loading";

export default function ChatBox({
  fetchMessages,
  userName,
  onSend,
  changeListener,
}: {
  fetchMessages: () => Promise<
    [{ id: number; sender_name: string; body_text: string }]
  >;
  userName: string;
  onSend: (message: string) => Promise<void>;
  changeListener: any;
}) {
  const [chatting, setChatting] = useState(false);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] =
    useState<[{ id: number; sender_name: string; body_text: string }]>();

  useEffect(() => {
    fetchMessages().then((messages) => {
      setMessages(messages);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [changeListener]);

  return (
    <>
      <button
        className="absolute bottom-6 left-6 rounded-full bg-white p-1 font-semibold shadow-md transition-all"
        onClick={() => setChatting(!chatting)}
        aria-label="Chat"
      >
        <ChatIcon className="h-6 w-6"></ChatIcon>
      </button>
      <div
        className={`absolute bottom-16 left-6 flex h-96 w-80 flex-col gap-2 rounded-lg border bg-white p-2 shadow-lg transition-all ${
          chatting ? "visible opacity-100" : "invisible opacity-0"
        } max-[368px]:left-1/2 max-[368px]:-translate-x-1/2 max-[320px]:w-72`}
      >
        <div>
          <button
            className="m-1 block h-5 w-5 rounded-full bg-red-500 md:h-3 md:w-3"
            onClick={() => setChatting(false)}
          ></button>
        </div>
        <div
          className="flex h-full flex-col-reverse overflow-scroll rounded-md bg-slate-100 p-2 shadow-inner"
          ref={scrollRef}
        >
          {messages?.map(({ id, sender_name, body_text }) => {
            const nameMatches = userName === sender_name;
            const align = nameMatches ? "end" : "start";
            let anonId = 0;
            new TextEncoder().encode(sender_name).forEach((n) => {
              anonId += n;
            });
            const displayName = nameMatches
              ? `${userName} (anon_${anonId})`
              : `anon_${anonId}`;
            scrollRef.current?.scrollTo(0, scrollRef.current?.scrollHeight);
            return (
              <div
                className="flex max-w-[80%] flex-col"
                key={id}
                style={{ alignItems: align, alignSelf: align }}
              >
                <p style={{ textAlign: align }}>
                  <small>{displayName}</small>
                </p>
                <p className="w-fit rounded bg-slate-200 px-2 py-1">
                  {body_text}
                </p>
              </div>
            );
          })}
        </div>
        <form
          className="flex h-10 flex-row gap-2"
          onSubmit={(e) => e.preventDefault()}
        >
          <input className="w-full rounded-md bg-slate-100 px-2 shadow-inner"></input>
          <button
            className="flex w-16 items-center justify-center rounded-md border"
            type="submit"
            onClick={(e) => {
              const input = e.currentTarget.previousSibling as HTMLInputElement;
              if (input.value === "") {
                return;
              } else {
                setLoading(true);
                onSend(input.value).then(() => {
                  setLoading(false);
                  input.value = "";
                });
              }
            }}
          >
            {loading ? <Loading></Loading> : "Send"}
          </button>
        </form>
      </div>
    </>
  );
}

function ChatIcon(props: ComponentProps<"svg">) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M7 4C4.79086 4 3 5.79073 3 7.9997V13.2642C3 15.4732 4.79086 17.2639 7 17.2639L7 19.8998C7 19.9834 7.09639 20.0301 7.16197 19.9783L10.6 17.2639H17C19.2091 17.2639 21 15.4732 21 13.2642V7.99971C21 5.79073 19.2091 4 17 4H7Z"
        stroke="#000000"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M9 11C9 11.5523 8.55228 12 8 12C7.44772 12 7 11.5523 7 11C7 10.4477 7.44772 10 8 10C8.55228 10 9 10.4477 9 11Z"
        fill="#000000"
      />
      <path
        d="M13 11C13 11.5523 12.5523 12 12 12C11.4477 12 11 11.5523 11 11C11 10.4477 11.4477 10 12 10C12.5523 10 13 10.4477 13 11Z"
        fill="#000000"
      />
      <path
        d="M17 11C17 11.5523 16.5523 12 16 12C15.4477 12 15 11.5523 15 11C15 10.4477 15.4477 10 16 10C16.5523 10 17 10.4477 17 11Z"
        fill="#000000"
      />
    </svg>
  );
}
