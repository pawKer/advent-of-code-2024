import { testInput, input } from "../input";
import { print2DArray, readAs2DArray, stringInputToArray } from "../../utils/utils";

// Non-brute force solution for part 2 - WIP

const findWayOut = (direction: string, startingPoint: number[], data: string[][]): Set<string> => {
    let curI = startingPoint[0]
    let curJ = startingPoint[1]
    data[curI][curJ] = "."
    let curDirection = direction
    let visited = new Set<string>()
    visited.add(`${curI}-${curJ}`)

    let options: { [dir: string]: string[] } = {
        UP: ["RIGHT", "DOWN", "LEFT"],
        RIGHT: ["DOWN", "LEFT", "UP"],
        DOWN: ["LEFT", "UP", "RIGHT"],
        LEFT: ["UP", "RIGHT", "DOWN"]
    }
    while (true) {
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
    return visited
}

const inputData = readAs2DArray(stringInputToArray(testInput))
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
const visitedAlready = findWayOut(direction, startingPoint, inputData);
let curI = startingPoint[0]
let curJ = startingPoint[1]


inputData[curI][curJ] = "."
// print2DArray(inputData)


let curDirection = direction
let options: { [dir: string]: string[] } = {
    UP: ["RIGHT", "DOWN", "LEFT"],
    RIGHT: ["DOWN", "LEFT", "UP"],
    DOWN: ["LEFT", "UP", "RIGHT"],
    LEFT: ["UP", "RIGHT", "DOWN"]
}

let inputDataCopy = JSON.parse(JSON.stringify(inputData))
let directionCount: { [dir: string]: number } = {
    UP: 1,
    RIGHT: 0,
    DOWN: 0,
    LEFT: 0
}
let obstructionPlaces = new Set();
// curI >= 0 && curI < inputData.length && curJ >= 0 && curJ < inputData[curI].length
while (true) {
    let posibilities: { [dir: string]: number[] } = {
        UP: [curI - 1, curJ],
        RIGHT: [curI, curJ + 1],
        DOWN: [curI + 1, curJ],
        LEFT: [curI, curJ - 1]
    }
    if (directionCount.UP !== 0
        && directionCount.DOWN !== 0
        && directionCount.LEFT !== 0
        && directionCount.RIGHT !== 0
        && (
            (directionCount.UP === directionCount.DOWN
                && directionCount.LEFT === directionCount.RIGHT)
            ||
            (directionCount.UP === directionCount.DOWN
                && (directionCount.LEFT > directionCount.RIGHT || directionCount.LEFT < directionCount.RIGHT)
                && visitedAlready.has(`${curI}-${curJ}`))
            ||
            ((directionCount.UP > directionCount.DOWN || directionCount.UP < directionCount.DOWN)
                && directionCount.LEFT === directionCount.RIGHT
                && visitedAlready.has(`${curI}-${curJ}`))
        )) {
        obstructionPlaces.add(`${posibilities[curDirection][0]}-${posibilities[curDirection][1]}`);
        inputDataCopy[posibilities[curDirection][0]][posibilities[curDirection][1]] = "O";
        Object.keys(directionCount).filter(e => e !== curDirection).forEach(k => { directionCount[k] = 0 })
    }

    // console.log(curI, curJ, curDirection)
    if (posibilities[curDirection][0] < 0
        || posibilities[curDirection][0] >= inputData.length
        || posibilities[curDirection][1] < 0
        || posibilities[curDirection][1] >= inputData[curI].length) {
        break;
    }
    console.log(curI, curJ, directionCount)


    if (inputData[posibilities[curDirection][0]][posibilities[curDirection][1]] !== "#") {
        curI = posibilities[curDirection][0];
        curJ = posibilities[curDirection][1];
    } else {
        let found = false;
        let curPos = 0;
        let allPos = options[curDirection]
        while (!found && curPos < allPos.length) {
            let nextPosDirection = allPos[curPos]
            if (inputData[posibilities[nextPosDirection][0]][posibilities[nextPosDirection][1]] !== "#") {
                curDirection = allPos[curPos]
                directionCount[curDirection] = 1;
                curI = posibilities[curDirection][0];
                curJ = posibilities[curDirection][1];
                found = true;
            } else {
                curPos++;
            }
        }
    }
    directionCount[curDirection]++;
}
// console.log("EXIT POINT", curI, curJ)
// console.log(visited.size)
// console.log(obstructionPlaces)
print2DArray(inputDataCopy)
console.log(obstructionPlaces.size)
