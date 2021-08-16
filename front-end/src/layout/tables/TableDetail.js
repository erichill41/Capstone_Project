import React, { useEffect, useState } from "react";
import { deleteTableReservation } from "../../utils/api";
import { useHistory } from "react-router-dom";

function TableDetail({ table, reservations }) {
  const [currentTable, setCurrentTable] = useState(table);
  const [currentReservation, setCurrentReservation] = useState({});
  const [tableStatus, setTableStatus] = useState("free");
  const history = useHistory();

  console.log(currentReservation);
  
  useEffect(() => {
    if (currentTable.reservation_id) {
      setCurrentTable(table)
      setTableStatus(`occupied`)
      setCurrentReservation(reservations.find((res) => res.reservation_id === currentTable.reservation_id));
    } else {
      setTableStatus("free")
    }
  }, [table, reservations, currentTable.reservation_id])

  async function handleClear(event) {
    event.preventDefault();
    if (window.confirm("Is this table ready to seat new guests? This cannot be undone.")) {
      const newTable = await deleteTableReservation(currentTable.table_id, currentTable.reservation_id)
      setCurrentTable(newTable[0])
      setTableStatus("free")
      history.push('/tables');
    }
  }

  return (
    <>
      <tr>
        <th scope="row"> {currentTable.table_id} </th>
        <td> {currentTable.table_name} </td>
        <td> {currentTable.capacity} </td>
        <td> {currentTable.reservation_id} </td>
        <td data-table-id-status={`${table.table_id}`}> {tableStatus} </td>
        <td data-table-id-finish={table.table_id}>
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