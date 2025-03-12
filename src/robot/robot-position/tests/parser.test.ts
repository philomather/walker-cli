import { RoomDimensions } from "../../room-dimensions/definition";
import { Orientation } from "../definition";
import { parseRobotPosition, RobotPositionParsingError } from "../parser";

describe("Robot position parser", () => {
  test("parseRobotPosition parses string correctly", () => {
    const roomDimensions = new RoomDimensions(1, 1);

    const robotPositionString = "0 0 N";
    const robotPosition = parseRobotPosition(
      robotPositionString,
      roomDimensions
    );

    expect(robotPosition.xCoordinate).toBe(0);
    expect(robotPosition.yCoordinate).toBe(0);
    expect(robotPosition.facingDirection).toBe(Orientation.N);
  });

  test("parseRobotPosition throws error when coordinates are out of room bounds", () => {
    const roomDimensions = new RoomDimensions(1, 1);

    const robotPositionString = "1 0 N";
    expect(() =>
      parseRobotPosition(robotPositionString, roomDimensions)
    ).toThrow(RobotPositionParsingError);
  });
});
