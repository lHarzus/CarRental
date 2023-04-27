import { GET_CARS, ADD_CAR, REMOVE_CAR, CARS_ERROR } from "../actions/types";

const initialState = {
  cars: [],
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_CARS:
      return {
        ...state,
        cars: payload,
        loading: false,
      };
    case ADD_CAR:
      return {
        ...state,
        cars: [payload, ...state.cars],
        loading: false,
      };
    case REMOVE_CAR:
      return {
        ...state,
        posts: state.cars.filter(car => car._id !== payload),
        loading: false,
      };
    case CARS_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
}
