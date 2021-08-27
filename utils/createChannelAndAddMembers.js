// Ref.: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises

const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });
const StreamChat = require("stream-chat").StreamChat;
const API_KEY = process.env["API_KEY"];
const API_SECRET = process.env["API_SECRET"];
const serverClient = StreamChat.getInstance(API_KEY, API_SECRET);

//////////////////////////////////////////////

// Query users function
// Empty filter {} return all app users
const queryUsers = async () => {
  try {
    const response = await serverClient.queryUsers({});
    // console.log("what is queryUsers response?", response);
    return response.users;
  } catch (error) {
    console.log("queryUsers failed > ", error);
  }
};

// Create a Channel function
// Obs: server-side is required "created_by_id"
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

// Start chaining promises
queryUsers()
  .then((result) =>
    result.map((userId) => {
      return userId.id;
    })
  )
  .then((newResult) =>
    createChannel(
      "messaging",
      "privateChannel-1",
      newResult,
      "This is a messaging channel type",
      "gui"
    )
  )
  .then((finalResult) => console.log("what is finalResult >", finalResult));
