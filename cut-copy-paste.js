let ctrl;
let copyBtn=document.querySelector(".copy");
let pasteBtn=document.querySelector(".paste");
let cutBtn=document.querySelector(".cut");
let refTexts=document.querySelectorAll(".onHoverText");
copyBtn.addEventListener("mouseover",(e)=>{
    refTexts[0].style.opacity=1;
})
copyBtn.addEventListener("mouseout",(e)=>{
    refTexts[0].style.opacity=0;
})
pasteBtn.addEventListener("mouseover",(e)=>{
    refTexts[1].style.opacity=1;
})
pasteBtn.addEventListener("mouseout",(e)=>{
    refTexts[1].style.opacity=0;
})
cutBtn.addEventListener("mouseover",(e)=>{
    refTexts[2].style.opacity=1;
})
cutBtn.addEventListener("mouseout",(e)=>{
    refTexts[2].style.opacity=0;
})
document.addEventListener("keydown",(e)=>
{
    ctrl=e.ctrlKey;
})
document.addEventListener("keyup",(e)=>
{
    ctrl=e.ctrlKey;
})
for(let i=0;i<rows;i++)
{
    for(let j=0;j<columns;j++)
    {
        let cell=document.querySelector(`.cell[rid="${i}"][cid="${j}"]`);
        handleCellSelection(cell);
    }
}
let selectionRange=[];
function handleCellSelection(cell)
{
    cell.addEventListener("click",(e)=>
    {
        if(!ctrl) return;
        if(selectionRange.length>=2)
        {
            rewriteSelectionRange();
            selectionRange=[];

        }
        cell.style.border = "3px solid #218c74";
        selectionRange.push([cell.getAttribute("rid"),cell.getAttribute("cid")]);
    })
}
function rewriteSelectionRange()
{
   for(let i=0;i<selectionRange.length;i++)
   {
        let cell=document.querySelector(`.cell[rid="${selectionRange[i][0]}"][cid="${selectionRange[i][1]}"]`);
        cell.style.border="1px solid gray";
   }

}
let copyData=[];
copyBtn.addEventListener("click",(e)=>
{
  if(selectionRange.length===0) return;  
  if(selectionRange.length === 1)
  {
    selectionRange.push(selectionRange[0]);
  }
  copyData=[];
  let sRow=selectionRange[0][0];
  let sCol=selectionRange[0][1];
  let eRow=selectionRange[1][0];
  let eCol=selectionRange[1][1];
  for(let i=sRow;i<=eRow;i++)
  {
    let copyRow=[];
    for(let j=sCol;j<=eCol;j++)
    {
        copyRow.push(cellPropsSheet[i][j]);
    }
    copyData.push(copyRow);
  }
  rewriteSelectionRange();
//   console.log(copyData);
})
pasteBtn.addEventListener("click",(e)=>
{
    let address=addressBar.value;
    let [sRow,sCol]=decodeAddress(address);
    let rLength= Math.abs(selectionRange[0][0]-selectionRange[1][0]);
    let cLength= Math.abs(selectionRange[0][1]-selectionRange[1][1]);
    for(let i1=sRow,i2=0;i1<=sRow+rLength;i1++,i2++)
    {
        for(let j1=sCol,j2=0;j1<=sCol+cLength;j1++,j2++)
        {
            let cell=document.querySelector(`.cell[rid="${i1}"][cid="${j1}"]`);
            if(!cell) continue;
            let data=copyData[i2][j2];
            let cellProp=cellPropsSheet[i1][j1];
            cellProp.value=data.value;
            cellProp.bold=data.bold;
            cellProp.italic=data.italic;
            cellProp.underline=data.underline;
            cellProp.fontSize=data.fontSize;
            cellProp.fontFamily=data.fontFamily;
            cellProp.fontColor=data.fontColor;
            cellProp.bgColor=data.bgColor;
            cellProp.align=data.align;

            cell.click();
        }
    }

})
cutBtn.addEventListener("click",(e)=>{
    if(selectionRange.length===0) return;  
    if(selectionRange.length === 1)
    {
      selectionRange.push(selectionRange[0]);
    }
    copyData=[];
    let sRow=selectionRange[0][0];
    let sCol=selectionRange[0][1];
    let eRow=selectionRange[1][0];
    let eCol=selectionRange[1][1];
    for(let i=sRow;i<=eRow;i++)
    {
        for(let j=sCol;j<=eCol;j++)
        {
            let cell=document.querySelector(`.cell[rid="${i}"][cid="${j}"]`);
            let cellProp=cellPropsSheet[i][j];
            cellProp.value="";
            cellProp.bold=false;
            cellProp.italic=false;
            cellProp.underline=false;
            cellProp.fontSize=16;
            cellProp.fontFamily="sans-serif";
            cellProp.fontColor="#000000";
            cellProp.bgColor="#ecf0f1";
            cellProp.align="left";

            cell.click();

        }
    }
    rewriteSelectionRange();
})