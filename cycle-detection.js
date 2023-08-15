let masterRelationMatrixDB=[];
let relationMatrix=[];
// for(let i=0;i<rows;i++)
// {
//     let row=[];
//     for(let j=0;j<columns;j++)
//     {
//         row.push([]);
//     }
//     relationMatrix.push(row);
// }
function isGraphCyclic(relationMatrix){
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
    for(let i=0;i<rows;i++)
    {
        for(let j=0;j<columns;j++)
        {
        let response=detectCycle(relationMatrix,i,j,visited,dfsVisited);
        if(response === true) return [i,j];
        }
    }
    return null;
}
function detectCycle(relationMatrix,srcRow,srcCol,visited,dfsVisited)
{
    visited[srcRow][srcCol]=true;
    dfsVisited[srcRow][srcCol]=true;

    for(let i=0;i<relationMatrix[srcRow][srcCol].length;i++)
    {
        let [childrenRid,childrenCid]=relationMatrix[srcRow][srcCol][i];
        if(visited[childrenRid][childrenCid] === false)
        {
           let respnse= detectCycle(relationMatrix,childrenRid,childrenCid,visited,dfsVisited);
           if(respnse === true) return true;
        }
        else if(dfsVisited[childrenRid][childrenCid]) return true;
    }
    dfsVisited[srcRow][srcCol]=false;
    return false;


}