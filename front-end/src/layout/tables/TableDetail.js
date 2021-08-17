import React, { useEffect, useState } from "react";
import { deleteTableReservation } from "../../utils/api";
import { useHistory } from "react-router-dom";
import ErrorAlert from "../ErrorAlert";

function TableDetail({ table, reservations }) {
  const [currentTable, setCurrentTable] = useState(table);
  const [tableStatus, setTableStatus] = useState("free");
  const history = useHistory();
  const [error, setError] = useState(null);

  // useEffect for table status: free or occupied
  
  useEffect(() => {
    if (currentTable.reservation_id) {
      setTableStatus(`occupied`)
    } else {
      setTableStatus("free")
    }
  }, [currentTable])

  const handleClear = (event) => {
    event.preventDefault();
    setError(null);
    if (window.confirm("Is this table ready to seat new guests? This cannot be undone.")) {
      deleteTableReservation(currentTable.table_id, currentTable.reservation_id)
      .then((response) => {
        setCurrentTable(response[0])
        history.push('/tables')
        setTableStatus("free");
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
        <td data-table-id-status={`${currentTable.table_id}`}> {tableStatus} </td>
        <td data-table-id-finish={currentTable.table_id}>
          {tableStatus.includes('occupied') ?
          <button className="btn btn-danger" onClick={handleClear}> Finish </button>
          : 
          <div></div>
          }
        </td>
      </tr>
    </>
  );
}

export default TableDetail;