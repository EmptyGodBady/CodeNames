import React, { PropsWithChildren } from "react";
import CopyTextButton from "./coppyLinkButton";
import StartGame from "./startGame";

type Props = PropsWithChildren<{
  playerName: string;
}>;

export default function Header({ playerName }: Props) {
  return (
    <header className="h-8 flex justify-between my-4 mx-5">
      <div>
        <CopyTextButton />
      </div>
      {/* <button onClick={sendMessage}>send message</button> */}
      <StartGame />
      <div className="inline-block rounded bg-neutral-700 px-6 pb-2 pt-2 text-xs font-medium leading-normal text-neutral-400 shadow-dark-3 w-[130px] text-center">
        {playerName}
      </div>
    </header>
  );
}
