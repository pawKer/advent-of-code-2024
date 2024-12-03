import { testInput } from "../input";

const fs = require('node:fs');
let data;
try {
  data = fs.readFileSync('src/day3/input.txt', 'utf8');
  console.log(data);
} catch (err) {
  console.error(err);
}

const inputData = data

const matches = [...inputData.matchAll(/mul\([0-9]+,[0-9]+\)/g)]

const product = matches.reduce((acc, currentVal) => {
    console.log(currentVal[0])
    const nums = /mul\(([0-9]+)?,([0-9]+)?\)/.exec(currentVal[0]);
    if(nums){
        return acc + (parseInt(nums[1]) * parseInt(nums[2]));
    }
    return acc
}, 0)
console.log(product)