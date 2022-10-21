import React, { useState } from 'react';
import axios from 'axios';

export const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log({ title, description });
    // await axios.post("http://localhost:6001/posts", { title, description });
    //nginx-ingress controller url using kubernetes cluster
    await axios.post("http://posts.com/posts/create", { title, description });
    setTitle("");
    setDescription("");
  }

  return <div>
    <h3>Create Post !!!!!!!!</h3>
    <form onSubmit={onSubmit}>
      <div>
        <input
          type="text"
          className="form-control"
          placeholder="Title"
          name="title"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <input
          type="text"
          className="form-control mt-2"
          placeholder="Description"
          name="description"
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />
        <button type="submit" className="btn btn-primary mt-2">
          Submit
        </button>
      </div>
    </form>
  </div>
}