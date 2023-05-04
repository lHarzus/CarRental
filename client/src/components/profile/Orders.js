import React, { Fragment, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCars } from "../../actions/cars";
import { addHistory, deleteOrder } from "../../actions/profile";
import spinner from "../../images/loading.gif";

const Orders = ({
  addHistory,
  deleteOrder,
  orders,
  history,
  cars: { cars, loading },
  getCars,
}) => {
  const [orderType, setOrderType] = useState("current");
  useEffect(() => {
    getCars();
    orders.map((order) => {
      if (Date.now() > new Date(order.dropoff.date)) {
        addHistory(order);
        deleteOrder(order._id);
      }
    });
  }, []);
  if (loading) {
    return (
      <div>
        <img src={spinner}></img>
      </div>
    );
  } else {
    return (
      <Fragment>
        <div className="orders-buttons">
          <button className="btn" onClick={() => setOrderType("current")}>
            Current
          </button>
          <button className="btn" onClick={() => setOrderType("history")}>
            History
          </button>
        </div>
        <div>
          {orderType === "current" ? (
            <Fragment>
              {orders.length > 0 ? (
                <Fragment>
                  {orders.map((o, i) => (
                    <div className="order" key={i}>
                      <h3>Car:</h3>
                      <p>
                        <span className="tab"></span>
                        {cars.filter((c) => c._id === o.car).length > 0
                          ? cars.filter((c) => c._id === o.car)[0].brand
                          : "Not Found"}{" "}
                        {cars.filter((c) => c._id === o.car).length > 0
                          ? cars.filter((c) => c._id === o.car)[0].model
                          : "Not Found"}
                      </p>
                      <h3>Pick-Up:</h3>
                      <p>
                        <span className="tab"></span>
                        Location: {o.pickup.place}
                      </p>
                      <p>
                        <span className="tab"></span>
                        Date: {o.pickup.date}
                      </p>
                    </div>
                  ))}
                </Fragment>
              ) : (
                <h3>Orders is empty</h3>
              )}
            </Fragment>
          ) : (
            <Fragment>
              {history.length > 0 ? (
                <Fragment>
                  {history.map((h, i) => (
                    <div className="order" key={i}>
                      <h3>Car:</h3>
                      <p>
                        <span className="tab"></span>
                        {cars.filter((c) => c._id === h.car).length > 0
                          ? cars.filter((c) => c._id === h.car)[0].brand
                          : "Not Found"}{" "}
                        {cars.filter((c) => c._id === h.car).length > 0
                          ? cars.filter((c) => c._id === h.car)[0].model
                          : "Not Found"}
                      </p>
                      <h3>Pick-Up:</h3>
                      <p>
                        <span className="tab"></span>
                        Location: {h.pickup.place}
                      </p>
                      <p>
                        <span className="tab"></span>
                        Date: {h.pickup.date}
                      </p>
                    </div>
                  ))}
                </Fragment>
              ) : (
                <h3>History is empty</h3>
              )}
            </Fragment>
          )}
        </div>
      </Fragment>
    );
  }
};

Orders.propTypes = {
  getCars: PropTypes.func.isRequired,
  cars: PropTypes.object.isRequired,
  addHistory: PropTypes.func.isRequired,
  deleteOrder: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  cars: state.cars,
});

export default connect(mapStateToProps, { getCars, addHistory, deleteOrder })(
  Orders
);
