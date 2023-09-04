interface Coordinate {
  x: number;
  y: number;
}

function parseCoordinateFromObject(obj: Coordinate): Coordinate {
  return {
    ...obj,
  };
}

// Example usage
const coordinate = parseCoordinateFromObject({
  x: 12,
  y: 21,
});
console.log(coordinate);
// { x: 12, y: 21 }

/*******************************************************************************************/

function parseCoordinateFromNumbers(x: number, y: number): Coordinate {
  return {
    x,
    y,
  };
}

// Example usage
const coordinate2 = parseCoordinateFromNumbers(12, 21);
console.log(coordinate2);
// { x: 12, y: 21 }

/*******************************************************************************************/

function parseCoordinate(obj: Coordinate): Coordinate;
function parseCoordinate(x: number, y: number): Coordinate;
function parseCoordinate(arg1: unknown, arg2?: unknown): Coordinate {
  let coord: Coordinate = {
    x: 0,
    y: 0,
  };
  if (typeof arg1 === "object") {
    coord = {
      ...(arg1 as Coordinate),
    };
  } else if (typeof arg1 === "number" && typeof arg2 === "number") {
    coord = {
      x: arg1,
      y: arg2,
    };
  }
  return coord;
}

// Example usage

const coordinate3 = parseCoordinate(12, 21);
console.log(coordinate3);
// { x: 12, y: 21 }

const coordinate4 = parseCoordinate({
  x: 12,
  y: 21,
});
console.log(coordinate4);
// { x: 12, y: 21 }

/*******************************************************************************************/
function parseCoordinateWithString(str: string): Coordinate;
function parseCoordinateWithString(obj: Coordinate): Coordinate;
function parseCoordinateWithString(x: number, y: number): Coordinate;
function parseCoordinateWithString(arg1: unknown, arg2?: unknown): Coordinate {
  let coord: Coordinate = {
    x: 0,
    y: 0,
  };
  if (typeof arg1 === "object") {
    coord = {
      ...(arg1 as Coordinate),
    };
  } else if (typeof arg1 === "string") {
    (arg1 as string).split(",").forEach((str) => {
      const [key, value] = str.split(":");
      coord[key as "x" | "y"] = parseInt(value, 10);
    });
  } else {
    coord = {
      x: arg1 as number,
      y: arg2 as number,
    };
  }
  return coord;
}

// Example usage

const coordinate5 = parseCoordinateWithString("x:12,y:21");
console.log(coordinate5);
// { x: 12, y: 21 }
