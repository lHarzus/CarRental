import React, { Fragment, useState } from "react";

export const Orders = ({ orders, history }) => {
  const [orderType, setOrderType] = useState("current");

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
                {orders.map((h, i) => (
                  <div className="orders" key={i}>
                    <p>ola</p>
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
                  <div className="history" key={i}>
                    <p>ola</p>
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
