document.addEventListener("DOMContentLoaded", function(){

    let gridSize = 100;

    GenerateNewGrid(gridSize);
});

function GenerateNewGrid(gridSize)
{
    let gridSide = gridSize / 10;
    let currentIndex = 0;
    const gridHolder = document.getElementById("gridHolder");

    for(let i = 0; i < gridSide; i++)
    {
        for(let j = 0; j < gridSide; j++)
        {
            currentIndex ++;

            let newCell = document.createElement("div");
            newCell.classList.add("cell");
            newCell.textContent = currentIndex;

            AddClickEventToCell(newCell);
            gridHolder.appendChild(newCell);
        }
    }
}

function AddClickEventToCell(cell)
{
    const selectIntegersHolder = document.getElementById("selectIntegersHolder");

    cell.addEventListener("click", (e) => {
        
        cell.classList.add("cell-chosen");

        let newInteger = document.createElement("div");
        newInteger.textContent = cell.textContent;
        newInteger.classList.add("displayInteger");

        selectIntegersHolder.appendChild(newInteger);

        SortDisplayIntegers();

        
    } , { once: true } );
};

function SortDisplayIntegers()
{
    let integerArray = document.querySelectorAll(".displayInteger");
    console.log(integerArray);
}