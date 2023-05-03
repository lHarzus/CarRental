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
import { Options } from "./Options";
import { Orders } from "./Orders";

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
  const [addPaymentCard, setAddPaymentCard] = useState(false);

  if (loading) {
    return (
      <div>
        <img src={spinner}></img>
      </div>
    );
  } else {
    return (
      <div className="profile">
        <Options
          setOption={setOption}
          setAddPaymentCard={setAddPaymentCard}
          setChangeInfo={setChangeInfo}
          option={option}
        />
        <div className="profile-option">
          {option === "profile" ? (
            <Details
              user={user}
              changeInfo={changeInfo}
              setChangeInfo={setChangeInfo}
              profile={profile}
              createProfile={createProfile}
              loading={loading}
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
            <Orders orders={profile.orders} history={profile.history} />
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
