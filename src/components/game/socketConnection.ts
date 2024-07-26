// socketService.ts
import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

export const connectSocket = (
  path: string,
  onMessage: (msg: string) => void
): void => {
  if (socket) return; // Avoid creating multiple connections

  socket = io({ path });

  socket.on("connect", () => {
    console.log("Connected to WebSocket server");
  });
};
export const sendMessage = <T>(event: string, msg: T) => {
  const message = JSON.stringify(msg);

  if (socket) {
    console.log(message);
    socket.emit(event, message);
  }
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

// import io, { Socket } from "socket.io-client";

// let socket: Socket;
// const socketConnection = () => {
//   socket = io({
//     path: "/api/socketio",
//   });

//   socket.on("connect", () => {
//     console.log("Connected to WebSocket server");
//   });

//   socket.on("message", (msg: string) => {
//     console.log("New message: " + msg);
//   });
// };
// const socketDisconnect = () => {
//   if (socket) {
//     socket.disconnect();
//   }
// };
// export default { socketConnection, socketDisconnect };
