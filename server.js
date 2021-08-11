require("dotenv").config({ path: __dirname + "/.env" });
const corsMiddleWare = require("cors");

const API_KEY = process.env["API_KEY"];
const API_SECRET = process.env["API_SECRET"];
const PORT = process.env["PORT"];

// console.log(API_KEY)
// console.log(API_SECRET)
// console.log(PORT)

const express = require("express");
const app = express();
app.use(express.json());
app.use(corsMiddleWare());

const StreamChat = require("stream-chat").StreamChat;

const serverClient = StreamChat.getInstance(API_KEY, API_SECRET);

//Create a token endpoint
//Pass the 'username' to URL via the query string
// http://localhost:3000/token?username=theUserUsername
app.get("/token", (req, res) => {
  const { username } = req.query;

  console.log("I got a request to token endpoint");
  console.log("What is req.query?", req.query);
  console.log("What is username?", username);

  if (username) {
    const token = serverClient.createToken(username);
    res.status(200).json({ token, status: "sucess" });
  } else {
    res.status(401).json({ message: "invalid request", status: "error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is up and running on http://localhost:${PORT}`);
});
