import React, { Fragment, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCars } from "../../actions/cars";

const Orders = ({ orders, history, cars: { cars }, getCars }) => {
  const [orderType, setOrderType] = useState("current");
  useEffect(() => {
    getCars();
  }, []);
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
                      <span class="tab"></span>
                      {cars.filter((c) => c._id === o.car)[0].brand}{" "}
                      {cars.filter((c) => c._id === o.car)[0].model}
                    </p>
                    <h3>Pick-Up:</h3>
                    <p>
                      <span class="tab"></span>
                      Location: {o.pickup.place}
                    </p>
                    <p>
                      <span class="tab"></span>
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
                      <span class="tab"></span>
                      {cars.filter((h) => h._id === h.car)[0].brand}{" "}
                      {cars.filter((h) => h._id === h.car)[0].model}
                    </p>
                    <h3>Pick-Up:</h3>
                    <p>
                      <span class="tab"></span>
                      Location: {h.pickup.place}
                    </p>
                    <p>
                      <span class="tab"></span>
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
};

Orders.propTypes = {
  getCars: PropTypes.func.isRequired,
  cars: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  cars: state.cars,
});

export default connect(mapStateToProps, { getCars })(Orders);
