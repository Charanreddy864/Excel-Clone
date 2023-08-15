function colorPromise()
{
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve();
        },1000);
    })
}
async function traceCycle(relationMatrix,cycleResponse)
{
    let [srcr,srcc]=cycleResponse;   
    let visited=[];
    let dfsVisited=[];
    for(let i=0;i<rows;i++)
    {
        let rowVisited=[];
        let dfsRowVisited=[];
        for(let j=0;j<columns;j++)
        {
            rowVisited.push(false);
            dfsRowVisited.push(false);
        }
        visited.push(rowVisited);
        dfsVisited.push(dfsRowVisited);
    } 
    let response= await traceCyclePath(relationMatrix,srcr,srcc,visited,dfsVisited);
    if(response === true)
    {
        return Promise.resolve(true);
    }
    return Promise.resolve(false);

}
async function traceCyclePath(relationMatrix, srcRow, srcCol, visited, dfsVisited) {

    visited[srcRow][srcCol] = true;
    dfsVisited[srcRow][srcCol] = true;
    let cell = document.querySelector(`.cell[rid="${srcRow}"][cid="${srcCol}"]`);
    cell.style.backgroundColor="lightblue";
    await colorPromise();
    
    for (let i = 0; i < relationMatrix[srcRow][srcCol].length; i++) {
        let [childrenRid, childrenCid] = relationMatrix[srcRow][srcCol][i];
        if (visited[childrenRid][childrenCid] === false) {
            let response = await traceCyclePath(relationMatrix, childrenRid, childrenCid, visited, dfsVisited);
            if (response === true) {
                cell.style.backgroundColor = "transparent";
                await colorPromise();
                return Promise.resolve(true);
            }
        } else if (dfsVisited[childrenRid][childrenCid]) {
            let cyclicCell = document.querySelector(`.cell[rid="${childrenRid}"][cid="${childrenCid}"]`);
            cyclicCell.style.backgroundColor = "lightsalmon";
            await colorPromise();
            cyclicCell.style.backgroundColor="transparent";
            cell.style.backgroundColor = "transparent";
            await colorPromise();

            return Promise.resolve(true);
        }
    }
    dfsVisited[srcRow][srcCol] = false;
    return Promise.resolve(false);
}





