import { prisma } from "db/client";

Bun.serve({
  port: 8081,
  fetch(req, server) {
    if (server.upgrade(req)) {
      // Handle WebSocket upgrade
      return new Response("WebSocket connection established", { status: 101 });
    }
    return new Response("Upgrade failed", { status: 500 });
  },
  websocket: {
    message(ws, message) {
      prisma.user.create({
        data: {
          userName: Math.random().toString(),
          password: Math.random().toString(),
        },
      });
      ws.send(message);
    },
  },
});
