import React, { Fragment, useEffect, useState } from "react";

export const Details = ({
  profile,
  changeInfo,
  setChangeInfo,
  createProfile,
  loading,
}) => {
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    createProfile({ user, phone, address: { street, postCode, city } });
    setChangeInfo(false);
  };

  const [formData, setFormData] = useState({
    phone: "",
    street: "",
    postCode: "",
    city: "",
    user: "",
  });

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

  const { phone, street, postCode, city, user } = formData;

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
          <button className="btn" onClick={() => setChangeInfo(!changeInfo)}>
            Change info
          </button>
        </div>
      )}
    </Fragment>
  );
};
