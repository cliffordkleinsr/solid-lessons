import { eventHandler } from "vinxi/http";

("use server");
export default eventHandler({
  handler() {},
  websocket: {
    async upgrade(req) {
      console.log("upgrade");
    },
    async open(peer) {
      console.log("open", peer.id);
    },
    async message(peer, msg) {
      const message = msg.text();
      console.log("msg", peer.id, message);
    },
    async close(peer, details) {
      console.log("close", peer.id);
    },
    async error(peer, error) {
      console.log("error", peer.id, error);
    },
  },
});
