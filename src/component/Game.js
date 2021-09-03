import React, { useState } from "react";
import Mole from "./Mole/Mole";
import Moles from "./Moles/Moles";
import Score from "./Score/Score";
import Timer from "./Timer/Timer";
import "./Game.css";
import gsap from "gsap";

const TIME_LIMIT = 60000;
const CATCH_SCORE = 10;
const NUMBER_OF_MOLES = 24;

const generateMoles = (amount) =>
  new Array(amount).fill().map(() => ({
    speed: gsap.utils.random(0.5, 1),
    delay: gsap.utils.random(1, 5),
    points: CATCH_SCORE,
  }));

function Game() {
  const [start, setStart] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const [moles] = useState(generateMoles(NUMBER_OF_MOLES));
  const Whack = (points) => setScore(score + points);

  const endGame = () => {
    setStart(false);
    setFinished(true);
  };

  const startGame = () => {
    setScore(0);
    setStart(true);
    setFinished(false);
  };

  return (
    <>
      <h1>Whac A Mole</h1>
      <h2>✨click the button to start game!✨</h2>

      {/* 만약 게임을 시작하지 않은 경우 */}
      {!start && !finished && (
        <>
          <div className="default_wrapper">
            <div className="default_score">Score: 0 </div>
            <div className="default_time">Time: 60s </div>
          </div>
          <Moles>
            {moles.map(({ delay, speed, points }, index) => (
              <Mole
                key={index}
                Whack={Whack}
                delay={delay}
                speed={speed}
                points={points}
              />
            ))}
          </Moles>
          <div className="line">
            <button onClick={startGame}>START GAME</button>
          </div>
        </>
      )}

      {/* 게임을 시작한 경우 */}
      {start && (
        <>
          <button className="end-game" onClick={endGame}>
            End Game
          </button>

          <div className="info">
            <Score value={score} />
            <Timer time={TIME_LIMIT} theEnd={endGame} />
          </div>

          <Moles>
            {moles.map(({ delay, speed, points }, index) => (
              <Mole
                key={index}
                Whack={Whack}
                points={points}
                delay={delay}
                speed={speed}
              />
            ))}
          </Moles>
        </>
      )}

      {/* 게임이 모두 끝난 경우 */}

      {finished && (
        <>
          <Score value={score} />
          <div className="playAgain">
            <button onClick={startGame}>Play Again</button>
          </div>
        </>
      )}
    </>
  );
}

export default React.memo(Game);
