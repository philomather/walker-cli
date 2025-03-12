import { createInterface, Interface } from "readline";
import { parseRoomDimensions, RoomDimensions } from "../room-dimensions";
import { parseRobotPosition, RobotPosition } from "../robot-position";
import {
  NavigationCommandSequence,
  parseNavigationCommandSequence,
} from "../navigation-commands";
import chalk from "chalk";

export class RobotInterface {
  readlineInterface: Interface;
  roomDimensions: RoomDimensions;
  robotPosition: RobotPosition;
  navigationCommandSequence: NavigationCommandSequence;

  constructor() {
    this.readlineInterface = createInterface({
      input: process.stdin,
      output: process.stdout,
    });
  }

  shutDown() {
    this.readlineInterface.close();
  }

  async promptUser(prompt: string): Promise<string> {
    return await new Promise((resolve) => {
      this.readlineInterface.question(prompt, resolve);
    });
  }

  outputErrorMessage(message: string) {
    console.log(chalk.red(message) + "\n");
  }

  async promptForRoomDimensions(): Promise<void> {
    let roomDimensions: RoomDimensions | undefined;
    while (!roomDimensions) {
      const dimensionsString = await this.promptUser(
        "Please enter the dimensions of the room in the following format:\nwidth depth\n"
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
        "Please enter the starting position of the robot in the following format:\nx_coordinate y_coordinate facing_direction\n"
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
        "Please enter your series of navigation commands with no spaces, using the following codes:\nL = Turn left\nR = Turn right\nF = Walk forward\n"
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
}
