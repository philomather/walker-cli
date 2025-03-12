import { RobotInterface } from "./robot/robot-interface";

const main = async () => {
  const walkerInterface = new RobotInterface();

  await walkerInterface.promptForRoomDimensions();
  await walkerInterface.promptForStartingPosition();
  await walkerInterface.promptForNavigationCommandSequence();
  walkerInterface.executeNavigationCommandSequence()

  walkerInterface.shutDown();
};

main();
