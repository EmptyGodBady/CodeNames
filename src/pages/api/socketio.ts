import { Server as NetServer } from "http";
import { NextApiRequest, NextApiResponse } from "next";
import { Server as ServerIO, Socket } from "socket.io";
import { mongoClient } from "../../lib/mongodb"; // Убедитесь, что путь правильный
import { ECollections } from "@/constants/enums";

type NextApiResponseWithSocket = NextApiResponse & {
  socket: {
    server: NetServer & {
      io: ServerIO;
    };
  };
};

export default async function handler(
  _: NextApiRequest,
  res: NextApiResponseWithSocket
) {
  if (!res.socket.server.io) {
    console.log("Socket is initializing");

    const io = new ServerIO(res.socket.server, {
      path: "/api/socketio",
    });

    io.on("connection", (socket: Socket) => {
      console.log("A user connected");

      socket.on("message", async (message: string) => {
        console.log("Message received: " + message);

        const db = mongoClient.db("mydatabase");
        await db.collection(ECollections.Messages).insertOne({ message });

        io.emit("message", message);
      });
      socket.on("startGame", async (msg: string) => {
        console.log("startGame: ");
        console.log(msg);
        const cards = JSON.parse(msg);
        console.log(cards);
        const db = mongoClient.db("mydatabase");
        await db.collection(ECollections.Cards).insertOne({ cards });

        io.emit("message", msg);
      });

      socket.on("disconnect", () => {
        console.log("A user disconnected");
      });
    });

    res.socket.server.io = io;
  } else {
    console.log("Socket is already running");
  }

  res.end();
}
