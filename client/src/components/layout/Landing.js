import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Car from "../rent/Car";
import { connect } from "react-redux";
import { getCars } from "../../actions/cars";
import loader from "../../images/loading.gif";
import { Link } from "react-router-dom";
import { addOrder } from "../../actions/profile";
import { Booking } from "../orders/Booking";

const Landing = ({
  getCars,
  auth: { isAuthenticated },
  cars: { cars, loading },
  addOrder,
}) => {
  useEffect(() => {
    getCars();
  }, []);

  const [index, setIndex] = useState(0);

  const onClick = (side) => {
    if (side === "right") {
      if (index === cars.length - 1) setIndex(0);
      else setIndex(index + 1);
    } else {
      if (index === 0) setIndex(cars.length - 1);
      else setIndex(index - 1);
    }
  };

  return (
    <div className="landing">
      <div className="rent">
        <h1>Vehicle</h1>
        <h3>Reserve Now to get the best offer</h3>
        <div className="cars">
          <i
            className="bi bi-arrow-left-circle-fill left-item"
            onClick={() => onClick("left")}
          ></i>
          <div className="middle-item">
            {loading ? <img src={loader} /> : <Car vehicle={cars[index]} />}
          </div>
          <i
            className="bi bi-arrow-right-circle-fill right-item"
            onClick={() => onClick("right")}
          ></i>
        </div>
      </div>
      <Booking
        isAuthenticated={isAuthenticated}
        addOrder={addOrder}
        cars={cars}
        index={index}
      />
    </div>
  );
};

Landing.propTypes = {
  auth: PropTypes.object.isRequired,
  cars: PropTypes.object.isRequired,
  getCars: PropTypes.func.isRequired,
  addOrder: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  cars: state.cars,
});

export default connect(mapStateToProps, { getCars, addOrder })(Landing);
