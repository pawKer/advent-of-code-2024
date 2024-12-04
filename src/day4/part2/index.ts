import { testInput, input } from "../input";
import { stringInputToArray} from "../../utils/utils";

const inputData = stringInputToArray(input)
console.log(inputData)
const dataMatrix = inputData.map(str => [...str])

console.log(dataMatrix)

let count = 0;
for(let i = 1; i < dataMatrix.length - 1; i++) {
    for(let j = 1; j < dataMatrix[i].length - 1; j++){
      if(dataMatrix[i][j] === 'A'){
        if(dataMatrix[i-1][j-1] === 'M' && dataMatrix[i+1][j+1] === 'S' && dataMatrix[i+1][j-1] === 'M' && dataMatrix[i-1][j+1] === 'S') {
            count++
        }
        if(dataMatrix[i-1][j-1] === 'S' && dataMatrix[i+1][j+1] === 'M' && dataMatrix[i+1][j-1] === 'M' && dataMatrix[i-1][j+1] === 'S') {
            count++
        }

        if(dataMatrix[i-1][j-1] === 'M' && dataMatrix[i+1][j+1] === 'S' && dataMatrix[i+1][j-1] === 'S' && dataMatrix[i-1][j+1] === 'M') {
            count++
        }

        if(dataMatrix[i-1][j-1] === 'S' && dataMatrix[i+1][j+1] === 'M' && dataMatrix[i+1][j-1] === 'S' && dataMatrix[i-1][j+1] === 'M') {
            count++
        }   
      } else {
        continue;
      }
    }
  }

  console.log(count)