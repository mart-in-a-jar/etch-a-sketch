const optionsDiv = document.querySelector(".options");
const drawingBoard = document.querySelector(".drawingBoard");
const clearButton = document.querySelector("#clearGrid");
const resetButton = document.querySelector("#newGrid");
const resetDiv = document.querySelector(".reset");
const dimensionsField = document.createElement("input");
dimensionsField.setAttribute("placeholder", "Number of squares");
const okButton = document.createElement("button");
okButton.textContent = "OK";
const colorPicker = document.querySelector("#colorPicker");
const boardSize = getComputedStyle(document.querySelector(":root")).getPropertyValue("--boardSize");
const changePageButton = document.querySelector("#changePage");
const modeButtons = document.querySelectorAll("button.mode");
const gridPicker = document.querySelector("#toggleGrid");

let mode = "color";
let opacity = 10;
let showGrid = false;

function createGrid(rows, columns) {
    removeGrid()
    const divRows = [];
    for (let i = 0; i < rows; i++) {
        divRows.push(document.createElement("div"));
        divRows[i].classList.add("gridRow");
        const divSquares = [];
        for (let j = 0; j < columns; j++) {
            divSquares.push(document.createElement("div"));
            divSquares[j].classList.add("gridSquare");
            divSquares[j].style["width"] = `${+boardSize / columns}px`;
            divSquares[j].style["height"] = `${+boardSize / rows}px`;
            divRows[i].appendChild(divSquares[j]);
        }
        drawingBoard.appendChild(divRows[i]);
    }
    const squares = document.querySelectorAll(".gridSquare");

    squares.forEach(square => {
        square.addEventListener("mouseover", e => {
            if (e.buttons === 1) {
                applyColor(e.target);
                if (e.ctrlKey) {
                    removeColor(e.target);
                }
            }
        });
        square.addEventListener("mousedown", e => {
            if (e.ctrlKey) {
                removeColor(e.target);
            } else {
                applyColor(e.target);
            }
        });
    });
    toggleGrid();
}

function clearGrid() {
    const squares = document.querySelectorAll(".gridSquare");
    squares.forEach(square => {
        removeColor(square);
    });
}

function removeGrid() {
    const rows = document.querySelectorAll(".gridRow");
    rows.forEach(row => {
        row.remove();
    });
}

function newGrid() {
    resetDiv.appendChild(dimensionsField);
    dimensionsField.value = "";
    resetDiv.appendChild(okButton);
    resetButton.remove();
}

function makeNewGrid() {
    let num = dimensionsField.value;
    if (Number.isInteger(Number(num))) {
        if (num > 75) num = 75;
        createGrid(num, num);
        okButton.remove();
        dimensionsField.remove();
        resetDiv.appendChild(resetButton);
    }
}

function applyColor(target) {
    if (mode === "color") {
        target.style["background-color"] = colorPicker.value;
    } else if (mode === "rainbow") {
        const randomR = Math.floor(Math.random() * 256);
        const randomG = Math.floor(Math.random() * 256);
        const randomB = Math.floor(Math.random() * 256);
        target.style["background-color"] = `rgb(${randomR}, ${randomG}, ${randomB})`;
    } else if (mode === "gradient") {
        let color = `${colorPicker.value}${opacity}`
        target.style["background-color"] = color;
        console.log(color);
        if (opacity === "") {
            opacity = 10;
        }
        else if (opacity < 90) {
            opacity += 10;
        } else if (opacity === 90) {
            opacity = "";
        }
    }
}

function removeColor(target) {
    target.style["background-color"] = null;
}

function changeMode(button) {
    modeButtons.forEach(mode => {
        mode.classList.remove("activeMode");
    })
    if (button.classList.contains("color")) {
        mode = "color";
        button.classList.add("activeMode");
        if (!document.querySelector("#colorPicker")) {
            optionsDiv.insertBefore(colorPicker, button);
        }
    } else if (button.classList.contains("rainbow")) {
        mode = "rainbow";
        button.classList.add("activeMode");
        colorPicker.remove();
    } else if (button.classList.contains("gradient")) {
        mode = "gradient";
        button.classList.add("activeMode");
        if (!document.querySelector("#colorPicker")) {
        optionsDiv.insertBefore(colorPicker, modeButtons[0]);
        }
        opacity = 10;
    }
}

function toggleGrid() {
    const squares = document.querySelectorAll(".gridSquare");
    if (showGrid) {
        squares.forEach(square => {
            square.style["border"] = "1px dotted rgba(0, 0, 0, 0.07)";
        });
    } else {
        squares.forEach(square => {
            square.style["border"] = "";
        });
    };
}

clearButton.addEventListener("click", () => {
    clearGrid();
});

resetButton.addEventListener("click", () => {
    newGrid();
    dimensionsField.select()
});

dimensionsField.addEventListener("keyup", e => {
    if (e.key === "Enter") makeNewGrid();
});

okButton.addEventListener("click", makeNewGrid);

changePageButton.addEventListener("click", () => {
    window.location.href = "./singlecolor/index.html"
});

modeButtons.forEach(button => {
    button.addEventListener("click", e => {
        changeMode(e.target);
    });
});

gridPicker.addEventListener("change", () => {
    if (gridPicker.checked) {
        showGrid = true;
        toggleGrid();
    } else {
        showGrid = false;
        toggleGrid();
    }
});

createGrid(20, 20);