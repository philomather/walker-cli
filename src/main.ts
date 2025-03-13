import { RobotInterface } from "./robot/robot-interface";

const main = async () => {
  const startCommandArgs = process.argv;
  const robotInterfaceConfig = startCommandArgs.includes(
    "--experimental_renderer"
  )
    ? { withRendering: true }
    : {};

  const walkerInterface = new RobotInterface(robotInterfaceConfig);

  await walkerInterface.promptForRoomDimensions();
  await walkerInterface.promptForStartingPosition();
  await walkerInterface.promptForNavigationCommandSequence();
  walkerInterface.executeNavigationCommandSequence();

  walkerInterface.shutDown();
};

main();
