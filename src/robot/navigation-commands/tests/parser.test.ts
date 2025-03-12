import { NavigationCommand } from "../definition";
import {
  NavigationCommandParsingError,
  parseNavigationCommandSequence,
} from "../parser";

describe("Navigation commands parser", () => {
  test("parseNavigationCommandSequence parses a sequence of commands correctly", () => {
    const navigationCommandsString = "LFFR";
    const navigationCommandSequence = parseNavigationCommandSequence(
      navigationCommandsString
    );

    expect(navigationCommandSequence.navigationCommands).toStrictEqual([
      NavigationCommand.L,
      NavigationCommand.F,
      NavigationCommand.F,
      NavigationCommand.R,
    ]);
  });

  test("parseNavigationCommandSequence throws error when one of the characters is not a valid command", () => {
    const navigationCommandsString = "LFTFR";

    expect(() =>
      parseNavigationCommandSequence(navigationCommandsString)
    ).toThrow(NavigationCommandParsingError);
  });
});
