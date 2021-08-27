const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });
const StreamChat = require("stream-chat").StreamChat;
const API_KEY = process.env["API_KEY"];
const API_SECRET = process.env["API_SECRET"];
const serverClient = StreamChat.getInstance(API_KEY, API_SECRET);

const { queryUsers } = require("./queryUsers");

// CREATED_BY_ID
// Required when making server side API calls. You need to specify which user is the owner of this channel.

const createChannel = async (type, id, members, name, created_by_id) => {
  try {
    const channel = serverClient.channel(type, id, {
      members,
      name,
      created_by_id,
    });
    return await channel.create();
  } catch (error) {
    console.log("createChannel failed > ", error);
  }
};

createChannel(
  "messaging",
  "onlyMembers",
  queryUsers,
  "This is a messaging type channel.",
  "gui"
).then((r) => console.log("what is createChannel response?", r));
