import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Car from "../rent/Car";
import { connect } from "react-redux";
import { getCars } from "../../actions/cars";
import loader from "../../images/loading.gif";
import idk from "../../images/idk.png";

const Landing = ({
  getCars,
  auth: { isAuthenticated },
  cars: { cars, loading },
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
      <img src={idk} className="idk"></img>
      <div className="rent-or-login">
        {isAuthenticated ? (
          <div>
            <h2>BOOK A CAR TODAY!</h2>
            <div className="pick-up">
              <div className="input">
                <span>
                  <i class="bi bi-geo-alt"></i>PICK-UP
                </span>
                <select id="place" name="pick" className="select">
                  <option value="volvo">Braga</option>
                  <option value="saab">Porto</option>
                  <option value="fiat">Coimbra</option>
                  <option value="audi">Leiria</option>
                </select>
              </div>
              <div className="input">
                <span>
                  <i class="bi bi-stopwatch"></i> PICK-UP
                </span>
                <input
                  type="time"
                  id="appt"
                  name="appt"
                  min="09:00"
                  max="18:00"
                  required
                ></input>
              </div>
            </div>
            <div className="pick-up">
              <div className="input">
                <span>
                  <i class="bi bi-geo-alt"></i> DROP-OFF
                </span>
                <select id="place" name="drop" className="select">
                  <option value="volvo">Braga</option>
                  <option value="saab">Porto</option>
                  <option value="fiat">Coimbra</option>
                  <option value="audi">Leiria</option>
                </select>
              </div>
              <div className="input">
                <span>
                  <i class="bi bi-stopwatch"></i> PICK-UP
                </span>
                <input
                  type="time"
                  id="appt"
                  name="appt"
                  min="09:00"
                  max="18:00"
                  required
                ></input>
              </div>
            </div>
          </div>
        ) : (
          <div>nao</div>
        )}
      </div>
    </div>
  );
};

Landing.propTypes = {
  auth: PropTypes.object.isRequired,
  cars: PropTypes.object.isRequired,
  getCars: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  cars: state.cars,
});

export default connect(mapStateToProps, { getCars })(Landing);
