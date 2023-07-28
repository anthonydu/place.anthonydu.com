import Image from "next/image";
import { ComponentProps, useEffect, useState } from "react";

export default function AddToHomeScreen({
  className,
  ...props
}: ComponentProps<"div">) {
  const [isIos, setIsIos] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    setIsIos(
      window.navigator.userAgent.includes("iPhone") ||
        window.navigator.userAgent.includes("iPad"),
    );
    setIsInstalled((window.navigator as any).standalone);
  }, []);

  return (
    <div
      className={`fixed bottom-0 left-1/2 flex w-screen -translate-x-1/2 flex-row items-center justify-center gap-3 border-t bg-white p-4 font-[-apple-system,theme("fontFamily.sans")] font-light transition-all ${
        isIos && !isInstalled ? "translate-y-0" : "translate-y-full"
      } ${className}`}
      {...props}
    >
      <Image
        className="h-12 w-12 rounded-xl"
        src="/icon4.png"
        alt="App Icon"
        width={512}
        height={512}
        priority={true}
      ></Image>
      <p>
        {"This app can be installed onto your device. Just tap "}
        <ShareIcon className="inline-block"></ShareIcon>
        {" and then Add to Home Screen "}
        <PlusAppIcon className="inline-block"></PlusAppIcon>
        {"."}
      </p>
    </div>
  );
}

function ShareIcon(props: ComponentProps<"svg">) {
  return (
    <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width="17.334"
      height="23.4863"
      {...props}
    >
      <g>
        <rect height="23.4863" opacity="0" width="17.334" x="0" y="0" />
        <path
          d="M3.06641 22.041L14.2676 22.041C16.3086 22.041 17.334 21.0254 17.334 19.0137L17.334 9.26758C17.334 7.25586 16.3086 6.24023 14.2676 6.24023L11.543 6.24023L11.543 7.8125L14.2383 7.8125C15.2051 7.8125 15.7617 8.33984 15.7617 9.35547L15.7617 18.9258C15.7617 19.9414 15.2051 20.4688 14.2383 20.4688L3.08594 20.4688C2.10938 20.4688 1.57227 19.9414 1.57227 18.9258L1.57227 9.35547C1.57227 8.33984 2.10938 7.8125 3.08594 7.8125L5.79102 7.8125L5.79102 6.24023L3.06641 6.24023C1.02539 6.24023 0 7.25586 0 9.26758L0 19.0137C0 21.0254 1.02539 22.041 3.06641 22.041ZM8.66211 14.3945C9.08203 14.3945 9.44336 14.043 9.44336 13.6328L9.44336 3.60352L9.38477 2.13867L10.0391 2.83203L11.5234 4.41406C11.6602 4.57031 11.8555 4.64844 12.0508 4.64844C12.4512 4.64844 12.7637 4.35547 12.7637 3.95508C12.7637 3.75 12.6758 3.59375 12.5293 3.44727L9.22852 0.263672C9.0332 0.0683594 8.86719 0 8.66211 0C8.4668 0 8.30078 0.0683594 8.0957 0.263672L4.79492 3.44727C4.64844 3.59375 4.57031 3.75 4.57031 3.95508C4.57031 4.35547 4.86328 4.64844 5.27344 4.64844C5.45898 4.64844 5.67383 4.57031 5.81055 4.41406L7.28516 2.83203L7.94922 2.13867L7.89062 3.60352L7.89062 13.6328C7.89062 14.043 8.24219 14.3945 8.66211 14.3945Z"
          fill="#007aff"
        />
      </g>
    </svg>
  );
}

function PlusAppIcon(props: ComponentProps<"svg">) {
  return (
    <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width="18.0078"
      height="17.9395"
      {...props}
    >
      <g>
        <rect height="17.9395" opacity="0" width="18.0078" x="0" y="0" />
        <path
          d="M16.8652 1.17188C15.8691 0.175781 14.4629 0.0195312 12.793 0.0195312L5.18555 0.0195312C3.54492 0.0195312 2.13867 0.175781 1.14258 1.17188C0.146484 2.16797 0 3.56445 0 5.19531L0 12.7344C0 14.4043 0.146484 15.791 1.14258 16.7871C2.13867 17.7832 3.54492 17.9395 5.20508 17.9395L12.793 17.9395C14.4629 17.9395 15.8691 17.7832 16.8652 16.7871C17.8613 15.791 18.0078 14.4043 18.0078 12.7344L18.0078 5.22461C18.0078 3.55469 17.8613 2.1582 16.8652 1.17188ZM16.4355 4.95117L16.4355 12.998C16.4355 14.0137 16.3086 15.0488 15.7129 15.6445C15.127 16.2305 14.0723 16.3672 13.0664 16.3672L4.94141 16.3672C3.93555 16.3672 2.88086 16.2305 2.28516 15.6445C1.69922 15.0488 1.57227 14.0137 1.57227 12.998L1.57227 4.98047C1.57227 3.95508 1.69922 2.90039 2.28516 2.31445C2.88086 1.71875 3.94531 1.5918 4.9707 1.5918L13.0664 1.5918C14.0723 1.5918 15.127 1.72852 15.7129 2.31445C16.3086 2.91016 16.4355 3.94531 16.4355 4.95117ZM4.48242 8.96484C4.48242 9.44336 4.82422 9.76562 5.32227 9.76562L8.19336 9.76562L8.19336 12.6465C8.19336 13.1348 8.51562 13.4766 8.99414 13.4766C9.48242 13.4766 9.82422 13.1445 9.82422 12.6465L9.82422 9.76562L12.7051 9.76562C13.1934 9.76562 13.5352 9.44336 13.5352 8.96484C13.5352 8.47656 13.1934 8.13477 12.7051 8.13477L9.82422 8.13477L9.82422 5.26367C9.82422 4.76562 9.48242 4.42383 8.99414 4.42383C8.51562 4.42383 8.19336 4.76562 8.19336 5.26367L8.19336 8.13477L5.32227 8.13477C4.81445 8.13477 4.48242 8.47656 4.48242 8.96484Z"
          fill="#000000"
        />
      </g>
    </svg>
  );
}
