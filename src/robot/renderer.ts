import chalk from "chalk";
import { Orientation, RobotPosition } from "./robot-position/definition";
import { RoomDimensions } from "./room-dimensions/definition";

export const renderRoomAndRobot = (
  roomDimensions: RoomDimensions,
  robotPosition: RobotPosition
): void => {
  const robotSymbol = getRobotSymbol(robotPosition.facingDirection);

  let topWall = "-".repeat(roomDimensions.width + 2);
  if (robotPosition.yCoordinate >= roomDimensions.depth) {
    console.log(
      chalk.magenta(topWall.slice(0, robotPosition.xCoordinate + 1)) +
        chalk.red(robotSymbol) +
        chalk.magenta(topWall.slice(robotPosition.xCoordinate + 2))
    );
  } else {
    console.log(chalk.magenta(topWall));
  }

  for (let y = roomDimensions.depth - 1; y >= 0; y--) {
    let roomRow = ".".repeat(roomDimensions.width);
    if (robotPosition.yCoordinate === y) {
      if (robotPosition.xCoordinate < 0) {
        console.log(chalk.red(robotSymbol) + roomRow + chalk.magenta("|"));
      } else if (robotPosition.xCoordinate >= roomDimensions.width) {
        console.log(chalk.magenta("|") + roomRow + chalk.red(robotSymbol));
      } else {
        console.log(
          chalk.magenta("|") +
            roomRow.slice(0, robotPosition.xCoordinate) +
            chalk.blue(robotSymbol) +
            roomRow.slice(robotPosition.xCoordinate + 1) +
            chalk.magenta("|")
        );
      }
    } else {
      console.log(chalk.magenta("|") + roomRow + chalk.magenta("|"));
    }
  }

  let bottomWall = "-".repeat(roomDimensions.width + 2);
  if (robotPosition.yCoordinate < 0) {
    console.log(
      chalk.magenta(bottomWall.slice(0, robotPosition.xCoordinate + 1)) +
        chalk.red(robotSymbol) +
        chalk.magenta(bottomWall.slice(robotPosition.xCoordinate + 2))
    );
  } else {
    console.log(chalk.magenta(bottomWall));
  }
};

const getRobotSymbol = (orientation: Orientation) => {
  switch (orientation) {
    case Orientation.N:
      return "^";
    case Orientation.E:
      return ">";
    case Orientation.S:
      return "v";
    case Orientation.W:
      return "<";
  }
};
