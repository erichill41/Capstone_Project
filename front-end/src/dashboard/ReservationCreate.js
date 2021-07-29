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
            />
            <small className="form-text text-muted"> Enter Last Name </small>
          </div>
        </div>
      </form>
    </main>
  );
}

export default ReservationCreate;