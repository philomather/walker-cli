import chalk from "chalk";
import { createInterface, Interface } from "readline";

import { RoomDimensions } from "./room-dimensions/definition";
import { parseRoomDimensions } from "./room-dimensions/parser";
import { Orientation, RobotPosition } from "./robot-position/definition";
import { parseRobotPosition } from "./robot-position/parser";
import { NavigationCommandSequence } from "./navigation-commands/definition";
import { parseNavigationCommandSequence } from "./navigation-commands/parser";
import { renderRoomAndRobot } from "./renderer";

export type RobotInterfaceConfig = {
  withRendering?: boolean;
};

class OutOfBoundsError extends Error {}

export class RobotInterface {
  readlineInterface: Interface;
  roomDimensions: RoomDimensions;
  robotPosition: RobotPosition;
  navigationCommandSequence: NavigationCommandSequence;
  renderingActive: boolean;

  constructor(config: RobotInterfaceConfig) {
    this.readlineInterface = createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    if (config.withRendering) {
      this.renderingActive = true;
    }
  }

  render() {
    if (this.renderingActive) {
      renderRoomAndRobot(this.roomDimensions, this.robotPosition);
    }
  }

  shutDown() {
    this.readlineInterface.close();
  }

  async promptUser(prompt: string): Promise<string> {
    const answeredPrompt = await new Promise<string>((resolve) => {
      this.readlineInterface.question(prompt, resolve);
    });

    console.log();

    return answeredPrompt;
  }

  outputErrorMessage(message: string) {
    console.log(chalk.red(message) + "\n");
  }

  outputSuccessMessage(message: string) {
    console.log(chalk.green(message) + "\n");
  }

  async promptForRoomDimensions(): Promise<void> {
    let roomDimensions: RoomDimensions | undefined;
    while (!roomDimensions) {
      const dimensionsString = await this.promptUser(
        "Please enter the dimensions of the room in the following format:\n" +
          "width depth\n"
      );

      try {
        roomDimensions = parseRoomDimensions(dimensionsString);
      } catch (error) {
        this.outputErrorMessage(error.message);

        continue;
      }
    }

    this.roomDimensions = roomDimensions;
  }

  async promptForStartingPosition(): Promise<void> {
    let startingPosition: RobotPosition | undefined;

    while (!startingPosition) {
      const startingPositionString = await this.promptUser(
        "Please enter the starting position of the robot in the following format:\n" +
          "x_coordinate y_coordinate facing_direction\n" +
          "Note that facing_direction is a cardinal direction, where N is positive w.r.t. depth and E positive w.r.t. width\n"
      );

      try {
        startingPosition = parseRobotPosition(
          startingPositionString,
          this.roomDimensions
        );
      } catch (error) {
        this.outputErrorMessage(error.message);

        continue;
      }
    }

    this.robotPosition = startingPosition;
  }

  async promptForNavigationCommandSequence(): Promise<void> {
    let navigationCommandSequence: NavigationCommandSequence | undefined;

    while (!navigationCommandSequence) {
      const navigationCommandsString = await this.promptUser(
        "Please enter your series of navigation commands with no spaces, using the following codes:\n" +
          "L = Turn left\n" +
          "R = Turn right\n" +
          "F = Walk forward\n"
      );
      try {
        navigationCommandSequence = parseNavigationCommandSequence(
          navigationCommandsString
        );
      } catch (error) {
        this.outputErrorMessage(error.message);

        continue;
      }
    }

    this.navigationCommandSequence = navigationCommandSequence;
  }

  executeNavigationCommandSequence() {
    const positionUpdateGenerator =
      this.navigationCommandSequence.updatePosition(this.robotPosition);
    for (let updatedPosition of positionUpdateGenerator) {
      this.render();

      if (updatedPosition.isOutOfBounds(this.roomDimensions)) {
        throw new OutOfBoundsError(
          `Out of bounds at ${updatedPosition.xCoordinate} ${updatedPosition.yCoordinate}`
        );
      }
    }

    this.outputSuccessMessage(
      `Report: ${this.robotPosition.xCoordinate} ${
        this.robotPosition.yCoordinate
      } ${Orientation[this.robotPosition.facingDirection]}`
    );
  }
}
