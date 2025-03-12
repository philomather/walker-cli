export enum Orientation {
  N = "N",
  E = "E",
  S = "S",
  W = "W",
}

export class RobotPosition {
  constructor(
    public xCoordinate: number,
    public yCoordinate: number,
    public facingDirection: Orientation
  ) {
    this.xCoordinate = xCoordinate;
    this.yCoordinate = yCoordinate;
    this.facingDirection = facingDirection;
  }
}
