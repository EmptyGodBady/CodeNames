import { ERootEndpoints, ETeamIdentifiers, EUserRole } from "@/constants/enums";
import { PropsWithChildren, useEffect, useState } from "react";

type Props = PropsWithChildren<{
  columnIdentifier: string;
  columnUsers: IColumnUsers[];
  playerName: string;
  setColumnUsers: any;
}>;

type IColumnUsers = {
  _id: string;
  name: string;
  teamIdentifier: string;
  userRole: string;
};

export default function TeamColumn({
  columnIdentifier,
  playerName,
  columnUsers,
  setColumnUsers,
}: Props) {
  async function onEnterTeam(role: string) {
    await fetch(ERootEndpoints.User, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: playerName,
        teamIdentifier: columnIdentifier,
        userRole: role,
      }),
    });

    try {
      const users = await fetch(ERootEndpoints.User, {
        method: "GET",
      });
      const { data } = await users.json();
      setColumnUsers(data);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  }

  const currentUserIdentifier =
    columnUsers &&
    columnUsers?.find((user) => user.name === playerName)?.teamIdentifier;
  console.log(
    columnUsers?.find((user) => user.name === playerName)?.teamIdentifier
  );
  const isIdentifiersEqual = columnIdentifier === currentUserIdentifier;

  const isColumnUserSpy =
    columnUsers?.find((user) => user.name === playerName)?.userRole ===
    EUserRole.Spy;
  console.log(isColumnUserSpy);

  return (
    <div className="flex flex-col justify-between items-center h-[650px]">
      {isIdentifiersEqual && isColumnUserSpy && (
        <div className="border border-black w-[130px] h-[30px] text-center text-black rounded-md ">
          {playerName}
        </div>
      )}

      {(!isColumnUserSpy || !isIdentifiersEqual) && (
        <button
          className="border-b rounded-y-md border-black bg-neutral-800 overflow-hidden rounded-md w-[130px]"
          onClick={() => {
            onEnterTeam(EUserRole.Spy);
          }}
        >
          Enter as Spy
        </button>
      )}

      <div className="h-[600px] w-[130px] border rounded-md mx-5 flex flex-col  border-black">
        {(isColumnUserSpy || !isIdentifiersEqual) && (
          <button
            className="border-b rounded-y-md border-black bg-neutral-800 overflow-hidden"
            onClick={() => {
              onEnterTeam(EUserRole.Scout);
            }}
          >
            Enter as Scout
          </button>
        )}

        {isIdentifiersEqual && (
          <div className="flex flex-col text-black h-full justify-between ">
            <div className=" px-2">
              {isIdentifiersEqual &&
                !isColumnUserSpy &&
                currentUserIdentifier !== null &&
                playerName}
            </div>
            {isColumnUserSpy && (
              <div className="flex flex-col ">
                <input
                  type="text"
                  className="rounded-b-md border border-t-black outline-none px-1"
                  maxLength={30}
                />
                <button className="border-b rounded-y-md border-black bg-neutral-800 overflow-hidden text-neutral-50 shadow-dark-3 transition duration-150 ease-in-out hover:bg-neutral-700 hover:shadow-dark-2 focus:bg-neutral-700 focus:shadow-dark-2 focus:outline-none focus:ring-0 active:bg-neutral-900 active:shadow-dark-2 motion-reduce:transition-none dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong">
                  Send
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
