import { useState } from "react";
import React from "react";
import { words } from "@/words";
import { sendMessage } from "./socketConnection";
import { ECardStatus } from "@/constants/enums";

type ICard = {
  word: string;
  color: string;
  status: ECardStatus;
};

export default function StartGame() {
  const [cardsAmount] = useState<number>(25);
  const [cards, setCards] = useState<ICard[]>([]);
  const [randomizedWords] = useState(getRandomItems(words, 25));

  function getRandomItems<T>(array: T[], count: number): T[] {
    const shuffled = array.slice().sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }

  const starting = () => {
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
    setCards(newItems);
    sendMessage("startGame", newItems);
    console.log(newItems);
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
