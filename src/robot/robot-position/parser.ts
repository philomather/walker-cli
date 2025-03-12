import { Orientation, RobotPosition } from "./definition";
import { RoomDimensions } from "../room-dimensions/definition";

export class RobotPositionParsingError extends Error {}

export const parseRobotPosition = (
  robotPositionString: string,
  roomConstraints: RoomDimensions
): RobotPosition => {
  const [xCoordinateString, yCoordinateString, facingDirection] =
    robotPositionString.split(" ");

  if (!yCoordinateString || !facingDirection) {
    throw new RobotPositionParsingError(
      "x_coordinate, y_coordinate and facing_direction must be separated by spaces"
    );
  }

  const xCoordinate = parseInt(xCoordinateString);
  if (isNaN(xCoordinate)) {
    throw new RobotPositionParsingError("x_coordinate must be a number");
  }

  const yCoordinate = parseInt(yCoordinateString);
  if (isNaN(yCoordinate)) {
    throw new RobotPositionParsingError("y_coordinate must be a number");
  }

  const orientation = Orientation[facingDirection];
  if (!orientation) {
    throw new RobotPositionParsingError(
      "facing_direction must be a single letter cardinal direction\ni.e. one of N E S W"
    );
  }

  const robotPosition = new RobotPosition(
    xCoordinate,
    yCoordinate,
    orientation
  );

  if (robotPosition.isOutOfBounds(roomConstraints)) {
    throw new RobotPositionParsingError(
      `Starting position must be within the bounds of the room\ni.e. on a grid between 0 0 and ${
        roomConstraints.width - 1
      } ${roomConstraints.depth - 1}`
    );
  }

  return robotPosition;
};
