import React, { useState } from "react";
import Table from "@mui/material/Table";
import Papa from "papaparse";

import style from "./styles.module.css";
import TableEle from "./TableEle";
import { CSVLink } from "react-csv";
import UpdateTableElement from "./updateTableElement";

const allowedExtensions = ["csv"];

export default function Home() {
  const [data, setData] = useState([]);
  const [heading, setheading] = useState([]);
  const [error, setError] = useState("");
  const [file, setFile] = useState("");
  const [query, setquery] = useState("");
  const [datacopy, setdatacopy] = useState([]);
  const [update, setupdate] = useState(false);
 

  const handleFileChange = (e) => {
    setError("");

    // Check if user has entered the file
    if (e.target.files.length) {
      const inputFile = e.target.files[0];

      // Check the file extensions, if it not
      // included in the allowed extensions
      // we show the error
      const fileExtension = inputFile?.type.split("/")[1];
      if (!allowedExtensions.includes(fileExtension)) {
        setError("Please input a csv file");
        return;
      }

      // If input type is correct set the state
      setFile(inputFile);
    }
  };
  const handleParse = async () => {
    if (!file) return setError("Enter a valid file");
    const reader = new FileReader();

    reader.onload = async ({ target }) => {
      const csv = await Papa.parse(target.result, { header: true });
      const parsedData = await csv?.data;
      setData(csv?.data);
      setdatacopy(csv?.data);

      console.log(data);
      const columns = await Object.keys(parsedData[0]);
      setheading(columns);
    };
    reader.readAsText(file);
  };

  function filterdataHandler() {
    // console.log(query);

    if (query.length < 3) {
      window.alert("minimum length of seraching is 3");
    } else {
      var tempdata = data.map((row, index) => {
        return row["Alt.Part#"]?.search(query) != -1
          ? row
          : row["Part #"]?.search(query) != -1
          ? row
          : null;
      });

      tempdata = tempdata.filter((row) => {
        return row != null;
      });
      console.log(tempdata);
      setdatacopy(tempdata);
    }
  }

  function updateInventoryHandler() {
    setupdate(!update);
    console.log(update);
  }

  return (
    <>
      <div style={{textAlign:"center"}}>
        <h1 style={{textAlign:"center", background:"lightgray"}}>CSV Data Table</h1>
        <label htmlFor="csvInput" style={{  }}>
           Pick a CSV File : &nbsp;&nbsp;
        </label>
        <input
          onChange={handleFileChange}
          id="csvInput"
          name="file"
          type="File"
        />
        <button style={{ background:"white", margin: "10px", color:"blue", padding:"5px 10px" }} onClick={handleParse}>Import CSV / show data</button>
        <CSVLink data={datacopy} filename="table.csv">
      <button style={{ background:"blue", color:"white", padding:"5px 10px" }} >Export CSV / download CSV</button>
    </CSVLink>
        <div>
          
          {/* <button onClick={console.log(data)}>Print data</button> */}
        </div>
        <div className={style.flexgrp}>
          <label htmlFor="query">User Input  :  &nbsp; &nbsp;</label>
          <input
            type="text"
            onChange={(e) => console.log(setquery(e.target.value))}
            name="query"
            placeholder=""
          />
          <button  style={{ background:"white", margin: "10px", color:"blue", padding:"5px 10px" }} onClick={filterdataHandler}> Filter </button>
          <button  style={{ background:"blue", color:"white", padding:"5px 10px" }} onClick={updateInventoryHandler}>Update Inventory</button>
        </div>
      </div>

 

    {
        (update ?    <div>
        <h1 style={{textAlign:"center" , background:"lightgray"}}>update inventory</h1>
        <UpdateTableElement heading={heading} setdatacopy = {setdatacopy} datacopy={datacopy} updateState = {update} setupdateState = {setupdate}/>
        <div>
        
        </div>
      </div> :       
    <TableEle heading={heading} datacopy={datacopy} />
      )
    }
    </>
  );
}
