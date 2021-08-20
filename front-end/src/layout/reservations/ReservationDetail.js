import React, { useEffect, useState } from "react";
// import { useHistory } from "react-router-dom";



function ReservationDetail({ reservation }) {
  const [currentReservation, setCurrentReservation] = useState(reservation);
  // const history = useHistory();

  useEffect(() => {
    setCurrentReservation(reservation);
  }, [reservation])

  const handleCancel = (event) => {
    event.preventDefault();
    // window confirm
    // set reservation status to cancelled
    // PUT to reservation status
  }
  
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
              href={`/reservations/${currentReservation.reservation_id}/seat`}>
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
          </td><td>
            {currentReservation.status === 'booked' ?
            <button
              className="btn btn-primary"
              data-reservation-id-cancel={currentReservation.reservation_id}
              onClick={handleCancel}
            > Cancel </button>
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
