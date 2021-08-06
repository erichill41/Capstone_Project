import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";


function ReservationDetail({ reservation }) {
  const [currentReservation, setCurrentReservation] = useState(reservation);

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
        <td>
          <Link 
            to={`/reservations/${currentReservation.reservation_id}/seat`}
            href={`/reservations/${currentReservation.reservation_id}/seat`}
          >
            <button className="btn btn-primary "> Seat </button>
          </Link>
        </td>
        <td>
          <button className="btn btn-primary "> Edit </button>
        </td>
      </tr>
    </>
  );
}

export default ReservationDetail;
