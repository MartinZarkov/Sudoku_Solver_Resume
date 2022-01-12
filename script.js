const sudokuSolver = (function() {
    const inputElements = [];
    const wrapper = document.getElementsByClassName("sudoku")[0];

    let step = 0;

    for (let i = 0; i < 81; i++) {
        const element = document.createElement("input");
        element.type = "number";
        element.classList.add("number");

        inputElements[i] = element;
        wrapper.appendChild(element);
    }

    function getSquareIndex(i,j) {
        return Math.floor(i/3) + (Math.floor(j/3) * 3);
    }

    function findNumber(numbers, rows, cols, squares) {
        if(step > 1000) {
            alert("Too many loops, stops to prevent stack overflow!");
            return false;
        }

        step++;

        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                const cellNumber = numbers[i][j];
                
                if(cellNumber === 0) {
                    let possibilities = [];

                    for (let k = 1; k < 10; k++) {
                        const kover2 = Math.pow(2, k);
                        if(
                            (rows[i] & kover2) === 0 &&
                            (cols[j] & kover2) === 0 &&
                            (squares[getSquareIndex(i,j)] & kover2) === 0
                        ) {
                             possibilities.push(k);
                        }
                    }

                    if(possibilities.length === 1) {
                        
                        numbers[i][j] = possibilities[0];
                        inputElements[(i*9) + j].value = possibilities[0];
                        inputElements[(i*9) + j].classList.add("changed");

                        
                        const valueOver2 = Math.pow(2, possibilities[0]);
                        rows[i] = rows[i] | valueOver2;
                        cols[j] = cols[j] | valueOver2;
                        squares[getSquareIndex(i,j)] = squares[getSquareIndex(i,j)] | valueOver2;

                        return findNumber(numbers, rows, cols, squares);
                    }
                }
            }
        }

        return true;
    }

    return {
        solve: function() {
            const numbers = [];
            const rows = [0,0,0,0,0,0,0,0,0];
            const cols = [0,0,0,0,0,0,0,0,0];
            const squares = [0,0,0,0,0,0,0,0,0];
        
            
            for (let i = 0; i < 9; i++) {
                for (let j = 0; j < 9; j++) {
                    const cellNumber = parseInt(inputElements[(i*9)+j].value || 0);

                    if(numbers[i]) {
                        numbers[i][j] = cellNumber;
                    } else {
                        numbers[i] = [cellNumber];
                    }
                    
                    if(cellNumber > 0) {
                        
                        rows[i] = rows[i] | Math.pow(2, cellNumber);

                        
                        cols[j] = cols[j] | Math.pow(2, cellNumber);
                        squares[ getSquareIndex(i,j) ] = squares[ getSquareIndex(i,j) ] | Math.pow(2, cellNumber);
                    }
                }
            }

            
            if(findNumber(numbers, rows, cols, squares)) {

            }
        }
    }
})();