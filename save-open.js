let downloadBtn=document.querySelector(".download");
let uploadBtn=document.querySelector(".upload");
downloadBtn.addEventListener("mouseover",(e)=>{
    refTexts[3].style.opacity=1;
})
downloadBtn.addEventListener("mouseout",(e)=>{
    refTexts[3].style.opacity=0;
})
uploadBtn.addEventListener("mouseover",(e)=>{
    refTexts[4].style.opacity=1;
})
uploadBtn.addEventListener("mouseout",(e)=>{
    refTexts[4].style.opacity=0;
})
downloadBtn.addEventListener("click",(e)=>{
    let jsonData=JSON.stringify([cellPropsSheet,relationMatrix]);
    let file=new Blob([jsonData],{type: "application/json"});
    let a=document.createElement("a");
    a.href=URL.createObjectURL(file);
    a.download="SheetData.json";
    a.click();
})
uploadBtn.addEventListener("click",(e)=>{
    let input=document.createElement("input");
    input.setAttribute("type","file");
    input.click();
    input.addEventListener("change",(e)=>{
        let reader=new FileReader();
        let files=input.files;
        let fileObj=files[0];
        reader.readAsText(fileObj);
        reader.addEventListener("load",(e)=>{
            let sheetData=JSON.parse(reader.result);
            sheetAddBtn.click();
            cellPropsSheet=sheetData[0];
            relationMatrix=sheetData[1];
            masterPropsDB[masterPropsDB.length-1]=cellPropsSheet;
            masterRelationMatrixDB[masterRelationMatrixDB.length-1]=relationMatrix;
            handleSheetProps();
        })
    })
})
