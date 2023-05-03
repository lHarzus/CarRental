import React from "react";

export const Options = ({
  setOption,
  setAddPaymentCard,
  setChangeInfo,
  option,
}) => {
  return (
    <div className="profile-options">
      <button
        onClick={() => {
          setOption("profile");
          setAddPaymentCard(false);
          setChangeInfo(false);
        }}
        className={option === "profile" ? "selected" : ""}
      >
        Profile details
      </button>
      <button
        onClick={() => {
          setOption("payment");
          setAddPaymentCard(false);
          setChangeInfo(false);
        }}
        className={option === "payment" ? "selected" : ""}
      >
        Payments
      </button>
      <button
        onClick={() => {
          setOption("order");
          setAddPaymentCard(false);
          setChangeInfo(false);
        }}
        className={option === "order" ? "selected" : ""}
      >
        Orders
      </button>
    </div>
  );
};
