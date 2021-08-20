import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { getReservation } from "../../utils/api";
import ErrorAlert from "../ErrorAlert";

function ReservationEdit() {
  const { reservation_id } = useParams();
  const [currentReservation, setCurrentReservation] = useState({});
  const [error, setError] = useState(null);
  const history = useHistory();
  
  useEffect(() => {
    getReservation(reservation_id)
    .then((response) => {
      setCurrentReservation(response)
    })
    .catch(setError);
  }, [history, reservation_id]);

  console.log(currentReservation);
  
  const handleChange = ({ target }) => {
    setCurrentReservation({
      ...currentReservation,
      [target.name]: target.value,
    })
  }
  
  const handleSubmit = (event) => {
    event.preventDefault();
    
  }

  return (
    <>
      <h1> Edit Reservation </h1>
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
              placeholder={currentReservation.first_name}
            />
            <small className="form-text text-muted"> Enter First Name </small>
          </div> 
        </div>
        <button type="button" className="btn btn-secondary mr-2" onClick={() => history.goBack()}> Cancel </button>
        <button type="submit" className="btn btn-primary"> Submit Edit </button>
      </form>
    </>
  )
}

export default ReservationEdit;