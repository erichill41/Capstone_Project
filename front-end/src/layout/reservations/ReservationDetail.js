import React, { useEffect, useState } from "react";
// import { seatReservation } from "../../utils/api";
// import { useHistory } from "react-router-dom";



function ReservationDetail({ reservation }) {
  const [currentReservation, setCurrentReservation] = useState(reservation);
  // const history = useHistory();

  useEffect(() => {
    setCurrentReservation(reservation);
  }, [reservation])
  
  // const editHandler = (event) => {

  // }
  
  if (currentReservation.status !== "finished") {
    return (
      <>
        <tr>
          <th scope="row"> {currentReservation.reservation_id} </th>
          <td> {currentReservation.first_name} </td>
          <td> {currentReservation.last_name} </td>
          <td> {currentReservation.people} </td>
          <td> {currentReservation.mobile_number} </td>
          <td> {currentReservation.reservation_date} </td>
          <td> {currentReservation.reservation_time} </td>
          <td data-reservation-id-status={reservation.reservation_id}> {currentReservation.status} </td>
          <td>
            {currentReservation.status === 'booked' ? 
            <a            
              href={`/reservations/${currentReservation.reservation_id}/seat`}>
              <button className="btn btn-primary"> Seat </button>
            </a> 
            :
            <div></div>
            }
          </td>
          <td>
            {currentReservation.status === 'booked' ?
              <button className="btn btn-primary "> TODO Edit </button>
            :
            <></>
            }
          </td>
        </tr>
      </>
    );
  } else {
    return <></>
  }
  
}

export default ReservationDetail;
