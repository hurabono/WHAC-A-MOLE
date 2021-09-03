import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

function Mole({ Whack, points, delay, speed, pointsMin = 10 }) {
  const setButton = useRef(null);
  const setPoints = useRef(points);
  const setPops = useRef(null);
  const [whacked, setWhacked] = useState(false);

  useEffect(() => {
    gsap.set(setButton.current, {
      yPercent: 100,
      display: "block",
    });

    setPops.current = gsap.to(setButton.current, {
      yPercent: 0,
      duration: speed,
      yoyo: true,
      repeat: -1,
      delay: delay,
      repeatDelay: delay,
      onRepeat: () => {
        setPoints.current = Math.floor(Math.max(setPoints.current, pointsMin));
      },
    });
    return () => {
      if (setPops.current) setPops.current.kill();
    };
  }, [pointsMin, delay, speed]);

  const whack = () => {
    setWhacked(true);
    Whack(setPoints.current);
  };

  useEffect(() => {
    if (whacked) {
      setPoints.current = points;
      setPops.current.pause();

      gsap.to(setButton.current, {
        yPercent: 100,
        duration: 0.1,
        onComplete: () => {
          gsap.delayedCall(gsap.utils.random(1, 2), () => {
            setWhacked(false);
            setPops.current.restart().timeScale(setPops.current.timeScale());
          });
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [whacked]);

  return (
    <div className="mole-hole">
      <button className="mole" ref={setButton} onClick={whack}></button>
    </div>
  );
}

export default Mole;
