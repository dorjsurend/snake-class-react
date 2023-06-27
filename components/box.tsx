import { FC, memo } from "react";

type BoxType = {
  color: number
};

const Box: FC<BoxType> = ({ color }) => {
  const bgColor = color === 0 ? "black" : color === 1 ? "white" : "red";

  return (
    <div
      style={{
        backgroundColor: bgColor,
      }}
      className={["w-[10px] h-[10px] m-[0.5px]"].join(" ")}
    />
  );
};

export const MemoBox = memo(Box);
