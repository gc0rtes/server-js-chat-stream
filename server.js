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

// Token endpoint.
//Obs: JWtoken is created locally. JWT is installed with stream-chat library.
//  Because the serverClient includes an app secret, the server is able to combine the given user id with the secret to generate a user specific token
// Pass the 'userId' to URL via the query string
// http://localhost:3000/token?userId=theUserUsername
app.get("/token", (req, res) => {
  const { userId } = req.query;
  console.log("got req from /token endpoint");
  console.log("What is req.query?", req.query);

  if (userId) {
    // Generate token
    const token = serverClient.createToken(userId);
    res.status(200).json({ token, status: "sucess" });
  } else {
    res.status(401).json({ message: "invalid request", status: "error" });
  }
});

// Add channel member endpoint
//It must be done from the server side since the client-side is not allowed for regular user.
// http://localhost:3000/add?userId=theUserUsername
app.get("/add", (req, res) => {
  const { userId } = req.query;
  console.log("got req from /add endpoint");
  console.log("What is userId?", req.query);

  // Add user to default app channels
  const SubscribeChannels = async (userId) => {
    //Channels exists on the API already and are hardcoded for now
    const surf = serverClient.channel("messaging", "surf");
    const skate = serverClient.channel("messaging", "skate");
    try {
      const channelSurf = await surf.addMembers([userId]);
      const channelSkate = await skate.addMembers([userId]);

      //Query channels

      res.status(200).json({
        message: "add member sucess",
        status: "sucess",
        // channelSkate, //Output: It doesn't say much
        // channelSurf,
      });
    } catch (error) {
      res.status(401).json({ message: "add member fail", status: "error" });
      console.log("add members failed", error);
    }
  };
  //Call the function
  SubscribeChannels(userId);
});

app.listen(PORT, () => {
  console.log(`Server is up and running on http://localhost:${PORT}`);
});
