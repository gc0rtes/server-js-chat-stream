const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

const StreamChat = require("stream-chat").StreamChat;
const API_KEY = process.env["API_KEY"];
const API_SECRET = process.env["API_SECRET"];
const serverClient = StreamChat.getInstance(API_KEY, API_SECRET);

// console.log(API_KEY);

const queryUsers = async () => {
  try {
    const response = await serverClient.queryUsers({});
    // console.log("what is queryUsers response?", response);
    return response;
  } catch (error) {
    console.log("queryEsers failed > ", error);
  }
};
// queryUsers().then((r) => console.log(r));
// queryUsers();

queryUsers()
  .then((response) =>
    response.users.map((user) => {
      return user.id;
    })
  )
  .then((r) => console.log(r));

exports.queryUsers = queryUsers;
