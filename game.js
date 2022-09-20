var grid;
const EMPTY = '.'
const possibleNumbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
const emptyPoints = [];

window.onload = function () {
    initialize();
}

function initialize() {

    grid = [
        [".", ".", ".", ".", ".", ".", ".", ".", "."],
        [".", ".", ".", ".", ".", ".", ".", ".", "."],
        [".", ".", ".", ".", ".", ".", ".", ".", "."],
        [".", ".", ".", ".", ".", ".", ".", ".", "."],
        [".", ".", ".", ".", ".", ".", ".", ".", "."],
        [".", ".", ".", ".", ".", ".", ".", ".", "."],
        [".", ".", ".", ".", ".", ".", ".", ".", "."],
        [".", ".", ".", ".", ".", ".", ".", ".", "."],
        [".", ".", ".", ".", ".", ".", ".", ".", "."]
    ]

}

function readGrid() {

    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            let id = i * 9 + j + 1;
            let idString = id.toString();
            let val = document.getElementById(idString).value;
            if (val === "") grid[i][j] = ".";
            else grid[i][j] = val;
        }
    }

}

function isNotADigit(val) {
    console.log('val - ', val);
    let res = true;
    for (let i = 0; i < 9; i++) {
        if (val === '.' || val === possibleNumbers[i]) {
            res = false;
            break;
        }
    }
    return res;
}


function validateGrid() {
    let rows = new Set();
    let cols = new Set();
    let boxes = new Set();
    let curRowElem;
    let curColElem;
    let curBoxElem;
    let isAllEmpty = true;

    for (let i = 0; i < 9; i += 1) {
        for (let j = 0; j < 9; j += 1) {
            if (grid[i][j] !== '.') {
                isAllEmpty = false;
                break;
            }
        }
        if (!isAllEmpty) {
            break;
        }
    }

    if (isAllEmpty) {
        return "Invalid Grid. Enter some numbers in the grid";
    }

    console.log("gird - ", grid);

    for (let i = 0; i < 9; i += 1) {
        for (let j = 0; j < 9; j += 1) {
            if (isNotADigit(grid[i][j])) {
                return "Invalid Grid. Enter only digits between 1-9";
            }
        }
    }

    for (let i = 0; i < 9; i += 1) {
        for (let j = 0; j < 9; j += 1) {
            curRowElem = grid[i][j]
            curColElem = grid[j][i]
            curBoxElem = grid[3 * Math.floor(i / 3) + Math.floor(j / 3)][((i * 3) % 9) + (j % 3)]

            if (rows.has(curRowElem)) return "Invalid Grid. Please enter numbers as per the guidelines.";
            if (curRowElem !== ".") rows.add(curRowElem);

            if (cols.has(curColElem)) return "Invalid Grid. Please enter numbers as per the guidelines.";
            if (curColElem !== ".") cols.add(curColElem);

            if (boxes.has(curBoxElem)) return "Invalid Grid. Please enter numbers as per the guidelines.";
            if (curBoxElem !== ".") boxes.add(curBoxElem);

            let val = grid[i][j];
            if (val !== ".") {
                let value = parseInt(val);
                if (value < 1 || value > 9) return "Invalid Grid. Enter values in the range 1-9!";
            }
        }

        rows.clear()
        cols.clear()
        boxes.clear()
    }
    return "Valid Grid";
}

function validate() {
    readGrid();
    let result = validateGrid();
    alert(result);
}



function solve() {
    readGrid();
    let res = validateGrid();
    if (res === "Valid Grid") {
        solveGrid();
    } else {
        alert(res);
    }

}

function checkIfValid(number, row, col, grid) {
    for (let i = 0; i < grid.length; i += 1) {
        if (grid[row][i] === number) {
            return false;
        }

        if (grid[i][col] === number) {
            return false;
        }
    }
    const rowStart = Math.floor(row / 3) * 3
    const colStart = Math.floor(col / 3) * 3
    for (let i = rowStart; i < rowStart + 3; i += 1) {
        for (let j = colStart; j < colStart + 3; j += 1) {
            if (grid[i][j] === number) {
                return false;
            }
        }
    }
    return true;
}

function backtrack(emptyPointIndex) {
    if (emptyPointIndex >= emptyPoints.length) {
        return true;
    }
    const { row, col } = emptyPoints[emptyPointIndex]
    for (let i = 0; i < possibleNumbers.length; i += 1) {
        const num = possibleNumbers[i];
        const isValid = checkIfValid(num, row, col, grid);
        if (isValid) {
            grid[row][col] = num;
            const hasRecursiveSolution = backtrack(emptyPointIndex + 1)
            if (hasRecursiveSolution) {
                return true;
            }
            grid[row][col] = EMPTY;
        }
    }
    return false;
}

function solveGrid() {
    for (let i = 0; i < grid.length; i += 1) {
        for (let j = 0; j < grid[i].length; j += 1) {
            if (grid[i][j] === EMPTY) {
                emptyPoints.push({ row: i, col: j })
            }
        }
    }
    backtrack(0);

    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            let val = i * 9 + j + 1;
            let existingValue = document.getElementById(val.toString()).value;
            document.getElementById(val.toString()).value = grid[i][j];
            if (existingValue === "")
                document.getElementById(val.toString()).style.color = "#ECFB36";
        }
    }


};

function reset() {
    window.location.reload();
}