// Profile.jsx
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfile } from "./slices/authSlice";
import { updateUserProfile } from "./slices/updateSlice";

import "./css/modal.css";

const Profile = () => {
  const dispatch = useDispatch();
  const { user, isLoading, error } = useSelector((state) => state.auth);

  const [isEditing, setIsEditing] = useState(false);
  const [firstName, setFirstName] = useState(user.firstName);  
  const [lastName, setLastName] = useState(user.lastName);  

  const handleSave = async () => {
    await dispatch(updateUserProfile({ firstName, lastName }));

    await dispatch(fetchUserProfile());  

    setIsEditing(false);
  };

  if (isLoading) {
    return <div>Chargement...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <main className="main bg-dark">
      <div className="welcoming">
        <h1>
          Welcome back <br />
          {user ? `${user.firstName} ${user.lastName}` : "User"}!
        </h1>
        <button className="edit-button" onClick={() => setIsEditing(true)}>
          Edit Name
        </button>
      </div>

      {isEditing && (
        <div className="modal">
          <div className="modal-content">
            <h2>Edit Your Name</h2>
            <div className="input-wrapper">
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}  
                placeholder="First Name"
              />
            </div>
            <div className="input-wrapper">
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}  
                placeholder="Last Name"
              />
            </div>
            <button className="edit-button" onClick={handleSave}>
              Save
            </button>
            <button className="edit-button-cancel" onClick={() => setIsEditing(false)}>
              Cancel
            </button>
          </div>
        </div>
      )}

      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Checking (x8349)</h3>
          <p className="account-amount">$2,082.79</p>
          <p className="account-amount-description">Available Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>

      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Savings (x6712)</h3>
          <p className="account-amount">$10,928.42</p>
          <p className="account-amount-description">Available Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>

      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
          <p className="account-amount">$184.30</p>
          <p className="account-amount-description">Current Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
    </main>
  );
};

export default Profile;
