import { Dispatch, PropsWithChildren, useState } from "react";
import React from "react";
import { words } from "@/words";
import { getCards, sendMessage } from "./socketConnection";
import { ECardStatus } from "@/constants/enums";
import clearCards from "../../../requesters/clearCards";

type ICard = {
  word: string;
  color: string;
  status: ECardStatus;
};
type Props = PropsWithChildren<{
  setCards: Dispatch<any>;
}>;

export default function StartGame({ setCards }: Props) {
  const [cardsAmount] = useState<number>(25);
  const [randomizedWords] = useState(getRandomItems(words, 25));

  function getRandomItems<T>(array: T[], count: number): T[] {
    const shuffled = array.slice().sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }

  const starting = async () => {
    const newItems: ICard[] = [];
    const colors = ["red", "blue", "dark", "white"];
    const colorCounts = [9, 9, 1, 6];

    let colorIndex = 0;
    let count = 0;

    for (let i = 0; i < cardsAmount; i++) {
      if (count === colorCounts[colorIndex]) {
        colorIndex++;
        count = 0;
      }

      newItems.push({
        word: randomizedWords[i],
        color: colors[colorIndex],
        status: ECardStatus.Hidden,
      });

      count++;
    }
    await clearCards();
    sendMessage<ICard[]>("startGame", newItems, setCards);
    try {
      const newCards = await getCards();
    } catch (error) {
      console.error("Failed to get cards:", error);
    }
  };

  return (
    <button
      className="border-b rounded-y-md border-black bg-neutral-800 overflow-hidden rounded-md w-3/4"
      onClick={starting}
    >
      Start Game
    </button>
  );
}
