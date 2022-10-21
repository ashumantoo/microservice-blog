const express = require("express");
const cors = require("cors");
const { randomBytes } = require("crypto");
const axios = require("axios");

const app = express();

app.use(express.json());
app.use(cors());

const commentsByPostId = {};

app.get("/post/:id/comments", (req, res) => {
  res.status(200).send(commentsByPostId[req.params.id] || []);
});

app.post("/post/:id/comments", async (req, res) => {
  const commentId = randomBytes(6).toString("hex");
  const { content } = req.body;

  const comments = commentsByPostId[req.params.id] || [];
  comments.push({
    id: commentId,
    postId: req.params.id,
    content,
    status: "pending"
  })
  commentsByPostId[req.params.id] = comments;
  // await axios.post("http://localhost:6005/events", {
  // kubernetes cluster service url for event
  await axios.post("http://event-bus-service:6005/events", {
    type: "CommentCreated",
    data: {
      id: commentId,
      content,
      postId: req.params.id,
      status: "pending"
    }
  });
  res.status(201).send(comments);
});

app.post("/events", async (req, res) => {
  console.log("Event Received : ", req.body.type);
  const { type, data } = req.body;
  if (type === "CommentModerated") {
    const { id, postId, status } = data;

    const comments = commentsByPostId[postId];

    const comment = comments.find((comment) => comment.id === id);
    comment.status = status;

    // await axios.post("http://localhost:6005/events", {
    // kubernetes cluster service url for event
    await axios.post("http://event-bus-service:6005/events", {
      type: "CommentUpdated",
      data: {
        id,
        postId,
        status,
        content: comment.content
      }
    })
  }
  res.send({});
});

app.listen(6002, () => {
  console.info("app is up and running on port 6002");
})