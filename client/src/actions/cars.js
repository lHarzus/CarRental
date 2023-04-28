import axios from "axios";
import { setAlert } from "./alert";

import { GET_CARS, ADD_CAR, REMOVE_CAR, CARS_ERROR } from "./types";

//Get all cars
export const getCars = () => async dispatch => {
  try {
    const res = await axios.get("/api/cars");

    dispatch({
      type: GET_CARS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: CARS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Add car
export const createCar = (formData, history) => async dispatch => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.post("/api/cars", formData, config);

    dispatch({
      type: ADD_CAR,
      payload: res.data,
    });
  } catch (err) {
    const erros = err.response.data.erros;

    if (erros) {
      erros.forEach(error => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: CARS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Delete car
export const deletepPost = id => async dispatch => {
  try {
    const res = await axios.delete(`/api/cars/delete/${id}`);
    dispatch({
      type: REMOVE_CAR,
      payload: id,
    });
    dispatch(setAlert("Car Removed", "sucess"));
  } catch (err) {
    dispatch({
      type: CARS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
