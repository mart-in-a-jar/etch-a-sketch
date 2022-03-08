const content = document.querySelector(".content");

function createGrid(rows, columns) {
    const divRows = [];
    for (let i = 0; i < rows; i++) {
        divRows.push(document.createElement("div"));
        divRows[i].classList.add("gridRow");
        const divColumns  = [];
        for (let j = 0; j < columns; j++) {
            divColumns.push(document.createElement("div"));
            divColumns[j].classList.add("gridSquare");
            divRows[i].appendChild(divColumns[j]);
        }
        content.appendChild(divRows[i]);
    }
    return divRows;
}

createGrid(16, 16);

const rows = document.querySelectorAll(".gridRow");
const columns = document.querySelectorAll(".gridSquare");
