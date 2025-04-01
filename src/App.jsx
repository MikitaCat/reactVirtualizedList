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
      });
  }, []);

  const [scrollTop, setScrollTop] = useState(0);
  const itemHeight = 35;
  const windowHeight = 300;
  const overscan = 5;
  const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan);
  const endIndex = Math.min(
    Math.floor((scrollTop + windowHeight) / itemHeight) + overscan,
    comments.length - 1
  );

  const visibleComments = comments.slice(startIndex, endIndex + 1);

  const generateRows = (comments) => {
    return comments.map((item, index) => (
      <ListItem
        key={item.id}
        index={startIndex + index}
        item={item}
        itemHeight={itemHeight}
      />
    ));
  };

  return (
    <div>
      <div
        className="container"
        style={{ height: `${windowHeight}px`, overflowY: "auto" }}
        onScroll={(e) => setScrollTop(e.currentTarget.scrollTop)}
      >
        <div style={{ height: `${comments.length * itemHeight}px` }}>
          <div
            style={{ transform: `translateY(${startIndex * itemHeight}px)` }}
          >
            {generateRows(visibleComments)}{" "}
          </div>
        </div>
      </div>
    </div>
  );
}

const ListItem = ({ index, itemHeight, item }) => {
  return (
    <div
      style={{
        height: `${itemHeight}px`,
      }}
      className="element"
    >
      <span>
        {item.email} - {`index: ${index}`}
      </span>
    </div>
  );
};

export default App;
