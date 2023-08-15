//Creating cell props storage
let masterPropsDB=[];
let cellPropsSheet=[];
sheetAddBtn.click();
// for(let i=0;i<rows;i++)
// {
//     let rowSheet=[];
//     for(let j=0;j<columns;j++)
//     {
//        let cellProps={
//         fontFamily:"sans-serif",
//         fontSize:"16",
//         bold:false,
//         italic:false,
//         underline:false,
//         align:"left",
//         fontColor:"#000000",
//         bgColor:"FFFFFF",
//         value:"",
//         formula:"",
//         children:[]
//        }
//        rowSheet.push(cellProps)
//     }
//     cellPropsSheet.push(rowSheet);
// }
// Getting all icons
let fontFamily=document.querySelector(".font-family-prop");
let fontSize=document.querySelector(".font-size-prop");
let bold=document.querySelector(".bold");
let italic=document.querySelector(".italic");
let underline=document.querySelector(".underline");
let align=document.querySelectorAll(".align");
let leftAlign=align[0];
let centerAlign=align[1];
let rightAlign=align[2];
let fontColor=document.querySelector(".font-color-prop");
let bgColor=document.querySelector(".bg-color-prop");
let iconActiveColor="lightgray";
let iconInactiveColor="#ecf0f1";
//Adding event listeners
bold.addEventListener("click",(e)=>{
    let address=addressBar.value;
    let [cell,cellProps]=getActiveCell(address);
    cellProps.bold=!cellProps.bold;
    cell.style.fontWeight = cellProps.bold ? "bold":"normal";
    bold.style.backgroundColor= cellProps.bold ? iconActiveColor:iconInactiveColor;
});
italic.addEventListener("click",(e)=>{
    let address=addressBar.value;
    let [cell,cellProps]=getActiveCell(address);
    cellProps.italic=!cellProps.italic;
    cell.style.fontStyle = cellProps.italic ? "italic":"normal";
    italic.style.backgroundColor= cellProps.italic ? iconActiveColor:iconInactiveColor;
});
underline.addEventListener("click",(e)=>{
    let address=addressBar.value;
    let [cell,cellProps]=getActiveCell(address);
    cellProps.underline=!cellProps.underline;
    cell.style.textDecoration = cellProps.underline ? "underline":"none";
    underline.style.backgroundColor= cellProps.underline ? iconActiveColor:iconInactiveColor;
});
fontFamily.addEventListener("change",(e)=>{
    let address=addressBar.value;
    let [cell,cellProps]=getActiveCell(address);
    cellProps.fontFamily=fontFamily.value;
    cell.style.fontFamily=cellProps.fontFamily;
    fontFamily.value=cellProps.fontFamily;  
})
fontSize.addEventListener("change",(e)=>{
    let address=addressBar.value;
    let [cell,cellProps]=getActiveCell(address);
    cellProps.fontSize=fontSize.value;
    cell.style.fontSize=cellProps.fontSize + "px";
    fontSize.value=cellProps.fontSize;   
})
fontColor.addEventListener("change",(e)=>{
    let address=addressBar.value;
    let [cell,cellProps]=getActiveCell(address);
    cellProps.fontColor=fontColor.value;
    cell.style.color= cellProps.fontColor;
    fontColor.value=cellProps.fontColor;   
})
bgColor.addEventListener("change",(e)=>{
    let address=addressBar.value;
    let [cell,cellProps]=getActiveCell(address);
    cellProps.bgColor=bgColor.value;
    cell.style.backgroundColor= cellProps.bgColor;
    bgColor.value=cellProps.bgColor;    
})
align.forEach((alignEle) => {
    alignEle.addEventListener("click",(e)=>{
    let address=addressBar.value;
    let [cell,cellProps]=getActiveCell(address);
    let alignValue=e.target.classList[0];
    cellProps.align=alignValue;
    cell.style.textAlign=cellProps.align;
    
    switch(alignValue){
        case "left":
            leftAlign.style.backgroundColor=iconActiveColor;
            centerAlign.style.backgroundColor=iconInactiveColor;
            rightAlign.style.backgroundColor=iconInactiveColor;
            break;
        case "center":
            leftAlign.style.backgroundColor=iconInactiveColor;
            centerAlign.style.backgroundColor=iconActiveColor;
            rightAlign.style.backgroundColor=iconInactiveColor;
            break;
        case "right":
            leftAlign.style.backgroundColor=iconInactiveColor;
            centerAlign.style.backgroundColor=iconInactiveColor;
            rightAlign.style.backgroundColor=iconActiveColor;
            break;

    } 
    })
})
//Updating Icons On shifting cells
let allCells=document.querySelectorAll(".cell");
for(let i=0;i<allCells.length;i++)
{
    addListenerToUpdateIcons(allCells[i]);
}

function addListenerToUpdateIcons(cell){
    cell.addEventListener("click",(e)=>{
    let address=addressBar.value;
    let [rid,cid]=decodeAddress(address);
    let cellProps=cellPropsSheet[rid][cid];
    cell.style.fontWeight = cellProps.bold ? "bold":"normal";
    cell.style.fontStyle = cellProps.italic ? "italic":"normal";
    cell.style.textDecoration = cellProps.underline ? "underline":"none";
    cell.style.fontFamily=cellProps.fontFamily;
    cell.style.fontFamily=cellProps.fontFamily;
    cell.style.fontSize=cellProps.fontSize + "px";
    cell.style.color= cellProps.fontColor;   
    cell.style.backgroundColor= cellProps.bgColor;   
    cell.style.textAlign=cellProps.align;

    bold.style.backgroundColor= cellProps.bold ? iconActiveColor:iconInactiveColor;
    italic.style.backgroundColor= cellProps.italic ? iconActiveColor:iconInactiveColor;
    underline.style.backgroundColor= cellProps.underline ? iconActiveColor:iconInactiveColor;
    fontFamily.value=cellProps.fontFamily;  
    fontSize.value=cellProps.fontSize;   
    fontColor.value=cellProps.fontColor;   
    bgColor.value=cellProps.bgColor;
    switch(cellProps.align){
        case "left":
            leftAlign.style.backgroundColor=iconActiveColor;
            centerAlign.style.backgroundColor=iconInactiveColor;
            rightAlign.style.backgroundColor=iconInactiveColor;
            break;
        case "center":
            leftAlign.style.backgroundColor=iconInactiveColor;
            centerAlign.style.backgroundColor=iconActiveColor;
            rightAlign.style.backgroundColor=iconInactiveColor;
            break;
        case "right":
            leftAlign.style.backgroundColor=iconInactiveColor;
            centerAlign.style.backgroundColor=iconInactiveColor;
            rightAlign.style.backgroundColor=iconActiveColor;
            break;

    }   
    let formulaBar=document.querySelector(".formula-bar");
    formulaBar.value=cellProps.formula;
    cell.innerText=cellProps.value;   
    
    })
}
function getActiveCell(address){
    let [rid,cid]=decodeAddress(address);
    let cell=document.querySelector(`.cell[rid="${rid}"][cid="${cid}"]`);
    let cellProps=cellPropsSheet[rid][cid];
    return [cell,cellProps];
}
function decodeAddress(address){
    let rid=Number(address.slice(1)) - 1;
    let cid=Number(address.charCodeAt(0))-65;
    return [rid,cid];
}