let collectedProgressionArray = [];
let progressionAmountInput;
let countProgression = 100;
let restartButton;
let gridSizeInput;
let gridSize = 100;

document.addEventListener("DOMContentLoaded", function(){

    SetUpNewGrid();
   
});

function SetUpNewGrid()
{
    SetupProgressionInput();
    SetupRestartButton();
    SetUpGridSize();
    GenerateNewGrid(gridSize);

}

function SetupProgressionInput()
{
    progressionAmountInput = document.getElementById("progressionAmount");

    progressionAmountInput.addEventListener("change", (e) => {
        e.preventDefault();
        countProgression = parseInt(progressionAmountInput.value);
    })
}

function SetupRestartButton()
{
    restartButton = document.getElementById("restartButton");

    restartButton.addEventListener("click", (e) =>{
        e.preventDefault();

        ClearOldGrid();
        ClearProgressions();
        SetUpNewGrid();
    })
}

function SetUpGridSize()
{
    gridSizeInput = document.getElementById("gridSize");
    gridSizeInput.addEventListener("input", (e) =>{
        e.preventDefault();
        console.log(gridSizeInput.value);
        gridSize = parseInt(gridSizeInput.value);
    })
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

    // Gather the selected Integers in whole and build an ordered array from them
    let integerArray = Array.from(document.querySelectorAll(".displayInteger"))
    .map(el => parseInt(el.textContent, 10))
    .sort((a, b) => a - b);

    let foundProgressions = [];

    ///Check all pairs (a, b) in the array, where b comes after a, 
    //to find a constant difference d, 
    for(let i = 0; i < integerArray.length; i++)
    {
        for(let j = i + 1; j < integerArray.length; j++)
        {
            //Create values for each element and the next ie i + 1, i + 2, i + 3 etc
            let a = integerArray[i];
            let b = integerArray[j];

            //Create value for the difference between those two
            let d = b - a;
            //Create value for the next integer + the difference between those two
            let c = b + d;

            // Extension for four step progression
            let e = c + d;        // 4th value

            let hasC = integerArray.includes(c);
            let hasE = integerArray.includes(e);

            // FIX - This seems to double add, so if 3 AP is present, add and then also it can add 4 AP as well, not instead
            if (hasC) 
            {

                if (hasE) {
                    foundProgressions.push([a, b, c, e]);
                    console.log("4 AP");
                }
                else{
                    foundProgressions.push([a, b, c]);
                    console.log("3 AP");
                }

                
            }
    
        }
    }

    // You can now display or handle them all
    for (let progression of foundProgressions) {
        HighlightAP(...progression);
        DisplayProgressionAmount(progression[1] - progression[0]);
        AddNewProgression(progression[1] - progression[0]);
    }
}

function HighlightAP(a,b,c)
{
    let selected = Array.from(document.querySelectorAll(".displayInteger"));

    for(let i = 0; i < selected.length; i++)
    {
        selected[i].classList.remove("highlight-ap");
    }


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

    collectedProgressionArray.push(progressionAmount);
    let newString = "";

    for(let i = 0; i < collectedProgressionArray.length; i++)

    {
        newString = newString + ", [ " + collectedProgressionArray[i] + " ]"
    }

    console.log(newString);
    collectedProgressions.textContent = "";

    collectedProgressions.textContent = newString;
}

function ClearProgressions()
{
    const storedProgressions = document.getElementById("selectIntegersHolder");
    
    while(storedProgressions.childElementCount > 0)
    {
        storedProgressions.removeChild(storedProgressions.lastChild);
    }
}