import React, { useState, useEffect } from "react";
import CommentCard from "./components/CommentCard";
import "./global.css";

import api from "./services/api";

function App() {
  const [commentText, setCommentText] = useState("");
  const [commentList, setCommentList] = useState([]);
  const [loading, setLoading] = useState(false);

  async function getData() {
    try {
      const comments = localStorage.getItem("comments");

      if (comments) setCommentList(JSON.parse(comments));

      await api.get("/").then((response) => setCommentList(response.data));
    } catch (error) {
      console.error(error);
    }
  }

  async function handleSubmit(e) {
    try {
      setLoading(true);
      e.preventDefault();
      e.target.reset();

      console.log("fafa");

      const newComment = {
        content: commentText,
      };

      const response = await api.post("/", newComment);
      console.log(response);

      getData();

      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getData();
  }, [commentList, loading]);

  return (
    <div className="container">
      <div className="input">
        <h2>Comentário</h2>
        <form onSubmit={handleSubmit}>
          <textarea onChange={(e) => setCommentText(e.target.value)}></textarea>

          <button id="submit" disabled={loading}>
            Cadastrar
          </button>
        </form>
      </div>
      <div className="line"></div>
      <div className="list">
        <h2>Comentários</h2>
        {commentList.map((el) => (
          <CommentCard
            key={`${el.key}${el.createdAt}`}
            id={el.path}
            text={el.content}
            path={el.path}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
