"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { MemoBox } from "./box";
import { SnakeGame } from "@/utils";

export const Map = () => {
  const [mapSize, setMapSize] = useState(20);
  const [snakeMap, setSnakeMap] = useState<number[][]>();
  const [score, setScore] = useState(0);

  const snakeGame = useMemo(
    () =>
      new SnakeGame({
        mapSize,
      }),
    [mapSize]
  );

  useEffect(() => {
    const interval = setInterval(() => {
      snakeGame.moveSnake();
      snakeGame.renderMap();
      setSnakeMap(snakeGame.snakeMap);
      setScore(snakeGame.score);
      if (snakeGame.isSnakeCollied) {
        clearInterval(interval);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [snakeGame]);

  useEffect(() => {
    if (!window) return;
    document.addEventListener("keydown", changeDirection);

    return () => {
      document.removeEventListener("keydown", changeDirection);
    };
  }, [snakeGame]);

  const changeDirection = useCallback(
    (ev: Event & { key: string }) => {
      snakeGame.changeDirection(ev.key);
    },
    [snakeGame]
  );

  return (
    <div id="snakeContainer" className="flex flex-col">
      <div className="flex my-1 gap-1 justify-between relative">
        <h1 className="text-black">{mapSize}</h1>
        <button
          className="text-white bg-black w-1/2 absolute  translate-x-1/2"
          onClick={() => setMapSize(mapSize + 1)}
        >
          +
        </button>
        <h1 className="text-black">{score}</h1>
      </div>

      {snakeMap &&
        snakeMap.map((row, rowIndex) => (
          <div className="flex" key={rowIndex}>
            {row.map((color, colIndex) => (
              <MemoBox key={rowIndex + colIndex} color={color} />
            ))}
          </div>
        ))}
    </div>
  );
};
