const express = require("express");
const axios = require("axios");

const app = express();

app.use(express.json());

const events = [];

app.post("/events", (req, res) => {
  const event = req.body;
  events.push(event);
  //post service
  // axios.post("http://localhost:6001/events", event).catch((error) => {
  //   console.log("6001", error);
  // });
  //comments service
  // axios.post("http://localhost:6002/events", event).catch((error) => {
  //   console.log("6002", error);
  // });
  // //query service
  // axios.post("http://localhost:6003/events", event).catch((error) => {
  //   console.log("6003", error);
  // });
  // //moderation service
  // axios.post("http://localhost:6004/events", event).catch((error) => {
  //   console.log("6004", error);
  // });

  //url on Kubernetes cluster
  axios.post("http://posts-clusterip-service:6001/events", event).catch((error) => {
    console.log("6001", error);
  });
  // comments service
  axios.post("http://comments-service:6002/events", event).catch((error) => {
    console.log("6002", error);
  });
  //query service
  axios.post("http://query-service:6003/events", event).catch((error) => {
    console.log("6003", error);
  });
  //moderation service
  axios.post("http://moderation-service:6004/events", event).catch((error) => {
    console.log("6004", error);
  });
  res.send({ status: "OK" });
});

app.get("/events", (req, res) => {
  res.send(events);
})

app.listen(6005, () => {
  console.log(`server up and running on port 6004`)
})