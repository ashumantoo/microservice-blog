const express = require("express");
const axios = require("axios");

const app = express();


app.use(express.json());

app.post("/events", async (req, res) => {
  const { type, data } = req.body;
  if (type === "CommentCreated") {
    const status = data.content.includes("orange") ? "rejected" : "approved";
    // await axios.post("http://localhost:6005/events", {
    // kubernetes cluster service url for event
    await axios.post("http://event-bus-service:6005/events", {
      type: "CommentModerated",
      data: {
        status,
        id: data.id,
        postId: data.postId,
        content: data.content,
      }
    })
  }
  res.send({});
});

app.listen(6004, () => {
  console.log("Server is running on port 6005")
})