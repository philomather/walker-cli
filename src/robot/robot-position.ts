enum Orientation {
  N = "N",
  E = "E",
  S = "S",
  W = "W",
}

export class RobotPosition {
  constructor(
    public xCoordinate: number,
    public yCoordinate: number,
    public facingDirection: Orientation
  ) {
    this.xCoordinate = xCoordinate;
    this.yCoordinate = yCoordinate;
    this.facingDirection = facingDirection;
  }
}

export const parseRobotPosition = (
  robotPositionString: string
): RobotPosition => {
  const [xCoordinateString, yCoordinateString, facingDirection] =
    robotPositionString.split(" ");

  if (!yCoordinateString || !facingDirection) {
    console.error(
      "x_coordinate, y_coordinate and facing_direction must be separated by spaces"
    );

    throw Error;
  }

  const xCoordinate = parseInt(xCoordinateString);
  if (isNaN(xCoordinate)) {
    console.error("x_coordinate must be a number");

    throw Error;
  }

  const yCoordinate = parseInt(yCoordinateString);
  if (isNaN(yCoordinate)) {
    console.error("y_coordinate must be a number");

    throw Error;
  }

  const orientation = Orientation[facingDirection];
  if (!orientation) {
    console.error(
      "facing_direction must be a single letter cardinal direction\ni.e. one of N E S W"
    );

    throw Error;
  }

  return new RobotPosition(xCoordinate, yCoordinate, orientation);
};
