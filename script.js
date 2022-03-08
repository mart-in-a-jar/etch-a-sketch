const content = document.querySelector(".content");
const clearButton = document.querySelector("#clearGrid");
const resetButton = document.querySelector("#newGrid");
const resetDiv = document.querySelector(".reset");
const dimensionsField = document.createElement("input");
dimensionsField.setAttribute("placeholder", "Number of squares");
const okButton = document.createElement("button");
okButton.textContent = "OK";
const colorPicker = document.querySelector("#colorPicker");
const root = document.querySelector(":root");
const changePageButton = document.querySelector("#changePage");
const modeButton = document.querySelector("#mode");

let mode = "color";

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
            divSquares[j].style["width"] = `${700 / columns}px`;
            divSquares[j].style["height"] = `${700 / rows}px`;
            divRows[i].appendChild(divSquares[j]);
        }
        content.appendChild(divRows[i]);
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
    }
}

function removeColor(target) {
    target.style["background-color"] = null;
}

function changeMode() {
    if (mode === "color") {
        mode = "rainbow";
        colorPicker.remove();
        modeButton.textContent = "Color mode";
    } else {
        mode = "color";
        content.insertBefore(colorPicker, modeButton);
        modeButton.textContent = "Rainbow mode";
    }
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
})

okButton.addEventListener("click", makeNewGrid);

changePageButton.addEventListener("click", () => {
    window.location.href = "./singlecolor/index.html"
});

modeButton.addEventListener("click", changeMode);

createGrid(20, 20);