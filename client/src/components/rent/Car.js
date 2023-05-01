import React, { Fragment } from "react";
import PropTypes from "prop-types";

const Car = (vehicle) => {
  const { vehicle: car } = vehicle;
  return (
    <Fragment>
      <div className="grid-3x1">
        <div className="car-header">
          <h2>
            {car.brand} {car.model}
          </h2>
          <h3>{car.category}</h3>
          <p>{car.price} € / Hour</p>
        </div>
        <div className="car-foto">
          <img src={car.photo} className="car-photo"></img>
        </div>
        <div className="car-stats">
          <table className="table">
            <tr>
              <th>Fuel:</th>
              <td>{car.fuel}</td>
            </tr>
            <tr>
              <th>Top Speed:</th>
              <td>{car.topSpeed} Km/h</td>
            </tr>
            <tr>
              <th> Consumption:</th>
              <td>{car.consumption} l/100km</td>
            </tr>
            <tr>
              <th>Capacity:</th>
              <td>{car.capacity}</td>
            </tr>
            <tr>
              <th>HP:</th>
              <td>{car.hp}</td>
            </tr>
            <tr>
              <th>Year:</th>
              <td>{car.year}</td>
            </tr>
          </table>
        </div>
      </div>
    </Fragment>
  );
};

Car.propTypes = {};

export default Car;
