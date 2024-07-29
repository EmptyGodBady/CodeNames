import { PropsWithChildren, useState } from "react";

type Props = PropsWithChildren<{
  word: string;
  color?: string;
  status: string;
  isColumnUserSpy: boolean;
}>;

export default function Card({ word, color, status, isColumnUserSpy }: Props) {
  const [cardStatus, setCardStatus] = useState(status);

  const flipCard = () => {
    setCardStatus("open");
  };
  console.log(color);
  return (
    <>
      {color === "red" && (cardStatus === "open" || isColumnUserSpy) && (
        <div
          onClick={flipCard}
          className={`text-black select-none cursor-pointer m-2 text-xl text-center  rounded-2xl h-[100px] w-[160px] bg-red-500 shadow-2xl py-8 border  `}
        >
          {word}
        </div>
      )}

      {color === "white" && (cardStatus === "open" || isColumnUserSpy) && (
        <div
          onClick={flipCard}
          className={`text-black select-none cursor-pointer m-2 text-xl text-center  rounded-2xl h-[100px] w-[160px] bg-neutral-300 shadow-2xl py-8 border  `}
        >
          {word}
        </div>
      )}

      {color === "blue" && (cardStatus === "open" || isColumnUserSpy) && (
        <div
          onClick={flipCard}
          className={`text-black select-none cursor-pointer m-2 text-xl text-center  rounded-2xl h-[100px] w-[160px] bg-blue-300 shadow-2xl py-8 border  `}
        >
          {word}
        </div>
      )}

      {color === "dark" && (cardStatus === "open" || isColumnUserSpy) && (
        <div
          onClick={flipCard}
          className={`text-white select-none cursor-pointer m-2 text-xl text-center  rounded-2xl h-[100px] w-[160px] bg-black shadow-2xl py-8 border  `}
        >
          {word}
        </div>
      )}

      {!isColumnUserSpy && cardStatus === "close" && (
        <div
          onClick={flipCard}
          className="className={`text-black select-none cursor-pointer m-2 text-xl text-center  rounded-2xl h-[100px] w-[160px] bg-neutral-300 shadow-2xl py-8 border bg-opacity-50"
        >
          {word}
        </div>
      )}
    </>
  );
}
