import { testInput, input } from "../input";
import { stringInputToArray } from "../../utils/utils";

const inputData = stringInputToArray(input)
console.log(inputData)
const dataMatrix = inputData.map(str => [...str])
console.log(dataMatrix)

const horizontalRows = inputData;
const verticalRows = []

for(let i = 0; i < dataMatrix.length; i++) {
  let vert = ""
  for(let j = 0; j < dataMatrix[i].length; j++){
    vert += dataMatrix[j][i]
  }
  verticalRows.push(vert)
}
const diagonalRows = []

// Top right corner diagonals - without main diagonal
for(let k = 0; k < dataMatrix.length; k++) {
  for(let i = 0; i < dataMatrix.length; i++) {
    let diagonal = ""
    for(let j = i + 1 + k; j < dataMatrix[i].length; j++){
        diagonal += dataMatrix[i][j]
        i++
    }
    if(diagonal.length > 0)
      diagonalRows.push(diagonal)
  }
}

// Bottom left corner diagonals - without main diagonal
for(let k = 0; k < dataMatrix.length; k++) {
  for(let i = 0; i < dataMatrix.length; i++) {
    let diagonal = ""
    for(let j = i + 1 + k; j < dataMatrix[i].length; j++){
        diagonal += dataMatrix[j][i]
        i++
    }
    if(diagonal.length > 0)
      diagonalRows.push(diagonal)
  }
}

// Top left corner diagonals - includes main diagonal
for(let k = 0; k < dataMatrix.length; k++) {
  for(let i = 0; i < dataMatrix.length; i++) {
    let diagonal = ""
    for(let j = dataMatrix[i].length - k - i - 1; j >= 0; j--){
        diagonal += dataMatrix[i][j]
        i++
    }
    if(diagonal.length > 0)
      diagonalRows.push(diagonal)
  }
}

// Bottom right diagonals - without main diagonal
for(let k = 1; k < dataMatrix.length; k++) {
  for(let i = k; i < dataMatrix.length; i++) {
    let diagonal = ""
    for(let j = dataMatrix[i].length - 1; j > 0; j--){
      if (i >= dataMatrix.length) {
        break
      }
      console.log(i, j)
      diagonal += dataMatrix[i][j]
      i++
    }
    if(diagonal.length > 0)
      diagonalRows.push(diagonal)
  }
}

let mainDiag = ""
for(let i = 0; i < dataMatrix.length; i++) {
  mainDiag += dataMatrix[i][i]
}

diagonalRows.push(mainDiag)

const allRows = [...verticalRows, ...horizontalRows, ...diagonalRows].filter(row => row.length >= 4)

let sum = 0;
allRows.forEach(row => {
  sum += (row.match(/XMAS/g) || []).length
  sum += (row.match(/SAMX/g) || []).length
})


console.log(sum)