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

export const parseNavigationCommandSequence = (
  navigationCommandSequenceString: string
) => {
  const navigationCommandChars = navigationCommandSequenceString.split("");

  const navigationCommands = navigationCommandChars.map(
    (navigationCommandChar: string, index: number) => {
      const navigationCommand = NavigationCommand[navigationCommandChar];
      if (!navigationCommand) {
        console.error(
          `The command at position ${
            index + 1
          } is not one of the valid navigation options, please try again`
        );

        throw Error;
      }
      return NavigationCommand[navigationCommandChar];
    }
  );

  return new NavigationCommandSequence(navigationCommands);
};
