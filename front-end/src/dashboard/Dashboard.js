import React, { useEffect, useState } from "react";
import { listReservations } from "../utils/api";
import { previous, next } from "../utils/date-time";
import ErrorAlert from "../layout/ErrorAlert";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ date }) {
  const [reservations, setReservations] = useState([]);
  const [currentDate, setCurrentDate] = useState(date);
  const [reservationsError, setReservationsError] = useState(null);
  console.log(reservations);

  useEffect(loadDashboard, [date]);

  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
    return () => abortController.abort();
  }

  const previousHandler = (event) => {
    event.preventDefault();
    setCurrentDate(previous(currentDate));
  }

  const todayHandler = (event) => {
    event.preventDefault();
    setCurrentDate(date);
  }

  const nextHandler = (event) => {
    event.preventDefault();
    setCurrentDate(next(currentDate));
  }

  // TODO figure out how to get specific day's reservations

  // configuring table for current day
  
  let filtered = reservations.filter((reservation) => reservation.reservation_date === currentDate);
  
  const filteredRows = filtered.map((reservation) => (
    <tr key={reservation.reservation_time}>
      <th scope="row"> {reservation.reservation_id} </th>
      <td> {reservation.first_name} </td>
      <td> {reservation.last_name} </td>
      <td> {reservation.people} </td>
      <td> {reservation.mobile_number} </td>
      <td> {reservation.reservation_date} </td>
      <td> {reservation.reservation_time} </td>
      <td>
          <button className="btn btn-primary "> Edit </button>
      </td>
    </tr>
  ))
  
  

  return (
    <main>
      <h1>Dashboard</h1>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Reservations for date: {currentDate}</h4>
      </div>
      <ErrorAlert error={reservationsError} />
      <div className="row mb-3">
        <div className="">
          <button className="btn btn-primary ml-3" onClick={previousHandler}> Previous Day </button>
        </div>
        <div className="">
          <button className="btn btn-primary ml-3" onClick={todayHandler}> Today </button>
        </div>
        <div className="">
          <button className="btn btn-primary ml-3" onClick={nextHandler}> Next Day </button>
        </div>
        
      </div>
      
      <div>
        <table className="table">
          <thead>
            <tr>
              <th scope="col"> ID </th>
              <th scope="col"> First Name </th>
              <th scope="col"> Last Name </th>
              <th scope="col"> Party Size </th>
              <th scope="col"> Phone Number </th>
              <th scope="col"> Reservation Date </th>
              <th scope="col"> Reservation Time </th>
            </tr>
          </thead>
          <tbody>
            {filteredRows}
          </tbody>
        </table>
      </div>
      {/* {JSON.stringify(reservations)} */}
    </main>
  );
}

export default Dashboard;
