let rows=100;
let columns=26;
let rowNumberCont= document.querySelector(".row-number-cont");
let colLetterCont=document.querySelector(".column-letter-cont");
let cellsCont=document.querySelector(".cells-cont");
let addressBar=document.querySelector(".address-bar");
for(let i=0;i<rows;i++)
{
    let rowNum=document.createElement("div");
    rowNum.innerText=i+1;
    rowNum.classList.add("row-numbers");
    rowNumberCont.appendChild(rowNum);
}
for(let i=0;i<columns;i++)
{
    let colLetter=document.createElement("div");
    colLetter.innerText=String.fromCharCode(i+65);
    colLetter.classList.add("col-letters");
    colLetterCont.appendChild(colLetter);

}
for(let i=0;i<rows;i++)
{
    let rowCellCont=document.createElement("div");
    rowCellCont.classList.add("row-cell-cont");
    for(let j=0;j<columns;j++)
    {
        let cell=document.createElement("div");
        cell.classList.add("cell");
        cell.setAttribute("contenteditable","true");
        cell.setAttribute("spellcheck","false");
        cell.setAttribute("rid",i);
        cell.setAttribute("cid",j);
        rowCellCont.appendChild(cell);
        addListenerToCell(cell,i,j);
    }
    cellsCont.appendChild(rowCellCont);
}
//Address bar functioning
function addListenerToCell(cell,i,j){
    cell.addEventListener("click",(e) => {
        let rowID=i+1;
        let colID= String.fromCharCode(65+j);
        addressBar.value=colID+rowID;
})
}