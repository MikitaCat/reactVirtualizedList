import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/comments")
      .then((response) => response.json())
      .then((json) => {
        console.log("json", json);
        setComments(json);
        console.log("comments", comments);
      });
  }, []);

  useEffect(() => {
    console.log("Updated comments:", comments);
  }, [comments]);

  return (
    <div>
      <div className="container">
        {comments.map((el) => (
          <div className="element" key={el.id}>
            <span>{el.email}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
