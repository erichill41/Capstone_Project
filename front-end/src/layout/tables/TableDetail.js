import React, { useEffect, useState } from "react";
// import { useHistory } from "react-router-dom";

function TableDetail({ table, reservations }) {
  const [currentTable, setCurrentTable] = useState(table);
  const [currentReservation, setCurrentReservation] = useState({});
  const [tableStatus, setTableStatus] = useState("Open");

  // console.log(currentTable);
  console.log(currentReservation);
  
  useEffect(() => {
    if (currentTable.reservation_id) {
      setCurrentTable(table)
      setTableStatus(`Occupied`)
      setCurrentReservation(reservations.find((res) => res.reservation_id === currentTable.reservation_id));
    } else {
      setTableStatus("Open")
    }
  }, [table, reservations, currentTable.reservation_id])

  // const handleClear = (event) => {
  //   event.preventdefault();

  // }

  return (
    <>
      <tr>
        <th scope="row"> {currentTable.table_id} </th>
        <td> {currentTable.table_name} </td>
        <td> {currentTable.capacity} </td>
        <td> {currentTable.reservation_id} </td>
        <td data-table-id-status={`${table.table_id}`}> {tableStatus} </td>
        <td data-table-id-finsh={table.table_id}>
          {tableStatus.includes('Occupied') ?
          <button className="btn btn-danger"> Clear Table </button>
          : 
          <button className="btn btn-secondary"> Test Conditional </button>
          }
        </td>
      </tr>
    </>
  );
}

export default TableDetail;