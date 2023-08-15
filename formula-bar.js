//Updating value in properties after change in input
for(let i=0;i<allCells.length;i++)
{
    allCells[i].addEventListener("blur",(e)=>{
        let address=addressBar.value;
        let [updatedCell,updatedCellProp]=getActiveCell(address);
        let updatedValue=updatedCell.innerText;
        if( updatedValue === updatedCellProp.value) return;
        removeChildren(updatedCellProp.formula);
        updatedCellProp.formula="";
        updatedCellProp.value=updatedValue;
        updateChildrenCells(address);
    })
}
//Formula Working
let formulaBar=document.querySelector(".formula-bar");
formulaBar.addEventListener("keydown",async (e)=>{
    let formula=formulaBar.value;
    if(e.key === "Enter" && formulaBar.value)
    {
        let address=addressBar.value;
        let [cell,cellProp]=getActiveCell(address);
        if(formula !== cellProp.formula)
        {
            removeChildren(cellProp.formula);
        }
        updateRelationMatrix(formula,address);
        let cycleResponse=isGraphCyclic(relationMatrix);
        if(cycleResponse)
        {
            let userRespone=confirm("Your formula is cyclic.Do you want to trace the cyclic formula?");
            while(userRespone === true)
            {
                  await traceCycle(relationMatrix,cycleResponse);
                  userRespone=confirm("Your formula is cyclic.Do you want to trace the cyclic formula?");
            }
            removeCycleFromMatrix(formula,address);
            return;
        }

        //Adding children to parents
        let updatedValue=evaluateFormula(formula);
        setUiAndProp(updatedValue,formula,address);
        addChildToParent(formula);
        updateChildrenCells(address);
        console.log(cellPropsSheet);
    }
})
function updateRelationMatrix(formula,childAddress)
{
    let [childRid,childCid]=decodeAddress(childAddress);
    let encodedFormula=formula.split(" ");
    for(let i=0;i<encodedFormula.length;i++)
    {
        let ascii=encodedFormula[i].charCodeAt(0);
        if(ascii >= 65 && ascii <= 90)
        {
            let [parentRid,parentCid]=decodeAddress(encodedFormula[i]);
            relationMatrix[parentRid][parentCid].push([childRid,childCid]);
        }
    }
    
}
function removeCycleFromMatrix(formula,childAddress)
{
    let [childRid,childCid]=decodeAddress(childAddress);
    let encodedFormula=formula.split(" ");
    for(let i=0;i<encodedFormula.length;i++)
    {
        let ascii=encodedFormula[i].charCodeAt(0);
        if(ascii >= 65 && ascii <= 90)
        {
            let [parentRid,parentCid]=decodeAddress(encodedFormula[i]);
            relationMatrix[parentRid][parentCid].pop();

        }
    }
}
function evaluateFormula(formula){
    let encodedFormula=formula.split(" ");
    for(let i=0;i<encodedFormula.length;i++)
    {
        if(encodedFormula[i].charCodeAt(0)>= 65 && encodedFormula[i].charCodeAt(0) <= 90)
        {
            let [activeCell,cellProp]=getActiveCell(encodedFormula[i]);
            encodedFormula[i]=cellProp.value;
        }
    }
    let decodedFormula=encodedFormula.join(" ");
    return eval(decodedFormula);
}
function setUiAndProp(updatedValue,formula,address)
{
    let [activeCell,cellProp]=getActiveCell(address);
    activeCell.innerText=updatedValue;
    cellProp.value=updatedValue;
    cellProp.formula=formula;
}
function addChildToParent(formula)
{
    let encodedFormula=formula.split(" ");
        for(let i=0;i<encodedFormula.length;i++)
        {
        if(encodedFormula[i].charCodeAt(0)>= 65 && encodedFormula[i].charCodeAt(0) <= 90)
        {
            let [activeCell,cellProp]=getActiveCell(encodedFormula[i]);
            cellProp.children.push(addressBar.value);
        }
        }
}
function removeChildren(prevFormula)
{
    let childAddress=formulaBar.value;
    let encodedFormula=prevFormula.split(" ");
    for(let i=0;i<encodedFormula.length;i++)
    {
        if(encodedFormula[i].charCodeAt(0)>= 65 && encodedFormula[i].charCodeAt(0) <= 90)
        {
            let [parentCell,parentCellProp]=getActiveCell(encodedFormula[i]);
            let index=parentCellProp.children.indexOf(childAddress);
            parentCellProp.children.splice(index,1);
        }

    }
}
function updateChildrenCells(parentAddress){
  let [parentCell,parentCellProp]=getActiveCell(parentAddress);
  let children=parentCellProp.children;
  for(let i=0;i<children.length;i++)
  {
    let [childrenCell,childrenCellProp]=getActiveCell(children[i]);
    let childFormula=childrenCellProp.formula;
    let evaluatedValue=evaluateFormula(childFormula);
    setUiAndProp(evaluatedValue,childFormula,children[i]);
    updateChildrenCells(children[i]);
  }
}