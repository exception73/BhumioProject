import React from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const UpdateTableElement = ({heading, datacopy, setdatacopy, updateState, setupdateState}) => {
    var tempData = JSON.parse(JSON.stringify(datacopy))
    const updateStockBHandler = (index, event) => {
      tempData[index]["LOC B STOCK "] = event.target.value;
    }
    const updateStockAHandler = (index, event) => {
      tempData[index]["LOCATION A STOCK"] = event.target.value;
    }

    const handleSave = () =>{
      setdatacopy(tempData);
      setupdateState(!updateState);
      
    }

    const cancelHandle = () => {
      setupdateState(!updateState);
    }



  return (

    <TableContainer sx={{margin: 1}} component={Paper}>
          
    <Table sx={{ minWidth: 650 }} aria-label="simple table">
      <TableHead>
      
       {datacopy.length > 1 ? (
         <TableRow>
        <TableCell sx={{border: 1,minWidth:70}}> "Part"   </TableCell>
        <TableCell sx={{border: 1,minWidth:70}}> "Alt_part"   </TableCell>
        <TableCell sx={{border: 1,minWidth:70}}> "Model"   </TableCell>
        <TableCell sx={{border: 1,minWidth:70}}> "LocA_stock"   </TableCell>
        <TableCell sx={{border: 1,minWidth:70}}> "LocB_stock"   </TableCell>
        </TableRow> ) :  null}
      
      </TableHead>
      <TableBody>

        {datacopy.map((rows, index) => (
          <TableRow
            key={rows.name}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
              {/* data is array of object . for each object we have heading.length keys each key represent a value in obj  */}
             {/* {
              heading.map((title,i)=>{
                return  <TableCell  sx={{border: 1}} key={i}>{rows[title]}</TableCell>
              })
             } */}
             <TableCell>{rows["Part #"]}</TableCell>
             <TableCell>{rows["Alt.Part#"]}</TableCell>
             <TableCell>{rows["Model"]}</TableCell>
             <TableCell><input type="number" placeholder={rows["LOCATION A STOCK"]} onChange={(e) => {updateStockAHandler(index, e)}} /></TableCell>
             <TableCell><input type="number" placeholder={rows["LOC B STOCK "]} onChange={(e) => {updateStockBHandler(index, e)}} /></TableCell>
          
          </TableRow>
        ))}
      </TableBody>

     <div style={{textAlign:"center"}}>
     <button onClick={handleSave} style={{background:"aqua", margin:"10px", padding: "10px", border:"none"}}>Save</button>
      <button onClick={cancelHandle} style={{background:"aqua", padding: "10px", border:"none"}}>Cancel</button>
     </div>
    </Table>
    
  </TableContainer>
  )
}

export default UpdateTableElement