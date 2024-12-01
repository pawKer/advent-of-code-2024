import { stringInputToArray } from "../../utils/utils";
import { input } from "../input";
const inputData = stringInputToArray(input)
const listA: number[] = []
const listB: number[] = []

inputData.forEach(elem => {
    const [a, b] = elem.split('   ');
    console.log(a, b)
    listA.push(parseInt(a))
    listB.push(parseInt(b))
})

const indices: number[] = []

listB.forEach((elem, i) => {
    if(indices[listB[i]]) {
        indices[listB[i]]++; 
    } else {
        indices[listB[i]] = 1; 
    }
})

const similarity = listA.reduce((acc, cur) => {
    let times = indices[cur]
    return times ? acc + cur * times : acc
}, 0)

console.log(similarity)