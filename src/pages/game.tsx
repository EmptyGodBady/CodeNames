import Card from "@/components/Card";
import CopyTextButton from "@/components/coppyLinkButton";
import TeamColumn from "@/components/lobby/TeamColumn";
import { ERootEndpoints, ETeamIdentifiers } from "@/constants/enums";
import { words } from "@/words";
import { useCallback, useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";

let socket: Socket;

export default function Page() {
  const [gameWords, setGameWords] = useState<string[]>([]);
  const [cardsAmount] = useState<number>(25);
  const [columnUsers, setColumnUsers] = useState();
  const [playerName, setPlayerName] = useState("");

  function getRandomItems<T>(array: T[], count: number): T[] {
    const shuffled = array.slice().sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }

  const generateCards = useCallback(() => {
    return Array.from({ length: cardsAmount }, (_, index) => ({
      content: `${gameWords[index]}`,
      key: gameWords[index] + index,
    }));
  }, [cardsAmount, gameWords]);

  async function prepareUser() {
    await fetch(ERootEndpoints.User, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: playerName, teamIdentifier: null }),
    });

    const users = await fetch(ERootEndpoints.User, {
      method: "GET",
    });

    const { data } = await users.json();

    setColumnUsers(data);
  }

  async function onClosingTab() {
    await fetch(ERootEndpoints.User, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: playerName,
      }),
    });
  }

  const sendMessage = () => {
    if (socket) {
      socket.emit("message", "Hello World");
      console.log(123);
    }
  };

  const useBeforeUnload = (handler: (event: BeforeUnloadEvent) => void) => {
    useEffect(() => {
      const handleBeforeUnload = (event: BeforeUnloadEvent) => {
        handler(event);
      };

      window.addEventListener("beforeunload", handleBeforeUnload);

      return () => {
        window.removeEventListener("beforeunload", handleBeforeUnload);
      };
    }, [handler]);
  };

  useBeforeUnload((event) => {
    onClosingTab();
  });
  useEffect(() => {
    socket = io({
      path: "/api/socketio",
    });

    socket.on("connect", () => {
      console.log("Connected to WebSocket server");
    });

    socket.on("message", (msg: string) => {
      console.log("New message: " + msg);
    });

    return () => {
      if (socket) socket.disconnect();
    };
  }, []);

  useEffect(() => {
    prepareUser();
    if (typeof window !== "undefined" && window.localStorage) {
      const name = localStorage.getItem("name");
      if (name) {
        setPlayerName(name);
      }
    }
    const randomizedWords = getRandomItems(words, 25);
    setGameWords(randomizedWords);
    const name = localStorage.getItem("name");
    if (name) {
      setPlayerName(name);
    }
  }, []);

  return (
    <main className="min-h-screen bg-neutral-300 flex flex-col text-white">
      <header className="h-8 flex justify-between my-4 mx-5">
        <div>
          <CopyTextButton />
        </div>
        <button onClick={sendMessage}>send message</button>
        <div className="inline-block rounded bg-neutral-700 px-6 pb-2 pt-2 text-xs font-medium leading-normal text-neutral-400 shadow-dark-3 w-[130px] text-center">
          {playerName}
        </div>
      </header>
      <div className="flex justify-between">
        {columnUsers && playerName && (
          <TeamColumn
            playerName={playerName}
            columnUsers={columnUsers}
            columnIdentifier={ETeamIdentifiers.TeamA}
            setColumnUsers={setColumnUsers}
          />
        )}

        <div className="flex w-[900px] h-[600px] flex-wrap content-start ">
          {gameWords?.length !== 0 &&
            generateCards().map((card) => (
              <Card key={card.key} content={card.content} />
            ))}
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
    </main>
  );
}
