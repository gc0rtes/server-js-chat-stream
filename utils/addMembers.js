const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });
const StreamChat = require("stream-chat").StreamChat;
const API_KEY = process.env["API_KEY"];
const API_SECRET = process.env["API_SECRET"];
const serverClient = StreamChat.getInstance(API_KEY, API_SECRET);

const channel = serverClient.channel("messaging", "onlyMembers");

const addMembers = async (members) => {
  const response = await channel.addMembers(members);
  return response;
};
addMembers([
  "guilherme",
  "ugi",
  "luis",
  "jimi",
  "zaratrusta",
  "hi",
  "samy",
  "jimy",
  "bob",
  "jim",
  "sara",
  "--",
  "gui",
  "guilhermeco",
]).then((r) => console.log("what is response addMembers?", r));
