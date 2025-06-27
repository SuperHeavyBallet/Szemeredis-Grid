document.addEventListener("DOMContentLoaded", function(){
    
    const restartButton = document.getElementById("restartButton");

    restartButton.addEventListener("click", (e) =>{
        e.preventDefault();

        console.log("Clicked Restart");

        ClearOldGrid();
        StartNewGrid();
    })

    NewGridCycle();
});

function NewGridCycle()
{
    console.log("New Grid");
    StartNewGrid();
}

function StartNewGrid()
{
    let gridSize = 100;

    GenerateNewGrid(gridSize);
}

function ClearOldGrid(){

    const gridHolder = document.getElementById("gridHolder");

    while(gridHolder.childElementCount > 0)
    {
        gridHolder.removeChild(gridHolder.lastChild);
    }

    
}

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
        CheckArithmeticProgressions();
        DisplayPercentageChosen();


        
    } , { once: true } );
};



function SortDisplayIntegers()
{
    let integerArray = Array.from(document.querySelectorAll(".displayInteger"));
    let sortedArray = [];



    integerArray.sort((a, b) => {
        const valA = parseInt(a.textContent, 10);
        const valB = parseInt(b.textContent, 10);
        return valA - valB;
      });


      const selectIntegersHolder = document.getElementById("selectIntegersHolder");

      while(selectIntegersHolder.childElementCount > 0)
      {
        selectIntegersHolder.removeChild(selectIntegersHolder.lastChild);
      }

      integerArray.forEach((integer) => {
        let newInteger = document.createElement("div");
        newInteger.textContent = integer.textContent;
        newInteger.classList.add("displayInteger");

        selectIntegersHolder.appendChild(newInteger);
      })


}

function DisplayPercentageChosen()
{
    const percentageDisplay = document.getElementById("percentageDisplay");
    const cells = document.getElementsByClassName("cell");
    let cellCount = cells.length;

    const selectIntegersHolder = document.getElementById("selectIntegersHolder");
    let totalChosenCells = selectIntegersHolder.childElementCount;

    percentageDisplay.textContent = totalChosenCells +  " / " + cellCount;
}

function CheckArithmeticProgressions(){

    let integerArray = Array.from(document.querySelectorAll(".displayInteger"))
    .map(el => parseInt(el.textContent, 10))
    .sort((a, b) => a - b);

    for(let i = 0; i < integerArray.length; i++)
    {
        for(let j = i + 1; j < integerArray.length; j++)
        {
            let a = integerArray[i];
            let b = integerArray[j];
            let d = b - a;
            let c = b + d;

            if(integerArray.includes(c)){
                HighlightAP(a, b, c);
                DisplayProgressionAmount(b-a);
                AddNewProgression(b-a);
                return;
            }
        }
    }
}

function HighlightAP(a,b,c)
{
    let selected = Array.from(document.querySelectorAll(".displayInteger"));

    [a,b,c].forEach(val => {
        let match = selected.find(el => parseInt(el.textContent, 10) === val);
        if(match) match.classList.add("highlight-ap");
    });

    const cells = Array.from(document.getElementsByClassName("cell"));

    console.log(cells);

    cells.forEach(cell => {

        

        
        if(cell.textContent == a || cell.textContent == b || cell.textContent == c)
        {
            cell.classList.add("highlight-cell");
        }
        else{
            cell.classList.remove("highlight-cell");
        }
    })

    console.log(`Arithmetic progression found: ${a}, ${b}, ${c}`);
}

function DisplayProgressionAmount(amount)
{
    const progressionDisplay = document.getElementById("progressionDisplay");

    progressionDisplay.textContent = "Arithmetic Progression: " + amount;
}

function AddNewProgression(progressionAmount)
{
    const collectedProgressions = document.getElementById("collectedProgressions");

    collectedProgressions.textContent = collectedProgressions.textContent + ", " + progressionAmount;
}