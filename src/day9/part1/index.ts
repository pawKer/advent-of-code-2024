import { testInput } from "../input";

const checksum = (arr: string[]): number => {
  let sum = 0;
  for(let i = 0; i < arr.length; i++) {
    if(arr[i] === '.') break
    sum += parseInt(arr[i]) * i
  }
  return sum
}

const fs = require('node:fs');
let data: string;
try {
  data = fs.readFileSync('src/day9/input.txt', 'utf8');
  // console.log(data);
} catch (err) {
  console.error(err);
}

const inputRows = data!.split("")
let nonEmpty = 0;
const memory = inputRows.flatMap((val, i) => {
  let nums:string[] = []
  for(let j = 0; j < parseInt(val); j++) {
    if(i % 2 === 0) {
      nums.push(`${i / 2}`)
      nonEmpty++;
    } else {
      nums.push(".")
    }
  }
  return [...nums];
})

// console.log(memory)
// console.log(nonEmpty)
let arranged = false

let startIndex = memory.length - 1
let firstEmptyPos = 0
while(!arranged) {
  if(startIndex === firstEmptyPos) break
  let tempArranged = true;
  let checkNonEmpty = 0;
  for(let i = 0; i < memory.length; i++) {
    if(memory[i] === '.' && checkNonEmpty !== nonEmpty) {
      tempArranged = false
      firstEmptyPos = i;
      break;
    } 
    if(memory[i] !== '.') {
      checkNonEmpty++;
    }
  }
  if(tempArranged) {
    break
  }

  if(memory[startIndex] !== ".") {
    let temp = memory[startIndex];
    memory[startIndex] = '.'
    memory[firstEmptyPos] = temp;
  }
  startIndex--;
}

console.log(checksum(memory))