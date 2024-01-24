/** @format */

import PusherServer from "pusher";
import PusherClient from "pusher-js";

declare global {
  var cachedPusherServer: PusherServer | undefined;
  var cachedPusherClient: PusherClient | undefined;
}

const serverConfig = {
  appId: process.env.PUSHER_APP_ID!,
  key: process.env.NEXT_PUBLIC_PUSHER_KEY!,
  secret: process.env.PUSHER_SECRET!,
  cluster: "ap1",
  useTLS: true,
} as const;

const clientConfig = [
  process.env.NEXT_PUBLIC_PUSHER_KEY!,
  { cluster: "ap1" },
] as const;

export let pusherServer: PusherServer;
export let pusherClient: PusherClient;

if (process.env.NODE_ENV === "production") {
  pusherServer = new PusherServer(serverConfig);
  pusherClient = new PusherClient(...clientConfig);
} else {
  if (!global.cachedPusherClient) {
    global.cachedPusherClient = new PusherClient(...clientConfig);
  }
  if (!global.cachedPusherServer) {
    global.cachedPusherServer = new PusherServer(serverConfig);
  }
  pusherServer = global.cachedPusherServer;
  pusherClient = global.cachedPusherClient;
}
