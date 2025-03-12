enum NavigationCommand {
  L = "L",
  R = "R",
  F = "F",
}

export class NavigationCommandSequence {
  constructor(public navigationCommands: NavigationCommand[]) {
    this.navigationCommands = navigationCommands;
  }
}

class NavigationCommandParsingError extends Error {}

export const parseNavigationCommandSequence = (
  navigationCommandSequenceString: string
) => {
  const navigationCommandChars = navigationCommandSequenceString.split("");

  const navigationCommands = navigationCommandChars.map(
    (navigationCommandChar: string, index: number) => {
      const navigationCommand = NavigationCommand[navigationCommandChar];
      if (!navigationCommand) {
        throw new NavigationCommandParsingError(
          `The command at position ${
            index + 1
          } is not one of the valid navigation options, please try again`
        );
      }
      return NavigationCommand[navigationCommandChar];
    }
  );

  return new NavigationCommandSequence(navigationCommands);
};
