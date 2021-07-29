import React, { useState } from "react";
import { useHistory } from "react-router";
import ErrorAlert from "../layout/ErrorAlert";

function ReservationCreate() {

  const [error, setError] = useState(null);

  const [reservation, setReservation] = useState({
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: "",
    reservation_time: "",
    people: "1",
  })

  // TODO Create Change Handler
  // TODO Create Submit Handler

  return (
    <main>
      <h1> Create a Reservation </h1>
      <ErrorAlert error={error} />
      <form>
        <div className="row mb-3">
          <div className="col-4 form-group">
            <label className="form-label" htmlFor="first_name">
              First Name
            </label>
            <input
              className="form-control"
              id="first_name"
              name="first_name"
              type="text"
              required="true"
              value={reservation.first_name}
            />
            <small className="form-text text-muted"> Enter First Name </small>
          </div>
          <div className="col-4">
            <label className="form-label" htmlFor="last_name">
              Last Name
            </label>
            <input
              className="form-control"
              id="last_name"
              name="last_name"
              type="text"
              required="true"
              value={reservation.last_name}
            />
            <small className="form-text text-muted"> Enter Last Name </small>
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-4 form-group">
            <label className="form-label" htmlFor="mobile_number">
              Mobile Number
            </label>
            <input
              className="form-control"
              id="mobile_number"
              name="mobile_number"
              type="text"
              required="true"
              placeholder="(xxx) xxx-xxxx"
              value={reservation.mobile_number}
            />
            <small className="form-text text-muted"> Enter Mobile Number </small>
          </div>
          <div className="col-4 form-group">
            <label className="form-label" htmlFor="mobile_number">
              Party Size
            </label>
            <select 
              className="form-control"
              id="people"
              name="people"
              required={true}
            >
              <option> 1 </option>
              <option> 2 </option>
              <option> 3 </option>
              <option> 4 </option>
              <option> 5 </option>
              <option> 6 </option>
              <option> 7 </option>
              <option> 8 </option>
              <option> 9 </option>
              <option> 10+ </option>

            </select>
            <small className="form-text text-muted"> Select Party Size </small>
          </div>
        </div>
      </form>
    </main>
  );
}

export default ReservationCreate;