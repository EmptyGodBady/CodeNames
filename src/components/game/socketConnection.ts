// socketConnection
import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

export const connectSocket = (path: string): void => {
  if (socket) return; // Avoid creating multiple connections
  console.log("Connecting to WebSocket server at path: " + path);

  socket = io({ path });

  socket.on("connect", () => {
    console.log("Connected to WebSocket server");
  });
};

export const sendMessage = <T>(
  event: string,
  msg: T,
  onMessageEnd: (message: any) => void
): T => {
  const message = JSON.stringify(msg);

  if (socket) {
    socket.emit(event, message);
    socket.on(event, (msg: string) => {
      const message = JSON.parse(msg);

      onMessageEnd(message);
    });
    return msg;
  }
  return msg;
};

export const getCards = async (): Promise<any> => {
  return new Promise((resolve, reject) => {
    if (socket) {
      socket.once("startGame", (msg: string) => {
        console.log("Game started with message: " + msg);
        const cards = JSON.parse(msg);
        resolve(cards);
      });

      socket.emit("requestCards"); // Assuming you have a server-side handler for this event
    } else {
      reject("Socket is not connected");
    }
  });
};

export const disconnectSocket = (
  onClosingTab: (name: string) => void
): void => {
  if (socket) {
    const name = localStorage.getItem("name");
    if (name) onClosingTab(name);

    socket.disconnect();
    socket = null;
  }
};
