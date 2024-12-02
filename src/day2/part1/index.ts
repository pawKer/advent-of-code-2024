import { stringInputToArray, readAs2DArray} from "../../utils/utils";
import { input } from "../input";
const inputData = stringInputToArray(input)
let safeReports = 0;
inputData.forEach(line => {
    const report = line.split(' ').map(n => parseInt(n));
    console.log(report)
    let allDecreasing = true;
    let allIncreasing = true;
    for(let i = 0; i < report.length - 1; i++) {
        if(report[i] - report[i+1] > 3 || report[i] - report[i+1] < 1) {
            allDecreasing = false
        }
        if(report[i+1] - report[i] > 3 || report[i+1] - report[i] < 1) {
            allIncreasing = false
        }
    }
    if (allDecreasing || allIncreasing) {
        safeReports++;
    }

})
console.log(safeReports)

