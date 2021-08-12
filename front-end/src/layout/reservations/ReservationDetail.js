import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";



function ReservationDetail({ reservation }) {
  const [currentReservation, setCurrentReservation] = useState(reservation);
  // const { reservation_id } = useParams();

  useEffect(() => {
    setCurrentReservation(reservation);
  }, [reservation])
  
  // const history = useHistory();
  
  // const editHandler = (event) => {

  // }
  
  
  return (
    <>
      <tr key={currentReservation.reservation_id}>
        <th scope="row"> {currentReservation.reservation_id} </th>
        <td> {currentReservation.first_name} </td>
        <td> {currentReservation.last_name} </td>
        <td> {currentReservation.people} </td>
        <td> {currentReservation.mobile_number} </td>
        <td> {currentReservation.reservation_date} </td>
        <td> {currentReservation.reservation_time} </td>
        <td> {currentReservation.status} </td>
        <td>
          <a            
            href={`/reservations/${currentReservation.reservation_id}/seat`}>
            <button className="btn btn-primary "> Seat </button>
          </a>
        </td>
        <td>
          <button className="btn btn-primary "> Edit </button>
        </td>
      </tr>
    </>
  );
}

export default ReservationDetail;
