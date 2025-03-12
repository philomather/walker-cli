import { RoomDimensions } from "./definition";

class RoomDimensionsParsingError extends Error {}

export const parseRoomDimensions = (
  roomDimensionsString: string
): RoomDimensions => {
  const [widthString, depthString] = roomDimensionsString.split(" ");
  if (!depthString) {
    throw new RoomDimensionsParsingError(
      "Width and depth must be separated by a space"
    );
  }

  const width = parseInt(widthString);
  if (isNaN(width)) {
    throw new RoomDimensionsParsingError("Width must be a number");
  }

  const depth = parseInt(depthString);
  if (isNaN(depth)) {
    throw new RoomDimensionsParsingError("Depth must be a number");
  }

  return new RoomDimensions(width, depth);
};
