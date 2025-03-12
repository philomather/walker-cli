import { RoomDimensionsParsingError, parseRoomDimensions } from "../parser";

describe("Room dimensions parser", () => {
  test("parseRoomDimensions parses width and depth correctly", () => {
    const roomDimensionsString = "3 8";
    const roomDimensions = parseRoomDimensions(roomDimensionsString);

    expect(roomDimensions.width).toBe(3);
    expect(roomDimensions.depth).toBe(8);
  });

  test("parseRoomDimensions throws error when one dimension missing", () => {
    const roomDimensionsMissingDepthString = "3 ";

    expect(() => parseRoomDimensions(roomDimensionsMissingDepthString)).toThrow(
      RoomDimensionsParsingError
    );

    const roomDimensionsMissingWidthString = " 8";

    expect(() => parseRoomDimensions(roomDimensionsMissingWidthString)).toThrow(
      RoomDimensionsParsingError
    );
  });
});
