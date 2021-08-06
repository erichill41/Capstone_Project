import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router";
import { listReservations, listTables } from "../../utils/api";
import ErrorAlert from "../ErrorAlert";

function ReservationSeat() {
  const history = useHistory();
  const params = useParams();
  console.log('params', params);

  const [reservationsError, setReservationsError] = useState(null);
  const [reservations, setReservations] = useState([]);
  const [tables, setTables] = useState([]);
  const [tablesError, setTablesError] = useState(null);
  const [currentRes, setCurrentRes] = useState({});

  function loadReservations() {
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations(abortController.signal)
      .then(setReservations)
      .catch(setReservationsError)
  }


  function loadTables() {
    const abortController = new AbortController();
    setTablesError(null);
    listTables(abortController.signal)
      .then(setTables)
      .catch(setTablesError);
  }

  function assignCurrent() {
    const current = reservations.find((res) => res.reservation_id === Number(params.reservation_id));
    setCurrentRes(current);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    setCurrentRes({
      ...currentRes,
       
    })
    history.push('/dashboard')
  }

  useEffect(loadTables, []);
  useEffect(loadReservations, []);
  useEffect(assignCurrent, [reservations, params.reservation_id]);

  console.log(reservations);
  console.log(tables);
  console.log(currentRes);

  return (
    <main> 
      <div className="mb-3">
        <h1> This is the reservation seat form </h1>
      </div>
      <ErrorAlert error={reservationsError} />
      <ErrorAlert error={tablesError} />
      <div className="mb-3">
        <h3> Current Reservation: {params.reservation_id} </h3>
      </div>
      <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col"> ID </th>
                <th scope="col"> First Name </th>
                <th scope="col"> Last Name </th>
                <th scope="col"> Mobile Number </th>
                <th scope="col"> Reservation Time </th>
                <th scope="col"> Party Size </th>
               </tr>
             </thead>
            <tbody>
              <tr key={currentRes.reservation_id}>
                <th scope="row"> {currentRes.reservation_id} </th>
                <td> {currentRes.first_name} </td>
                <td> {currentRes.last_name} </td>
                <td> {currentRes.mobile_number} </td>
                <td> {currentRes.reservation_time} </td>
                <td> {currentRes.people} </td>
              </tr>
            </tbody>
         </table>
      
      <form className="form-group">
        <div className="col mb-3">
          <label className="form-label" htmlFor="table_id"> Select Table </label>
            <select
              className="form-control"
              name="table_id"
              id="table_id"
            >
              <option value=""> Table Name - Capacity </option>
              {tables.map((table) => (
                <option 
                  key={table.table_id}
                  value={JSON.stringify(table)}
                  required={true}
                  >
                    {table.table_name} - {table.capacity}
                  </option>
              ))} 
            </select>
        </div>
        <button 
          className="btn btn-primary ml-3"
          type="submit"
        > 
          Submit
        </button>
      </form>
    </main>
  );
}

export default ReservationSeat;