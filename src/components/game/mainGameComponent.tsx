import React, { Dispatch, PropsWithChildren, SetStateAction } from "react";
import TeamColumn from "./TeamColumn";
import { ETeamIdentifiers } from "@/constants/enums";

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

      <div className="flex w-[900px] h-[600px] flex-wrap content-start "></div>

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
