import { testInput } from "../input";

interface Block {
  type: "memory" | "free",
  len: number,
  index: number
}

const checksum = (arr: string[]): number => {
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === '.') continue
    sum += parseInt(arr[i]) * i
  }
  return sum
}

const transformToString = (arr: Block[]): string[] => {
  let temp: string[] = []
  arr.forEach((it, index) => {
    if(it.type === "memory") {
      for(let i = 0; i < it.len; i++) {
        temp.push(`${it.index}`)
      }
    } else {
      for(let i = 0; i < it.len; i++) {
        temp.push(".")
      }
    }
  })

  return temp;
}

const fs = require('node:fs');
let data: string;
try {
  data = fs.readFileSync('src/day9/input.txt', 'utf8');
} catch (err) {
  console.error(err);
}

const inputRows = data!.split("")

let memory = inputRows.flatMap((val, i) => {
  let nums: Block[] = []
  if (i % 2 === 0) {
    nums.push({
      type: 'memory',
      len: parseInt(val),
      index: i / 2
    })
  } else {
    nums.push({
      type: 'free',
      len: parseInt(val),
      index: i
    })
  }
  return [...nums];
})

let startIndex = memory.length - 1

while(true) {
  if(startIndex === 0) break
  
  if(memory[startIndex].type !== "memory") {
    startIndex--;
    continue;
  }

  let firstEmptyPos = -1;
  // Search for first empty sequence long enough 
  for(let i = 0; i < startIndex; i++) {
    if(memory[i].type === "free" && memory[i].len >= memory[startIndex].len) {
      firstEmptyPos = i;
      break;
    }
  }

  if(firstEmptyPos === -1) {
    startIndex--;
    continue
  }

  if(memory[startIndex].type !== "free") {
    if(memory[startIndex].len === memory[firstEmptyPos].len) {
      // Straight swap
      let temp = memory[startIndex];
      memory[startIndex] = memory[firstEmptyPos]
      memory[firstEmptyPos] = temp;
    } else if (memory[startIndex].len < memory[firstEmptyPos].len) {
      // Swap with moving empty space
      memory[firstEmptyPos].len -= memory[startIndex].len;
      let tempRemov = memory[startIndex];
      memory[startIndex] = {
        type: "free",
        index: tempRemov.index,
        len: tempRemov.len
      }
      memory = [...memory.slice(0, firstEmptyPos), 
        tempRemov, memory[firstEmptyPos],
         ...memory.slice(firstEmptyPos+1)];
    }
  }
  startIndex--;
}

console.log(checksum(transformToString(memory)))