import React, { useState } from "react";
import { deleteTableReservation, listTables, updateResStatus } from "../../utils/api";
import { useHistory } from "react-router-dom";
import ErrorAlert from "../ErrorAlert";

function TableDetail({ table }) {
  const [currentTable, setCurrentTable] = useState(table);
  const history = useHistory();
  const [error, setError] = useState(null);

  console.log(currentTable);

  const handleClear = (event) => {
    event.preventDefault();
    setError(null);
    if (window.confirm("Is this table ready to seat new guests? This cannot be undone.")) {
      updateResStatus({status: "finished"}, currentTable.reservation_id)
        .then(() => deleteTableReservation(currentTable.table_id))
        .then(() => {
          setCurrentTable({
            ...table,
            reservation_id: null,
            table_status: "free",
          })
          listTables()
          history.go(0)
        })
        
        .catch(setError)
      
    }
  }

  return (
    <>
    <ErrorAlert error={error} />
      <tr>
        <th scope="row"> {currentTable.table_id} </th>
        <td> {currentTable.table_name} </td>
        <td> {currentTable.capacity} </td>
        <td> {currentTable.reservation_id} </td>
        <td data-table-id-status={`${table.table_id}`}> {currentTable.table_status} </td>
        <td data-table-id-finish={`${table.table_id}`}>
          {currentTable.reservation_id ?
          <button className="btn btn-danger" onClick={handleClear}> Finish </button>
          : 
          <></>
          }
        </td>
      </tr>
    </>
  );
}

export default TableDetail;