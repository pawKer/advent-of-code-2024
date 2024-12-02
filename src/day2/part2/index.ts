import { stringInputToArray} from "../../utils/utils";
import { input, testInput } from "../input";
const inputData = stringInputToArray(input)
let safeReports = 0;
inputData.forEach(line => {
    const report = line.split(' ').map(n => parseInt(n));

    let allDecreasing = true;
    let removedOneLevel = false;
    let allIncreasing = true;

    // Check decreasing
    for(let i = 0; i < report.length - 1; i++) {
        if(report[i] - report[i+1] > 3 || report[i] - report[i+1] < 1) {
            if(i + 2 >= report.length && !removedOneLevel) {
                break;
            }

            if (i === 0 && !removedOneLevel) {
                if(((report[i+1] - report[i+2]) <= 3) && ((report[i+1] - report[i+2]) >= 1)) {
                    removedOneLevel=true
                    continue;
                }
            }

            if(!removedOneLevel && ((report[i] - report[i+2]) <= 3) && ((report[i] - report[i+2]) >= 1))
            {
                removedOneLevel = true
                i++;
            } else if (!removedOneLevel && ((report[i-1] - report[i+1]) <= 3) && ((report[i-1] - report[i+1]) >= 1)) {
                removedOneLevel = true
            }
            else {
                allDecreasing = false;
                break;
            }

        }
    }
    // Check increasing
    removedOneLevel = false
    if(!allDecreasing) {
        for(let i = 0; i < report.length - 1; i++) {
            if(report[i+1] - report[i] > 3 || report[i+1] - report[i] < 1) {
                if(i+2 >= report.length && !removedOneLevel) {
                    break;
                }
                if (i === 0 && !removedOneLevel) {
                    if(((report[i+2] - report[i+1]) <= 3) && ((report[i+2] - report[i+1]) >= 1)) {
                        removedOneLevel=true
                        continue;
                    }
                }

                if(!removedOneLevel && ((report[i+2] - report[i]) <= 3) && ((report[i+2] - report[i]) >= 1)) {
                    removedOneLevel = true
                    i++;
                    
                } else if (!removedOneLevel && ((report[i+1] - report[i-1]) <= 3) && ((report[i+1] - report[i-1]) >= 1)) {
                    removedOneLevel = true
                } else {
                    allIncreasing = false;
                    break;
                }
            }
        }    
    }
    if (allDecreasing || allIncreasing) {
        safeReports++;
        console.log(JSON.stringify(report), `-> SAFE`)
    } else {
        console.log(JSON.stringify(report))
    }
    

})
console.log('SAFE', safeReports)

