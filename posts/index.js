const express = require("express");
const cors = require("cors");
const { randomBytes } = require("crypto");
const axios = require("axios");

const app = express();

app.use(express.json());
app.use(cors());

const posts = [];
app.get("/posts", (req, res) => {
  res.status(200).send(posts);
});

app.post("/posts/create", async (req, res) => {
  const id = randomBytes(6).toString("hex");
  const { title, description } = req.body;
  const newPost = {
    id,
    title,
    description
  };
  posts.push(newPost);
  // event-bus-service 
  // await axios.post("http://localhost:6005/events", {
  // kubernetes cluster service url for event
  await axios.post("http://event-bus-service:6005/events", {
    type: "PostCreated",
    data: {
      id,
      title,
      description
    }
  });
  res.status(201).send(newPost);
});

app.post("/events", (req, res) => {
  console.log("Event Received : ", req.body.type);
  res.send({});
});

app.listen(6001, () => {
  console.log("v20");
  console.info(`Server is up and running on port 6001`);
});