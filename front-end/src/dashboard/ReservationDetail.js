import React, { useState } from "react";
// import { useHistory } from "react-router-dom";


function ReservationDetail({ reservation }) {
  const [currentReservation, setCurrentReservation] = useState(reservation);
  console.log(currentReservation);
  
  // const history = useHistory();
  
  
  
  return (
    <div className="">
      <tr key={currentReservation.reservation_id}>
        <th scope="row"> {reservation.reservation_id} </th>
        <td> {currentReservation.first_name} </td>
        <td> {currentReservation.last_name} </td>
        <td> {currentReservation.people} </td>
        <td> {currentReservation.mobile_number} </td>
        <td> {currentReservation.reservation_date} </td>
        <td> {currentReservation.reservation_time} </td>
        <td>
          <button className="btn btn-primary "> Edit </button>
        </td>
      </tr>
    </div>
  );
}

export default ReservationDetail;
