import React, { useState } from "react";

function ToDoItem(props) {
  const [isCompleted, setIsCompleted] = useState(false);

  function handleClick() {
    setIsCompleted((prevValue) => !prevValue);
  }

  return (
    <div
      // onClick={() => {
      //   props.onChecked(props.id);
      // }}

      onClick={handleClick}
      style={{ textDecoration: isCompleted ? "line-through" : "none" }}
    >
      <li>{props.text}</li>
    </div>
  );
}

export default ToDoItem;
