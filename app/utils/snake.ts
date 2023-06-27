type SnakePosType = Array<Array<number>>;
type SnakeGameType = {
  mapSize: number;
  initSnakePos?: SnakePosType;
};
type SnakeDirection = "left" | "right" | "up" | "down";

type SnakeType = {
  snakePosition: SnakePosType;
  direction: SnakeDirection;
  mapSize: number;
};

type AppleType = {
  mapSize: number;
};

class Apple {
  public applePosition: number[];
  mapSize: number;

  constructor({ mapSize }: AppleType) {
    this.mapSize = mapSize;
    this.applePosition = [
      Math.floor(Math.random() * mapSize),
      Math.floor(Math.random() * mapSize),
    ];
  }

  changeApplePos() {
    this.applePosition = [
      Math.floor(Math.random() * this.mapSize),
      Math.floor(Math.random() * this.mapSize),
    ];
  }
}

class Snake extends Apple {
  public snakePosition: SnakePosType;
  public direction: SnakeDirection;
  public isSnakeCollied = 0;
  mapSize: number;
  public score = 0;

  constructor({ snakePosition, direction, mapSize }: SnakeType) {
    super({
      mapSize: mapSize,
    });

    this.snakePosition = snakePosition;
    this.direction = direction;
    this.mapSize = mapSize;
  }

  moveSnake() {
    const [posX, posY] = this.snakePosition[0];

    if (this.applePosition[0] === posX && this.applePosition[1] === posY) {
      this.score++
      this.changeApplePos();
    } else {
      this.snakePosition.pop();
    }

    switch (this.direction) {
      case "left":
        if (posY === 0) this.snakePosition.unshift([posX, this.mapSize - 1]);
        else this.snakePosition.unshift([posX, posY - 1]);
        break;
      case "right":
        if (posY === this.mapSize - 1) this.snakePosition.unshift([posX, 0]);
        else this.snakePosition.unshift([posX, posY + 1]);
        break;
      case "down":
        if (posX === this.mapSize - 1) this.snakePosition.unshift([0, posY]);
        else this.snakePosition.unshift([posX + 1, posY]);
        break;
      case "up":
        if (posX === 0) this.snakePosition.unshift([this.mapSize - 1, posY]);
        else this.snakePosition.unshift([posX - 1, posY]);
        break;
    }
    this.checkCollision();
  }

  checkCollision() {
    const [snakeHeadX, snakeHeadY] = this.snakePosition[0];

    const isCollied =
      this.snakePosition.filter(
        (snake, index) =>
          snake[0] === snakeHeadX && snake[1] === snakeHeadY && index !== 0
      ).length === 1;

    if (isCollied) {
      this.isSnakeCollied = 1;
    }
  }

  changeDirection(key: string) {
    const direction = this.direction;
    switch (key) {
      case "a":
        if (direction !== "right") this.direction = "left";
        break;
      case "d":
        if (direction !== "left") this.direction = "right";
        break;
      case "w":
        if (direction !== "down") this.direction = "up";
        break;
      case "s":
        if (direction !== "up") this.direction = "down";
        break;
    }
  }
}

export class SnakeGame extends Snake {
  public mapSize: number;
  public snakeMap: Array<Array<number>>;
  public isGameOver = 0;

  constructor({ mapSize, initSnakePos }: SnakeGameType) {
    super({
      snakePosition: initSnakePos || [
        [5, 5],
        [5, 6],
        [5, 7],
      ],
      direction: "left",
      mapSize,
    });

    this.mapSize = mapSize;
    this.snakeMap = Array(mapSize)
      .fill(mapSize)
      .map(() => Array(mapSize).fill(0));

    console.log("snake init successfully!");
  }

  renderMap() {
    this.snakeMap = this.snakeMap.map((row, rowIndex) =>
      row.map((_, colIndex) => {
        if (
          rowIndex === this.applePosition[0] &&
          colIndex === this.applePosition[1]
        )
          return 2;

        for (let i = 0; i < this.snakePosition.length; i++) {
          const [posX, posY] = this.snakePosition[i];
          if (posX === rowIndex && colIndex === posY) {
            return 1;
          }
        }
        return 0;
      })
    );
  }
}
