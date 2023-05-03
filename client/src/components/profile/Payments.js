import React, { Fragment, useState } from "react";

export const Payments = ({
  addPaymentCard,
  profile,
  setAddPaymentCard,
  deletePayment,
  addPayment,
}) => {
  const [formData2, setFormData2] = useState({
    number: "",
    code: "",
    nome: "",
  });

  const { nome, code, number } = formData2;

  const onChange2 = (e) =>
    setFormData2({ ...formData2, [e.target.name]: e.target.value });

  const onSubmit2 = (e) => {
    e.preventDefault();
    addPayment({ number, code, name: nome });
    setFormData2({ number: "", code: "", nome: "" });
    setAddPaymentCard(false);
  };

  return (
    <Fragment>
      {!addPaymentCard ? (
        <Fragment>
          <h3>
            {profile.payment.length === 0
              ? "No Payment Methods"
              : "Payment options"}
          </h3>
          {profile.payment.map((p, i) => (
            <div key={i} className="payment">
              <div>
                <p>Number: {p.number}</p>
                <p>Code: {p.code}</p>
                <p>Name: {p.name}</p>
              </div>
              <div>
                <i
                  className="bi bi-trash-fill"
                  onClick={() => deletePayment(p._id)}
                ></i>
              </div>
            </div>
          ))}
        </Fragment>
      ) : (
        <Fragment>
          <h3>Add Payment Method</h3>
          <form onSubmit={(e) => onSubmit2(e)}>
            <div>
              <input
                placeholder="Number"
                name="number"
                value={number}
                onChange={(e) => onChange2(e)}
              ></input>
            </div>
            <div>
              <input
                placeholder="Code"
                name="code"
                value={code}
                onChange={(e) => onChange2(e)}
              ></input>
            </div>
            <div>
              <input
                placeholder="Name"
                name="nome"
                value={nome}
                onChange={(e) => onChange2(e)}
              ></input>
            </div>
            <div>
              <input type="submit" value="Submit" className="btn"></input>
            </div>
          </form>
        </Fragment>
      )}
      {addPaymentCard ? (
        ""
      ) : (
        <button
          className="btn"
          onClick={() => setAddPaymentCard(!addPaymentCard)}
        >
          Add Payment Card
        </button>
      )}
    </Fragment>
  );
};
