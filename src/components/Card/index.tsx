import { PropsWithChildren } from "react";

type Props = PropsWithChildren<{
  word: string;
  color: string;
  status: string;
}>;

export default function Card({ word, color, status }: Props) {
  const cardStatus = status;
  return (
    <div
      className={`text-black select-none cursor-pointer m-2 text-xl text-center  rounded-2xl h-[100px] w-[160px] bg-neutral-300 shadow-2xl py-8 border bg-opacity-50 ${color}`}
    >
      {word}
    </div>
  );
}
