import { testInput, input } from "../input";
import { stringInputToArray } from "../../utils/utils";

const inputData = stringInputToArray(input)

const evaluate = (total:BigInt, combination: string[]): boolean => {
  let tempTotal = BigInt(0);
  for(let i = 1; i < combination.length - 1; i+=2) {
    if(combination[i] === "+") {
      if(i === 1) {
        tempTotal = BigInt(combination[i-1]) + BigInt(combination[i+1])
      } else {
        tempTotal = tempTotal + BigInt(combination[i+1])
      }
      
    } else {
      if(i === 1) {
        tempTotal = BigInt(combination[i-1]) * BigInt(combination[i+1])
      } else {
        tempTotal = tempTotal * BigInt(combination[i+1])
      }
    }
  }
  if(tempTotal === total) {
    return true
  }
  return false;
}
let finalSum = BigInt(0)
inputData.forEach(row => {
  const [total, factorsString] = row.split(":");
  const totalInt = BigInt(total);
  const factors = factorsString.trim().split(" ");
 
  const combinations  = []
  for(let n = 0; n < factors.length-1; n++) {
    if(combinations.length === 0) {
      combinations.push([factors[n], "*"])
      combinations.push([factors[n], "+"])
    } else {

      combinations.forEach(comb => {
        combinations.push([...comb, factors[n], "*"])
        combinations.push([...comb, factors[n], "+"])
      })
    }
  }
  combinations.forEach(comb => {
    comb.push(factors[factors.length - 1])
  })
  const possible = combinations.filter(comb => comb.length === (factors.length + factors.length - 1)).filter(cm => evaluate(totalInt, cm));
  if(possible.length >= 1) {
    finalSum += totalInt
  }
})



console.log("ANSWER", finalSum)