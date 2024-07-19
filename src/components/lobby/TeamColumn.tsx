import { ERootEndpoints, ETeamIdentifiers } from "@/constants/enums";
import { PropsWithChildren, useEffect, useState } from "react";

type Props = PropsWithChildren<{
  columnIdentifier: string;
  columnUsers: any;
  playerName: string;
  setColumnUsers: any;
}>;

export default function TeamColumn({
  columnIdentifier,
  playerName,
  columnUsers,
  setColumnUsers,
}: Props) {
  async function onEnterTeam() {
    await fetch(ERootEndpoints.User, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: playerName,
        teamIdentifier: columnIdentifier,
      }),
    });
    try {
      const users = await fetch(ERootEndpoints.User, {
        method: "GET",
      });
      const { data } = await users.json();
      setColumnUsers(data);
    } catch (error) {
      console.error(error);
    }
  }

  const currentUserIdentifier =
    columnUsers &&
    columnUsers?.find((user) => user.name === playerName).teamIdentifier;

  const isIdentifiersEqual = columnIdentifier === currentUserIdentifier;

  return (
    <div className="h-[600px] w-[130px] border rounded-md mx-5 flex flex-col  border-black">
      {!isIdentifiersEqual && (
        <button
          className="border-b rounded-y-md border-black bg-neutral-800 overflow-hidden"
          onClick={() => {
            onEnterTeam();
          }}
        >
          Enter Team
        </button>
      )}
      <div className="text-black px-2">
        {isIdentifiersEqual && currentUserIdentifier !== null && playerName}
      </div>
    </div>
  );
}
