import React from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const TableEle = ({heading, datacopy}) => {
  console.log(datacopy.length);
  return (
    <TableContainer sx={{margin: 1}} component={Paper}>
    <Table sx={{ minWidth: 650 }} aria-label="simple table">
      <TableHead>
      { datacopy.length > 1 ?  ( <TableRow>
          {
             heading.length > 0 ?  heading.map((column, index) => {
                  return (
                    <TableCell sx={{border: 1,minWidth:70, fontWeight:"bold", background:"gray"}} key={index}>{column}</TableCell>
                    )
               }) : null
          }
        </TableRow>) : <h1>Nothing to show.</h1>}
      </TableHead>
      <TableBody>

        {datacopy.map((rows, index) => (
          <TableRow
            key={rows.name}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
              {/* data is array of object . for each object we have heading.length keys each key represent a value in obj  */}
             {
              heading.map((title,i)=>{
                return  <TableCell  sx={{ border: 1}} key={i}>{rows[title]}</TableCell>
              })
             }
          
          </TableRow>
        ))}
      </TableBody>
    </Table>
    
  </TableContainer>
  )
}

export default TableEle