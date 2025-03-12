export enum NavigationCommand {
  L = "L",
  R = "R",
  F = "F",
}

export class NavigationCommandSequence {
  constructor(public navigationCommands: NavigationCommand[]) {
    this.navigationCommands = navigationCommands;
  }
}
