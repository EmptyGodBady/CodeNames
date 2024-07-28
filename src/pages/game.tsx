// game.ts
import { useEffect, useState } from "react";
import getAllUsers from "../../requesters/getAllUsers";
import {
  connectSocket,
  disconnectSocket,
} from "@/components/game/socketConnection";
import Header from "@/components/game/header";
import MainGameComponent from "@/components/game/mainGameComponent";
import removeUser from "../../requesters/removeUser";

export default function Page() {
  const [columnUsers, setColumnUsers] = useState();
  const [playerName, setPlayerName] = useState("");

  async function prepareUser() {
    const { data } = await getAllUsers();
    setColumnUsers(data);
  }

  // нужно оставить пока так
  async function onClosingTab(name: string) {
    await removeUser(name);
  }

  useEffect(() => {
    console.log(123);
    connectSocket("/api/socketio");
    console.log(123);

    prepareUser();
    if (typeof window !== "undefined" && window.localStorage) {
      const name = localStorage.getItem("name");
      if (name) {
        setPlayerName(name);
      }
    }

    return () => {
      disconnectSocket(onClosingTab);
    };
  }, []);

  return (
    <main className="min-h-screen bg-neutral-300 flex flex-col text-white">
      <Header playerName={playerName} />
      <MainGameComponent
        columnUsers={columnUsers}
        playerName={playerName}
        setColumnUsers={setColumnUsers}
      />
    </main>
  );
}
