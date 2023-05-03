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

const Profile = ({
  getCurrentProfile,
  addOrder,
  addPayment,
  deleteOrder,
  createProfile,
  profile: { profile, loading },
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
  });

  useEffect(() => {
    if (!loading)
      setFormData({
        phone: profile.phone,
        street: profile.address.street,
        postCode: profile.address.postCode,
        city: profile.address.city,
      });
  }, [loading]);

  if (loading) {
    return (
      <div>
        <img src={spinner}></img>
      </div>
    );
  } else {
    const { phone, street, postCode, city } = formData;

    const onChange = (e) => setFormData({ [e.target.name]: e.target.value });

    const onSubmit = (e) => {
      e.preventDefault();
      createProfile({ phone, address: { street, postCode, city } });
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
        <form onSubmit={(e) => onSubmit(e)}>
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
          <button onClick={() => setOption("profile")}>Profile details</button>
          <button onClick={() => setOption("payment")}>Payments</button>
          <button onClick={() => setOption("order")}>Orders</button>
        </div>
        <div className="profile-option">
          {option === "profile" ? (
            <Fragment>
              <div className="profile-avatar">
                <img src={profile.user.avatar}></img>
                <p>{profile.user.name}</p>
              </div>
              {changeInfo ? infoChanger : info}
              <div className="profile-change">
                <button
                  className="btn"
                  onClick={() => setChangeInfo(!changeInfo)}
                >
                  {changeInfo ? "Change" : "Change info"}
                </button>
              </div>
            </Fragment>
          ) : option === "payment" ? (
            <div>Payment</div>
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
});

export default connect(mapStateToProps, {
  getCurrentProfile,
  addOrder,
  addPayment,
  deleteOrder,
  createProfile,
})(Profile);
