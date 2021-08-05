import React, { useState } from "react";
import { useHistory } from "react-router";
import { createReservation } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";

function ReservationCreate() {

  const history = useHistory();
  const [error, setError] = useState(null);

  const [reservation, setReservation] = useState({
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: "",
    reservation_time: "",
    people: 1,
  })

  // TODO Create Change Handler √
  const handleChange = ({ target }) => {
    setReservation({
      ...reservation,
      [target.name]: target.value,
    })
  }

  // TODO Create Submit Handler √
  async function handleSubmit(event) {
    event.preventDefault();
    createReservation(reservation)
      .then(() => {
        history.push(`/dashboard?date=${reservation.reservation_date}`);
      })
      .catch(setError);
  }

  return (
    <main>
      <h1> Create A Reservation </h1>
      <ErrorAlert error={error} />
      <form onSubmit={handleSubmit} className="form-group">
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
              onChange={handleChange}
              required={true}
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
              onChange={handleChange}
              required={true}
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
              type="tel"
              pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
              // minLength="9"
              // maxLength="10"
              onChange={handleChange}
              required={true}
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
              onChange={handleChange}
              required={true}
              value={reservation.people}
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
        <div className="row mb-3">
          <div className="col-4 form-group"> 
          <label>
            Reservation Date
          </label>
          <input
            className="form-control"
            id="reservation_date"
            name="reservation_date"
            type="date"
            onChange={handleChange}
            required={true}
            value={reservation.reservation_date}
          />
          <small className="form-text text-muted"> Enter Reservation Date </small>
          </div>
          <div className="col-4 form-group"> 
          <label>
            Reservation Time
          </label>
          <input
            className="form-control"
            id="reservation_time"
            name="reservation_time"
            type="time"
            onChange={handleChange}
            required={true}
            value={reservation.reservation_time}
          />
          <small className="form-text text-muted"> Enter Reservation Time </small>
          </div>
        </div>
        <button type="button" onClick={() => history.goBack()} className="btn btn-secondary mr-2"> Cancel </button>
        <button type="submit" className="btn btn-primary"> Submit Reservation </button>
      </form>
    </main>
  );
}

export default ReservationCreate;