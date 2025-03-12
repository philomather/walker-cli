import { RoomDimensions } from "../room-dimensions/definition";
import { Orientation, RobotPosition } from "./definition";

describe("Robot position", () => {
  test("rotateLeft alters orientation but not coordinates", () => {
    const robotPosition = new RobotPosition(0, 0, Orientation.N);

    robotPosition.rotateLeft();
    expect(robotPosition.xCoordinate).toBe(0);
    expect(robotPosition.yCoordinate).toBe(0);
    expect(robotPosition.facingDirection).toBe(Orientation.W);

    robotPosition.rotateLeft();
    expect(robotPosition.xCoordinate).toBe(0);
    expect(robotPosition.yCoordinate).toBe(0);
    expect(robotPosition.facingDirection).toBe(Orientation.S);

    robotPosition.rotateLeft();
    expect(robotPosition.xCoordinate).toBe(0);
    expect(robotPosition.yCoordinate).toBe(0);
    expect(robotPosition.facingDirection).toBe(Orientation.E);

    robotPosition.rotateLeft();
    expect(robotPosition.xCoordinate).toBe(0);
    expect(robotPosition.yCoordinate).toBe(0);
    expect(robotPosition.facingDirection).toBe(Orientation.N);
  });

  test("rotateRight alters orientation but not coordinates", () => {
    const robotPosition = new RobotPosition(0, 0, Orientation.N);

    robotPosition.rotateRight();
    expect(robotPosition.xCoordinate).toBe(0);
    expect(robotPosition.yCoordinate).toBe(0);
    expect(robotPosition.facingDirection).toBe(Orientation.E);

    robotPosition.rotateRight();
    expect(robotPosition.xCoordinate).toBe(0);
    expect(robotPosition.yCoordinate).toBe(0);
    expect(robotPosition.facingDirection).toBe(Orientation.S);

    robotPosition.rotateRight();
    expect(robotPosition.xCoordinate).toBe(0);
    expect(robotPosition.yCoordinate).toBe(0);
    expect(robotPosition.facingDirection).toBe(Orientation.W);

    robotPosition.rotateRight();
    expect(robotPosition.xCoordinate).toBe(0);
    expect(robotPosition.yCoordinate).toBe(0);
    expect(robotPosition.facingDirection).toBe(Orientation.N);
  });

  test("stepForward alters coordinates but not orientation", () => {
    const robotPosition = new RobotPosition(0, 0, Orientation.N);

    robotPosition.stepForward();
    expect(robotPosition.xCoordinate).toBe(0);
    expect(robotPosition.yCoordinate).toBe(1);
    expect(robotPosition.facingDirection).toBe(Orientation.N);
  });

  test("isOutOfBounds works for all edges of the room", () => {
    const roomDimensions = new RoomDimensions(1, 1);

    const robotPositionInBounds = new RobotPosition(0, 0, Orientation.N);
    expect(robotPositionInBounds.isOutOfBounds(roomDimensions)).toBe(false);

    const robotPositionEastOfBounds = new RobotPosition(1, 0, Orientation.N);
    expect(robotPositionEastOfBounds.isOutOfBounds(roomDimensions)).toBe(true);

    const robotPositionWestOfBounds = new RobotPosition(-1, 0, Orientation.N);
    expect(robotPositionWestOfBounds.isOutOfBounds(roomDimensions)).toBe(true);

    const robotPositionNorthOfBounds = new RobotPosition(0, 1, Orientation.N);
    expect(robotPositionNorthOfBounds.isOutOfBounds(roomDimensions)).toBe(true);

    const robotPositionSouthOfBounds = new RobotPosition(0, -1, Orientation.N);
    expect(robotPositionSouthOfBounds.isOutOfBounds(roomDimensions)).toBe(true);
  });
});
