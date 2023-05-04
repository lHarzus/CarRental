import React, { Fragment, useState } from "react";
import idk from "../../images/idk.png";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export const Booking = ({ isAuthenticated, addOrder, cars, index }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    pickPlace: "Braga",
    pickTime: "",
    dropPlace: "Braga",
    dropTime: "",
  });

  const { pickPlace, pickTime, dropPlace, dropTime } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    const date1 = new Date();
    const date2 = new Date();
    date1.setHours(Number(pickTime.slice(0, 2)), Number(pickTime.slice(3, 5)));
    date2.setHours(Number(dropTime.slice(0, 2)), Number(dropTime.slice(3, 5)));
    if (date1 > Date.now() && date2 > date1) {
      addOrder({
        car: cars[index],
        pickup: {
          place: pickPlace,
          date: date1,
        },
        dropoff: {
          place: dropPlace,
          date: date2,
        },
      });
      setFormData({
        pickPlace: "Braga",
        pickTime: "",
        dropPlace: "Braga",
        dropTime: "",
      });
      navigate("/profile");
    }
  };

  return (
    <Fragment>
      <div className="idk-image">
        <img src={idk} className="idk"></img>
      </div>
      <div className="rent-or-login">
        {isAuthenticated ? (
          <form onSubmit={(e) => onSubmit(e)}>
            <h2>BOOK A CAR TODAY!</h2>
            <div className="pick-up">
              <div className="input">
                <span>
                  <i className="bi bi-geo-alt"></i>PICK-UP
                </span>
                <select
                  id="place"
                  name="pickPlace"
                  value={pickPlace}
                  className="select"
                  onChange={(e) => onChange(e)}
                >
                  <option>Braga</option>
                  <option>Porto</option>
                  <option>Coimbra</option>
                  <option>Leiria</option>
                </select>
              </div>
              <div className="input">
                <span>
                  <i className="bi bi-stopwatch"></i> PICK-UP
                </span>
                <input
                  type="time"
                  id="appt"
                  name="pickTime"
                  value={pickTime}
                  min="09:00"
                  max="18:00"
                  onChange={(e) => onChange(e)}
                  required
                ></input>
              </div>
            </div>
            <div className="pick-up">
              <div className="input">
                <span>
                  <i className="bi bi-geo-alt"></i> DROP-OFF
                </span>
                <select
                  id="place"
                  name="dropPlace"
                  value={dropPlace}
                  className="select"
                  onChange={(e) => onChange(e)}
                >
                  <option>Braga</option>
                  <option>Porto</option>
                  <option>Coimbra</option>
                  <option>Leiria</option>
                </select>
              </div>
              <div className="input">
                <span>
                  <i className="bi bi-stopwatch"></i> PICK-UP
                </span>
                <input
                  type="time"
                  id="appt"
                  name="dropTime"
                  value={dropTime}
                  min="09:00"
                  max="18:00"
                  required
                  onChange={(e) => onChange(e)}
                ></input>
              </div>
            </div>
            <input type="submit" value="Book it" className="btn2"></input>
          </form>
        ) : (
          <div className="rent-a-car">
            <h2>Log in now to rent it</h2>
            <div className="rent-buttons">
              <Link to="/login" className="btn2">
                Login
              </Link>
              <Link to="/register" className="btn2">
                Register
              </Link>
            </div>
          </div>
        )}
      </div>
    </Fragment>
  );
};
