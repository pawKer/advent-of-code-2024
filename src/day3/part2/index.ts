import { testInput2 } from "../input";
import fs from 'node:fs';

let data;
try {
  data = fs.readFileSync('src/day3/input.txt', 'utf8');
//   console.log(data);
} catch (err) {
  console.error(err);
}

const inputData = data

const matches = [...inputData!.matchAll(/mul\([0-9]+,[0-9]+\)|do\(\)|don't\(\)/gm)]
const temp = matches.flatMap(arr => {
    return arr[0]
})

let mostRecentInst: string;
const sum = temp.reduce((acc, currentVal) => {
    if(!currentVal.startsWith('mul')) {
        mostRecentInst = currentVal
        return acc;
    }

    if(mostRecentInst === `don't()`) {
        return acc;
    } else if (!mostRecentInst || mostRecentInst === `do()`) {
        const nums = /mul\(([0-9]+)?,([0-9]+)?\)/.exec(currentVal);
        if(nums)
            return acc + parseInt(nums[1]) * parseInt(nums[2])
    }

    return acc;
}, 0)

console.log(sum)