import React, { useState } from "react";

export default function ConditionalComponent() {
  const [show, setShow] = useState(true);
  function handleClick() {
    setShow((prev) => !prev);
  }
  return (
    <div>
      {show ? <h2>A conditional component</h2> : ""}
      <button onClick={handleClick}>Click Me!</button>
    </div>
  );
}
