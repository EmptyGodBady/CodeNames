import React, {
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useState,
} from "react";
import TeamColumn from "./TeamColumn";
import { ETeamIdentifiers, EUserRole } from "@/constants/enums";
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
  const [isHidden, setIsHidden] = useState(false);

  const isColumnUserSpy =
    columnUsers?.find((user: any) => user.name === playerName)?.userRole ===
    EUserRole.Spy;

  const toggleHidden = () => {
    setIsHidden(!isHidden);
  };

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
          {cards.map((card: any, index: number) => (
            <Card
              isColumnUserSpy={isColumnUserSpy}
              key={index}
              word={card.word}
              color={card.color}
              status={"close"}
            />
          ))}
        </div>
        <StartGame
          setCards={setCards}
          hidden={isHidden}
          toggleHidden={toggleHidden}
        />
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
