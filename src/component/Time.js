import React, { useEffect, useRef, useState } from "react";

const Time = ({ interval }) => {
  const [time, setTime] = useState(Date.now());
  const timer = useRef(null);

  useEffect(() => {
    timer.current = setInterval(() => setTime(Date.now()), interval);
    return () => clearInterval(timer.current);
  }, [interval]);

  return <h1>{`Time: ${time}`}</h1>;
};
export default Time;
