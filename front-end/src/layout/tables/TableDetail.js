import React, { useEffect, useState } from "react";
import { deleteTableReservation, finishReservation } from "../../utils/api";
import { useHistory } from "react-router-dom";
import ErrorAlert from "../ErrorAlert";

function TableDetail({ table, reservations }) {
  const [currentTable, setCurrentTable] = useState(table);
  const [tableStatus, setTableStatus] = useState("free");
  const history = useHistory();
  const [error, setError] = useState(null);

  // useEffect for table status: free or occupied
  
  useEffect(() => {
    if (currentTable.reservation_id !== null) {
      setTableStatus(`occupied`)
    } else {
      setTableStatus("free")
    }
  }, [currentTable, reservations])

  const handleClear = (event) => {
    event.preventDefault();
    setError(null);
    if (window.confirm("Is this table ready to seat new guests? This cannot be undone.")) {
      finishReservation(currentTable.reservation_id)
      deleteTableReservation(currentTable.table_id)
      .then((response) => {
        console.log(response)
        setCurrentTable(response[0])
        setTableStatus("free")
      })
      .then(() => history.push('/tables'))
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
        <td data-table-id-status={`${currentTable.table_id}`}> {tableStatus} </td>
        <td data-table-id-finish={currentTable.table_id}>
          {tableStatus.includes('occupied') ?
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