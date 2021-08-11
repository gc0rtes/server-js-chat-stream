require("dotenv").config({ path: __dirname + "/.env" });

const API_KEY = process.env["API_KEY"];
const API_SECRET = process.env["API_SECRET"];
const PORT = process.env["PORT"];

// console.log(API_KEY)
// console.log(API_SECRET)
// console.log(PORT)

const StreamChat = require("stream-chat").StreamChat;

