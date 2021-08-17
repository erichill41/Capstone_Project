import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router";
import { listReservations, listTables, updateSeat } from "../../utils/api";
import ErrorAlert from "../ErrorAlert";

function ReservationSeat() {
  const history = useHistory();
  const {reservation_id} = useParams();

  const [reservationsError, setReservationsError] = useState(null);
  const [reservations, setReservations] = useState([]);

  const [tables, setTables] = useState([]);
  const [tablesError, setTablesError] = useState(null);
  
  const [tableFormData, setTableFormData] = useState({});
  const [seatError, setSeatError] = useState(null);

  function loadReservations() {
    const abortController = new AbortController();
    setReservationsError(null);
    return listReservations(abortController.signal)
      .then(setReservations)
      .catch(setReservationsError)
  }

  function loadTables() {
    const abortController = new AbortController();
    setTablesError(null);
    return listTables(abortController.signal)
      .then(setTables)
      .catch(setTablesError);
  }

  useEffect(loadTables, []);
  useEffect(loadReservations, []);
  
  console.log(reservations);
  

  const handleSubmit = (event) => {
    event.preventDefault();
    const tableObj = JSON.parse(tableFormData);
    updateSeat(tableObj.table_id, reservation_id)
    .then((response) => {
      const newTables = tables.map((table) => {
        return table.table_id === response.table_id ? response : table
      })
      setTables(newTables);
      history.push('/dashboard')
    })
    .catch(setSeatError);
    }

  if (tables) {
    return (
      <main> 
        <div className="mb-3">
          <h1> Seat The Current Reservation </h1>
        </div>
        <ErrorAlert error={reservationsError} />
        <ErrorAlert error={tablesError} />
        <ErrorAlert error={seatError} />
        <div className="mb-3">
          <h3> Current Reservation: {reservation_id} </h3>
        </div>
        
        <form className="form-group" onSubmit={handleSubmit}>
          <div className="col mb-3">
            <label className="form-label" htmlFor="table_id"> Select Table </label>
              <select
                className="form-control"
                name="table_id"
                id="table_id"
                onChange={(event) => setTableFormData(event.target.value)}
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
          <button type="button" onClick={() => history.goBack()} className="btn btn-secondary mr-2"> Cancel </button>
          <button className="btn btn-primary" type="submit"> Submit </button>
        </form>
      </main>
    );
  } else {
    return (
      <div>
        <h1> No open tables to seat </h1>
      </div>
    )
  }
  
}

export default ReservationSeat;