import React, {
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import TeamColumn from "./TeamColumn";
import { ETeamIdentifiers } from "@/constants/enums";
import Card from "../Card";
import StartGame from "./startGame";

type Props = PropsWithChildren<{
  columnUsers: any;
  playerName: string;
  setColumnUsers: Dispatch<SetStateAction<undefined>>;
}>;

export default function MainGameComponent({
  columnUsers,
  playerName,
  setColumnUsers,
}: Props) {
  const [cards, setCards] = useState<any[]>([]);

  useEffect(() => {
    console.log("Cards state:", cards);
  }, [cards]);

  return (
    <div className="flex justify-between">
      {columnUsers && playerName && (
        <TeamColumn
          playerName={playerName}
          columnUsers={columnUsers}
          columnIdentifier={ETeamIdentifiers.TeamA}
          setColumnUsers={setColumnUsers}
        />
      )}

      <div className="flex flex-col items-center">
        <div className="flex w-[900px] h-[600px] flex-wrap content-start ">
          {cards &&
            cards.map((card: any, index: number) => (
              <Card
                key={index}
                word={card.word}
                color={card.color}
                status={card.status}
              />
            ))}
        </div>
        <StartGame setCards={setCards} />
      </div>

      {columnUsers && playerName && (
        <TeamColumn
          playerName={playerName}
          columnUsers={columnUsers}
          columnIdentifier={ETeamIdentifiers.TeamB}
          setColumnUsers={setColumnUsers}
        />
      )}
    </div>
  );
}
