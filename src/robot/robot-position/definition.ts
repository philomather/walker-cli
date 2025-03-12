import { RoomDimensions } from "../room-dimensions/definition";

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

  isOutOfBounds(roomDimensions: RoomDimensions): boolean {
    const maxXvalue = roomDimensions.width - 1;
    const maxYValue = roomDimensions.depth - 1;

    return (
      this.xCoordinate < 0 ||
      this.xCoordinate > maxXvalue ||
      this.yCoordinate < 0 ||
      this.yCoordinate > maxYValue
    );
  }

  rotateLeft() {
    switch (this.facingDirection) {
      case Orientation.N:
        this.facingDirection = Orientation.W;
        break;
      case Orientation.E:
        this.facingDirection = Orientation.N;
        break;
      case Orientation.S:
        this.facingDirection = Orientation.E;
        break;
      case Orientation.W:
        this.facingDirection = Orientation.S;
        break;
    }
  }

  rotateRight() {
    switch (this.facingDirection) {
      case Orientation.N:
        this.facingDirection = Orientation.E;
        break;
      case Orientation.E:
        this.facingDirection = Orientation.S;
        break;
      case Orientation.S:
        this.facingDirection = Orientation.W;
        break;
      case Orientation.W:
        this.facingDirection = Orientation.N;
        break;
    }
  }

  stepForward() {
    switch (this.facingDirection) {
      case Orientation.N:
        this.yCoordinate += 1;
        break;
      case Orientation.E:
        this.xCoordinate += 1;
        break;
      case Orientation.S:
        this.yCoordinate -= 1;
        break;
      case Orientation.W:
        this.xCoordinate -= 1;
        break;
    }
  }
}
