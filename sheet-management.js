let activeSheetColor="lightgray";
let sheetAddBtn=document.querySelector(".sheet-add-icon");
let sheetsContainer=document.querySelector(".sheets-folder-cont");
sheetAddBtn.addEventListener("click",(e)=>{
    let sheet=document.createElement("div");
    sheet.classList.add("sheet-folder");
    let allSheets=document.querySelectorAll(".sheet-folder");
    sheet.setAttribute("id",allSheets.length);
    sheet.innerHTML=`<div class="sheet-cont">Sheet ${allSheets.length + 1}</div>`;
    sheetsContainer.appendChild(sheet);
    sheet.scrollIntoView();
    createSheetProps();
    createRelationMatrix();
    handleSheetActiveness(sheet);
    handleSheetRemoval(sheet);
    sheet.click();
})
function handleSheetRemoval(sheet){
    sheet.addEventListener("mousedown",(e)=>{
        if(e.button !== 2)
        {
            return;
        }
        let allSheets=document.querySelectorAll(".sheet-folder");
        if(allSheets.length === 1)
        {
            alert("You need to have atleast one sheet");
            return;
        }
        let response=confirm("This sheet will be deleted permanently.");
        if(response === false)
        {
            return;
        }
        let sheetIdx=Number(sheet.getAttribute("id"));
        masterPropsDB.splice(sheetIdx,1);
        masterRelationMatrixDB.splice(sheetIdx,1);
        handleSheetUiRemoval(sheet); 
        handleSheetProps();
    })
}
function handleSheetUiRemoval(sheet)
{
    sheet.remove();
    let allSheets=document.querySelectorAll(".sheet-folder");
    for(let i=0;i<allSheets.length;i++)
    {
        allSheets[i].setAttribute("id",i);
        let sheetContent=allSheets[i].querySelector(".sheet-cont");
        sheetContent.innerText=`Sheet ${i+1}`
        allSheets[i].style.backgroundColor="transparent";
    }
    allSheets[0].style.backgroundColor="lightgray";
    allSheets[0].click();


}
function handleSheetDB(sheetIdx)
{
    cellPropsSheet=masterPropsDB[sheetIdx];
    relationMatrix=masterRelationMatrixDB[sheetIdx];
}
function handleSheetProps()
{
    for(let i=0;i<rows;i++)
    {
        for(let j=0;j<columns;j++)
        {
            let cell=document.querySelector(`.cell[rid="${i}"][cid="${j}"]`);
            cell.click();
        }
    }
    let firstCell=document.querySelector(".cell");
    firstCell.click();
}
function handleSheetUI(sheet){
   let allSheet=document.querySelectorAll(".sheet-folder");
   for(let i=0;i<allSheet.length;i++)
   {
    allSheet[i].style.backgroundColor="transparent";
   }
   sheet.style.backgroundColor="lightgray";
}
function handleSheetActiveness(sheet)
{
    sheet.addEventListener("click",(e)=>{
        let sheetIdx=sheet.getAttribute("id");
        handleSheetDB(sheetIdx);
        handleSheetProps();
        handleSheetUI(sheet);
    })
}
function createSheetProps(){
    let cellPropsSheet=[];
    for(let i=0;i<rows;i++)
    {
        let rowSheet=[];
        for(let j=0;j<columns;j++)
        {
           let cellProps={
            fontFamily:"sans-serif",
            fontSize:"16",
            bold:false,
            italic:false,
            underline:false,
            align:"left",
            fontColor:"#000000",
            bgColor:"FFFFFF",
            value:"",
            formula:"",
            children:[]
           }
           rowSheet.push(cellProps)
        }
        cellPropsSheet.push(rowSheet);
    }
    masterPropsDB.push(cellPropsSheet);
}
function createRelationMatrix(){
    let relationMatrix=[];
    for(let i=0;i<rows;i++)
    {
        let row=[];
        for(let j=0;j<columns;j++)
        {
            row.push([]);
        }
        relationMatrix.push(row);
    }
    masterRelationMatrixDB.push(relationMatrix);
}