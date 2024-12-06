import { testInput, input } from "../input";
import { print2DArray, readAs2DArray, stringInputToArray } from "../../utils/utils";

const findWayOut = (direction: string, startingPoint: number[], data: string[][]) => {
  let curI = startingPoint[0]
  let curJ = startingPoint[1]
  data[curI][curJ] = "."
  let curDirection = direction
  let visited = new Set()
  visited.add(`${curI}-${curJ}`)

  let options: { [dir: string]: string[] } = {
    UP: ["RIGHT", "DOWN", "LEFT"],
    RIGHT: ["DOWN", "LEFT", "UP"],
    DOWN: ["LEFT", "UP", "RIGHT"],
    LEFT: ["UP", "RIGHT", "DOWN"]
  }
  const maxLoops = 20000;
  let loop = 0;
  while (true) {
    if(loop >= maxLoops) {
      return -1
    } else {
      loop++;
    }
    let posibilities: { [dir: string]: number[] } = {
      UP: [curI - 1, curJ],
      RIGHT: [curI, curJ + 1],
      DOWN: [curI + 1, curJ],
      LEFT: [curI, curJ - 1]
    }
    // console.log(curI, curJ, curDirection)
    if (posibilities[curDirection][0] < 0
      || posibilities[curDirection][0] >= data.length
      || posibilities[curDirection][1] < 0
      || posibilities[curDirection][1] >= data[curI].length) {
      break;
    }

    if (data[posibilities[curDirection][0]][posibilities[curDirection][1]] !== "#") {
      curI = posibilities[curDirection][0];
      curJ = posibilities[curDirection][1];
    } else {
      let found = false;
      let curPos = 0;
      let allPos = options[curDirection]
      while (!found && curPos < allPos.length) {
        let nextPosDirection = allPos[curPos]
        if (data[posibilities[nextPosDirection][0]][posibilities[nextPosDirection][1]] !== "#") {
          curDirection = allPos[curPos]
          curI = posibilities[curDirection][0];
          curJ = posibilities[curDirection][1];
          found = true;
        } else {
          curPos++;
        }
      }
    }
    visited.add(`${curI}-${curJ}`)
  }
  return visited.size
}


const inputData = readAs2DArray(stringInputToArray(input))
print2DArray(inputData)

const guard = "<>^v"
let direction = "UP"
let startingPoint = [0, 0];
inputData.forEach((row, i) => {
  row.forEach((col, j) => {
    if (guard.includes(inputData[i][j])) {
      startingPoint = [i, j]
      if (inputData[i][j] === ">") {
        direction = "RIGHT"
      } else if (inputData[i][j] === "<") {
        direction = "LEFT"
      } else if (inputData[i][j] === "v") {
        direction = "DOWN"
      } else if (inputData[i][j] === "^") {
        direction = "UP"
      }
    }
  })
})

console.log("STARTING POINT", startingPoint, direction)
let obstructionPlaces = new Set();

inputData.forEach((row, i) => {
  row.forEach((col, j) => {
    if (inputData[i][j] === '.') {
      inputData[i][j] = "#"
      if(findWayOut(direction, startingPoint, inputData) === -1) {
        obstructionPlaces.add(`${i}-${j}`)
      }
      inputData[i][j] = "."
    }
  })
})

console.log(obstructionPlaces.size)