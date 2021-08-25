import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";




function ReservationDetail({ reservation }) {
  const [currentReservation, setCurrentReservation] = useState(reservation);
  // const history = useHistory();
  const reservation_id = useParams();

  useEffect(() => {
    setCurrentReservation(reservation);
  }, [reservation])
  
  if (currentReservation.status !== "finished") {
    return (
      <>
        <tr>
          <th scope="row"> {currentReservation.reservation_id} </th>
          <td> {currentReservation.first_name} </td>
          <td> {currentReservation.last_name} </td>
          <td> {currentReservation.people} </td>
          <td> {currentReservation.mobile_number} </td>
          {/* <td> {currentReservation.reservation_date} </td> */}
          <td> {currentReservation.reservation_time} </td>
          <td data-reservation-id-status={currentReservation.reservation_id}> {currentReservation.status} </td>
          <td>
            {currentReservation.status === 'booked' ? 
            <a            
              href={`/reservations/${reservation_id}/seat`}>
              <button className="btn btn-primary"> Seat </button>
            </a> 
            :
            <div></div>
            }
          </td>
          <td>
            {currentReservation.status === 'booked' ?
            <a href={`/reservations/${currentReservation.reservation_id}/edit`}>
              <button className="btn btn-primary "> Edit </button>
            </a>
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
