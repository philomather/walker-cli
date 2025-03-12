export class RoomDimensions {
  constructor(public width: number, public depth: number) {
    this.width = width;
    this.depth = depth;
  }
}

export const parseRoomDimensions = (
  roomDimensionsString: string
): RoomDimensions => {
  const [widthString, depthString] = roomDimensionsString.split(" ");
  if (!depthString) {
    console.error("Width and depth must be separated by a space");

    throw Error;
  }

  const width = parseInt(widthString);
  if (isNaN(width)) {
    console.error("Width must be a number");

    throw Error;
  }

  const depth = parseInt(depthString);
  if (isNaN(depth)) {
    console.error("Depth must be a number");

    throw Error;
  }

  return new RoomDimensions(width, depth);
};
