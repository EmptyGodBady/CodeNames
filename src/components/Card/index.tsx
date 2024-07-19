import { PropsWithChildren } from "react";

type Props = PropsWithChildren<{
  content: string;
}>;

export default function Card({ content }: Props) {
  return (
    <div className="text-black select-none cursor-pointer m-2 text-xl text-center  rounded-2xl h-[100px] w-[160px] bg-neutral-300 shadow-2xl py-8 border bg-opacity-50">
      {content}
    </div>
  );
}
