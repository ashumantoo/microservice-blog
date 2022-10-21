import React, { useState, useEffect } from 'react';
import axios from 'axios'

export const CommentList = ({ comments }) => {
  const renderedComments = comments.map((comment) => {
    let content;
    if (comment.status === "approved") {
      content = comment.content;
    }
    if (comment.status === "pending") {
      content = "This comment awaiting moderation"
    }
    if (comment.status === "rejected") {
      content = "This comment has been rejected"
    }
    return (
      <li key={comment.id}>{content}</li>
    )
  })
  return (
    <ul>
      {renderedComments}
    </ul>
  )
}

// export const CommentList = ({ postId }) => {
//   const [comments, setComments] = useState([]);

//   const fetchData = async () => {
//     const res = await axios.get(`http://localhost:6002/post/${postId}/comments`);
//     setComments(res.data);
//   }

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const renderedComments = comments.map((comment) => {
//     return (
//       <li key={comment.id}>{comment.content}</li>
//     )
//   })
//   return (
//     <ul>
//       {renderedComments}
//     </ul>
//   )
// }
