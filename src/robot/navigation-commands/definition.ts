import { RobotPosition } from "../robot-position/definition";

export enum NavigationCommand {
  L = "L",
  R = "R",
  F = "F",
}

export class NavigationCommandSequence {
  constructor(public navigationCommands: NavigationCommand[]) {
    this.navigationCommands = navigationCommands;
  }

  * updatePosition(robotPosition: RobotPosition) {
    for (const navigationCommand of this.navigationCommands) {
        switch (navigationCommand) {
          case NavigationCommand.L:
            robotPosition.rotateLeft();
            break;
          case NavigationCommand.R:
            robotPosition.rotateRight();
            break;
          case NavigationCommand.F:
            robotPosition.stepForward();
            break;
        }

        yield robotPosition;
      }
  }
}
