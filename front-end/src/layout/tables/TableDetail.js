import React, { useEffect, useState } from "react";

function TableDetail({ table }) {
  const [currentTable, setCurrentTable] = useState({
    ...table,
    "reservation_id": null,
    "occupied": null,
  });

  console.log(currentTable);
  
  useEffect(() => {
    setCurrentTable(table);
  }, [table])

  return (
    <>
      <tr key={currentTable.table_id}>
        <th scope="row"> {currentTable.table_id} </th>
        <td> {currentTable.table_name} </td>
        <td> {currentTable.capacity} </td>
        <td> {currentTable.reservation_id} </td>
        <td data-table-id-status={`${table.table_id}`}> {currentTable.occupied} </td>
      </tr>
    </>
  );
}

export default TableDetail;