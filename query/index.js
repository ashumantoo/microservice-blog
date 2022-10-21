const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();

app.use(express.json());
app.use(cors());

const posts = {};

const handleEvents = (type, data) => {
  if (type === "PostCreated") {
    const { id, title, description } = data;
    posts[id] = {
      id,
      title,
      description,
      comments: []
    }
  }

  if (type === "CommentCreated") {
    const { id, content, postId, status } = data;
    const post = posts[postId];
    post.comments.push({ id, content, postId, status })
  }

  if (type === "CommentUpdated") {
    const { id, content, postId, status } = data;
    const post = posts[postId];
    const comment = post.comments.find((comment) => comment.id === id);
    comment.status = status;
    comment.content = content;
  }
}

app.get("/posts", (req, res) => {
  res.send(posts);
});

app.post("/events", (req, res) => {
  const { type, data } = req.body;
  handleEvents(type, data);
  res.send({});
});

app.listen(6003, async () => {
  console.log(`server up and running on port 6003`);
  // const res = await axios.get("http://localhost:6005/events");
  // kubernetes cluster service url for event
  const res = await axios.get("http://event-bus-service:6005/events");
  
  for (const event of res.data) {
    console.log("Processing events:", event.type);
    handleEvents(event.type, event.data);
  }
})