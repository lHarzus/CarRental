import React, { useEffect, useState, Fragment } from "react";
import PropTypes from "prop-types";
import {
  getCurrentProfile,
  addOrder,
  addPayment,
  deleteOrder,
  createProfile,
  deletePayment,
} from "../../actions/profile";
import { connect } from "react-redux";
import spinner from "../../images/loading.gif";
import { Payments } from "./Payments";
import { Details } from "./Details";

const Profile = ({
  getCurrentProfile,
  addOrder,
  addPayment,
  deleteOrder,
  deletePayment,
  createProfile,
  profile: { profile, loading },
  auth: { user },
}) => {
  useEffect(() => {
    getCurrentProfile();
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
            <Details
              user={user}
              changeInfo={changeInfo}
              setChangeInfo={setChangeInfo}
              profile={profile}
              formData={formData}
              setFormData={setFormData}
              createProfile={createProfile}
            />
          ) : option === "payment" ? (
            <Payments
              addPaymentCard={addPaymentCard}
              profile={profile}
              setAddPaymentCard={setAddPaymentCard}
              deletePayment={deletePayment}
              addPayment={addPayment}
            />
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
  deletePayment: PropTypes.func.isRequired,
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
  deletePayment,
})(Profile);
