import { Orientation, RobotPosition } from "./definition";
import { RoomDimensions } from "../room-dimensions/definition";

class RobotPositionParsingError extends Error {}

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

  const maxXvalue = roomConstraints.width - 1;
  const maxYValue = roomConstraints.depth - 1;

  if (
    xCoordinate < 0 ||
    xCoordinate > maxXvalue ||
    yCoordinate < 0 ||
    yCoordinate > maxYValue
  ) {
    throw new RobotPositionParsingError(
      `Starting position must be within the bounds of the room i.e. on a grid between 0 0 and ${maxXvalue} ${maxYValue}`
    );
  }

  const orientation = Orientation[facingDirection];
  if (!orientation) {
    throw new RobotPositionParsingError(
      "facing_direction must be a single letter cardinal direction\ni.e. one of N E S W"
    );
  }

  return new RobotPosition(xCoordinate, yCoordinate, orientation);
};
