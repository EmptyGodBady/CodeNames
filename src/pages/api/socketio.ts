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
  req: NextApiRequest,
  res: NextApiResponseWithSocket
) {
  if (!res.socket.server.io) {
    console.log("Socket is initializing");

    const io = new ServerIO(res.socket.server, {
      path: "/api/socketio",
    });

    io.on("connection", (socket: Socket) => {
      console.log("A user connected");

      socket.on("message", async (msg: string) => {
        console.log("Message received: " + msg);

        const db = mongoClient.db("mydatabase");
        const result = await db
          .collection(ECollections.Messages)
          .insertOne({ message: msg });

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
