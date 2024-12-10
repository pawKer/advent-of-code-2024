import { stringInputToArray, readAs2DArray } from "../../utils/utils";
import { input, testInput } from "../input";

const inputData = readAs2DArray(stringInputToArray(input)).map(row => row.map(col => parseInt(col)))
const options =[[0, -1], [0, 1], [-1, 0], [1, 0]]
const followPath = (startRow: number, startCol: number): number => {
  const i = startRow;
  const j = startCol;
  let sum = 0
  if(inputData[startRow][startCol] === 9) {
    return 1
  }
  for(let x = 0; x < options.length; x++) {
    if(i+options[x][0] >= inputData.length || i+options[x][0] < 0 || j+options[x][1] >= inputData[i].length || j+options[x][1] < 0) {
      continue
    }
    if(inputData[i + options[x][0]][j + options[x][1]] - inputData[i][j] === 1) {
      sum += followPath(i + options[x][0], j + options[x][1])
    }
  }
  return sum
}

let trailHeadScores = 0;
inputData.forEach((row, i) => {
  
  row.forEach((col, j) => {
    if(inputData[i][j] === 0) {
      trailHeadScores += followPath(i, j)
      
    }
  })  
})
console.log(trailHeadScores)