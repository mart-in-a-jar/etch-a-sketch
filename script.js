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
            divSquares[j].style["width"] = `${800 / columns}px`;
            divSquares[j].style["height"] = `${800 / rows}px`;
            divRows[i].appendChild(divSquares[j]);
        }
        content.appendChild(divRows[i]);
    }
    const squares = document.querySelectorAll(".gridSquare");

    squares.forEach(square => {
        square.addEventListener("mousemove", e => {
            if (e.buttons === 1) {
                e.target.classList.add("hovered");
                if (e.ctrlKey) {
                e.target.classList.remove("hovered");
                }
            }
        });
        square.addEventListener("click", e => {
            if (e.ctrlKey) {
                e.target.classList.remove("hovered");
            } else {
            e.target.classList.add("hovered");
            }
        });
    });
}

function clearGrid() {
    const squares = document.querySelectorAll(".gridSquare");
    squares.forEach(square => {
        square.classList.remove("hovered");
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

function changeColor(color) {
    root.style.setProperty("--coloringColor", color);
}

colorPicker.addEventListener("change", () => {
    changeColor(colorPicker.value);
} )

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

createGrid(20, 20);