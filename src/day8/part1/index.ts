import { testInput, input } from "../input";
import { readAs2DArray, stringInputToArray } from "../../utils/utils";
const inputRows = stringInputToArray(input)

const inputData = readAs2DArray(inputRows);

const antiNodes = new Set()

for(let i = 0; i < inputData.length; i++) {
  for(let j = 0; j < inputData[i].length; j++) {
    for(let x = 0; x < inputData.length; x++) {
      for(let y = 0; y < inputData[x].length; y++) {
        if(i === x && j === y) continue
        if(inputData[i][j] !== '.' && inputData[i][j] === inputData[x][y]) {
          const anX = x + (x-i)
          const anY = y + (y-j)
          if(anX >= 0 && anX < inputData.length && anY >= 0 && anY < inputData[i].length) {
            antiNodes.add(`${anX}-${anY}`);
          }
        }

      }
    }

  }
}

console.log(antiNodes.size)