export const stringInputToArray = (str: string): string[] => {
    return str.split('\n')
}

export const readAs2DArray = (data: string[]) => {
    let matrix: string[][] = []
    for (let i = 0; i < data.length; i++) {
        for(let j = 0; j < data[i].length; j++) {
            if(matrix[i]) {
                matrix[i].push(data[i][j])
            } else {
                matrix[i] = [data[i][j]]
            }
        }
    }
    return matrix
}

export const print2DArray = (matrix: string[][]) => {
    let string = ""
    for (let i = 0; i < matrix.length; i++) {
        for(let j = 0; j < matrix[i].length; j++) {
            string += matrix[i][j] + " "
        }
        string += "\n"
    }
    console.log(string)
}