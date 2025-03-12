import { Orientation, RobotPosition } from "../robot-position/definition";
import { NavigationCommand, NavigationCommandSequence } from "./definition";

describe("Navigation commands", () => {
  test("updatePosition updates the robotPosition instance correctly", () => {
    const robotPosition = new RobotPosition(0, 0, Orientation.N);
    const navigationCommandSequence = new NavigationCommandSequence([
      NavigationCommand.L,
      NavigationCommand.F,
      NavigationCommand.F,
      NavigationCommand.R,
    ]);

    const positionUpdateGenerator =
      navigationCommandSequence.updatePosition(robotPosition);

    expect(positionUpdateGenerator.next().done).toBe(false);
    expect(robotPosition.xCoordinate).toBe(0);
    expect(robotPosition.yCoordinate).toBe(0);
    expect(robotPosition.facingDirection).toBe(Orientation.W);

    expect(positionUpdateGenerator.next().done).toBe(false);
    expect(robotPosition.xCoordinate).toBe(-1);
    expect(robotPosition.yCoordinate).toBe(0);
    expect(robotPosition.facingDirection).toBe(Orientation.W);

    expect(positionUpdateGenerator.next().done).toBe(false);
    expect(robotPosition.xCoordinate).toBe(-2);
    expect(robotPosition.yCoordinate).toBe(0);
    expect(robotPosition.facingDirection).toBe(Orientation.W);

    expect(positionUpdateGenerator.next().done).toBe(false);
    expect(robotPosition.xCoordinate).toBe(-2);
    expect(robotPosition.yCoordinate).toBe(0);
    expect(robotPosition.facingDirection).toBe(Orientation.N);

    expect(positionUpdateGenerator.next().done).toBe(true);
  });
});
