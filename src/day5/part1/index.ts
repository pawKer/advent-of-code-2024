import { testInput, input } from "../input";
import { stringInputToArray } from "../../utils/utils";

const inputData = input

const [orderingRules, pageNumbersList] = inputData.split('\n\n');

const orderingPerNumber: Map<number, number[]> = new Map()

stringInputToArray(orderingRules).forEach(pair => {
  const [a, b] = pair.split('|');
  const aNum = parseInt(a)
  const bNum = parseInt(b)
  if(orderingPerNumber.get(bNum)) {
    orderingPerNumber.get(bNum)?.push(aNum)
  } else {
    orderingPerNumber.set(bNum, [aNum])
  }
})

console.log(orderingPerNumber)
const correctOrderings: number[][] = []

stringInputToArray(pageNumbersList).forEach(list => {
  const nums = list.split(',').map(n => parseInt(n))
  let correct = true;
  for(let i = 0; i < nums.length; i++) {
    if(orderingPerNumber.get(nums[i])) {
      const orderings = orderingPerNumber.get(nums[i]);
      for(let j = i + 1; j < nums.length; j++) {
        if(orderings?.includes(nums[j])){
          correct = false;
          break
        }
      }
      if(!correct) {
        break
      }
    }
  }
  if(correct) (
    correctOrderings.push(nums)
  )
})

console.log(correctOrderings)

let sum = 0;
correctOrderings.forEach((list, index) => {
  sum += list[Math.floor(list.length / 2)]
})

console.log(sum)