import React, { useEffect, useState, Fragment } from "react";
import PropTypes from "prop-types";
import {
  getCurrentProfile,
  addOrder,
  addPayment,
  deleteOrder,
  createProfile,
} from "../../actions/profile";
import { connect } from "react-redux";
import spinner from "../../images/loading.gif";
import Alert from "../../components/layout/Alert";

const Profile = ({
  getCurrentProfile,
  addOrder,
  addPayment,
  deleteOrder,
  createProfile,
  profile: { profile, loading },
  auth: { user },
}) => {
  useEffect(() => {
    getCurrentProfile();
    //deleteOrder("6452735b59e47262234f9530");
    //addPayment({ number: "123213", code: "erwef", name: "wfewwef" });
    /*addOrder({
      car: "644a740050b4d5d13b6e5d14",
      pickup: {
        place: "Braga",
        date: Date.now,
      },
      dropoff: {
        place: "Braga",
        date: Date.now,
      },
    });*/
  }, []);

  const [option, setOption] = useState("profile");
  const [changeInfo, setChangeInfo] = useState(false);
  const [formData, setFormData] = useState({
    phone: "",
    street: "",
    postCode: "",
    city: "",
    user: "",
  });
  const [formData2, setFormData2] = useState({
    number: "",
    code: "",
    nome: "",
  });
  const [addPaymentCard, setAddPaymentCard] = useState(false);

  useEffect(() => {
    if (!loading)
      setFormData({
        phone: profile.phone,
        street: profile.address.street,
        postCode: profile.address.postCode,
        city: profile.address.city,
        user: user,
      });
  }, [loading]);

  if (loading) {
    return (
      <div>
        <img src={spinner}></img>
      </div>
    );
  } else {
    const { phone, street, postCode, city, user } = formData;
    const { nome, code, number } = formData2;

    const onChange = (e) =>
      setFormData({ ...formData, [e.target.name]: e.target.value });

    const onChange2 = (e) =>
      setFormData2({ ...formData2, [e.target.name]: e.target.value });

    const onSubmit = (e) => {
      e.preventDefault();
      createProfile({ user, phone, address: { street, postCode, city } });
      setChangeInfo(false);
    };

    const onSubmit2 = (e) => {
      e.preventDefault();
      addPayment({ number, code, name: nome });
      setFormData2({ number: "", code: "", nome: "" });
      setAddPaymentCard(false);
    };

    const info = (
      <div>
        <h3>Phone number </h3>
        <span>{profile.phone}</span>
        <h3>Address</h3>
        <div>
          <span>Street: </span>
          <span> {profile.address.street}</span>
        </div>
        <div>
          <span>Post Code: </span>
          <span>{profile.address.postCode}</span>
        </div>
        <div>
          <span>City: </span>
          <span>{profile.address.city}</span>
        </div>
      </div>
    );

    const infoChanger = (
      <Fragment>
        <h3>Change Info</h3>
        <form onSubmit={(e) => onSubmit(e)} className="info-form">
          <div>
            <input
              placeholder="Phone number"
              name="phone"
              value={phone}
              onChange={(e) => onChange(e)}
            ></input>
            <input
              placeholder="Street"
              name="street"
              value={street}
              onChange={(e) => onChange(e)}
            ></input>
          </div>
          <div>
            <input
              placeholder="Post Code"
              name="postCode"
              value={postCode}
              onChange={(e) => onChange(e)}
            ></input>
            <input
              placeholder="City"
              name="city"
              value={city}
              onChange={(e) => onChange(e)}
            ></input>
          </div>
          <input type="submit" value="Submit" className="btn"></input>
        </form>
      </Fragment>
    );

    return (
      <div className="profile">
        <div className="profile-options">
          <button
            onClick={() => {
              setOption("profile");
              setAddPaymentCard(false);
              setChangeInfo(false);
            }}
          >
            Profile details
          </button>
          <button
            onClick={() => {
              setOption("payment");
              setAddPaymentCard(false);
              setChangeInfo(false);
            }}
          >
            Payments
          </button>
          <button
            onClick={() => {
              setOption("order");
              setAddPaymentCard(false);
              setChangeInfo(false);
            }}
          >
            Orders
          </button>
        </div>
        <div className="profile-option">
          {option === "profile" ? (
            <Fragment>
              <div className="profile-avatar">
                <img src={user.avatar}></img>
                <p>{user.name}</p>
              </div>
              {changeInfo ? infoChanger : info}
              {changeInfo ? (
                ""
              ) : (
                <div className="profile-change">
                  <button
                    className="btn"
                    onClick={() => setChangeInfo(!changeInfo)}
                  >
                    Change info
                  </button>
                </div>
              )}
            </Fragment>
          ) : option === "payment" ? (
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
                      <p>Number: {p.number}</p>
                      <p>Code: {p.code}</p>
                      <p>Name: {p.name}</p>
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
                      <input
                        type="submit"
                        value="Submit"
                        className="btn"
                      ></input>
                    </div>
                  </form>
                  <Alert />
                </Fragment>
              )}
              {addPaymentCard ? (
                ""
              ) : (
                <button
                  className="btn2"
                  onClick={() => setAddPaymentCard(!addPaymentCard)}
                >
                  Add Payment Card
                </button>
              )}
            </Fragment>
          ) : (
            <div>order</div>
          )}
        </div>
      </div>
    );
  }
};

Profile.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  addOrder: PropTypes.func.isRequired,
  addPayment: PropTypes.func.isRequired,
  deleteOrder: PropTypes.func.isRequired,
  createProfile: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
});

export default connect(mapStateToProps, {
  getCurrentProfile,
  addOrder,
  addPayment,
  deleteOrder,
  createProfile,
})(Profile);
