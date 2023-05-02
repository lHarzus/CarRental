import React, { useEffect } from "react";
import PropTypes from "prop-types";
import getCurrentProfile from "../../actions/profile";
import { connect } from "react-redux";

const Profile = ({ getCurrentProfile, profile: { profile } }) => {
  useEffect(() => {
    getCurrentProfile();
  }, []);
  return (
    <div>
      <p>qdwqwd</p>
      <p>qdwqwd</p>
      <p>qdwqwd</p>
      <p>qdwqwd</p>
      <p>qdwqwd</p>
      <p>qdwqwd</p>
    </div>
  );
};

Profile.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentProfile })(Profile);
