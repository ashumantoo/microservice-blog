import './App.css';
import { CreatePost } from './CreatePost';
import { PostList } from "./PostList"

function App() {
  return (
    <div className="container">
      <CreatePost />
      <hr />
      <PostList />
    </div>
  );
}

export default App;
