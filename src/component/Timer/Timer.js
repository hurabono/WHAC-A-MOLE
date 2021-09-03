import React, { useRef, useState, useEffect } from "react";

const Timer = ({ time, interval = 1000, theEnd }) => {
  //초기값 설정
  const [internalTime, setInternalTime] = useState(time);
  const timerRef = useRef(time);

  useEffect(() => {
    if (internalTime === 0 && theEnd) theEnd();
  }, [internalTime, theEnd]);

  useEffect(() => {
    timerRef.current = setInterval(
      () => setInternalTime(internalTime - interval),
      interval
    );

    return () => {
      clearInterval(timerRef.current);
    };
  }, [internalTime, interval]);
  return <div className="onTime">{`Time: ${internalTime / 1000}s left`}</div>;
};

export default Timer;
