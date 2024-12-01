import { stringInputToArray } from "../../utils/utils";
import { input } from "../input";
const inputData = stringInputToArray(input)
const listA: number[] = []
const listB: number[] = []

inputData.forEach(elem => {
    const [a, b] = elem.split('   ');
    listA.push(parseInt(a))
    listB.push(parseInt(b))
})

listA.sort();
listB.sort();

const sum = listA.reduce((accumulator, currentVal, index) => {
    let tempDiff = listA[index] - listB[index]
    if(tempDiff < 0) {
        tempDiff = tempDiff * -1;
    } 
    return accumulator + tempDiff
}, 0)

console.log(sum)