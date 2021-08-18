import React, { useState } from "react";
import { deleteTableReservation, updateResStatus } from "../../utils/api";
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
      deleteTableReservation(currentTable.table_id)
      .then((response) => {
        console.log(response.result)
        setCurrentTable(response.result)
        history.push('/tables');
      })
      .catch(setError);
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
        <td data-table-id-status={`${currentTable.table_id}`}> {currentTable.table_status} </td>
        <td data-table-id-finish={`${currentTable.table_id}`}>
          {currentTable.table_status === "occupied" ?
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