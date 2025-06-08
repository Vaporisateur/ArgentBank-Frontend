import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import AccountCard from "../components/AccountCard";
import Button from "../components/Button";
import { fetchUserProfile, updateUserName } from "../store/userSlice";

function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state) => state.user.token);
  const user = useSelector((state) => state.user.user);
  const [editMode, setEditMode] = useState(false);
  const [newUserName, setNewUserName] = useState(user?.userName || "");

  const handleUpdateUserName = () => {
  dispatch(updateUserName({ token, userName: newUserName }))
    .unwrap()
    .then(() => setEditMode(false))
    .catch((err) => alert("Erreur: " + err));
  };

  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else if (!user) {
      dispatch(fetchUserProfile(token));
    }
  }, [token, user, dispatch, navigate]);

  if (!user) return null;

  return (
    <>
      <main className="main bg-dark">
        <div className="header">
          {!editMode ? (
            <>
              <h1>
                Welcome back<br />
                {user.firstName} {user.lastName}!
              </h1>
              <Button className="edit-button" onClick={() => setEditMode(true)}>
                Edit Name
              </Button>
            </>
          ) : (
            <form
              onSubmit={e => {
                e.preventDefault();
                handleUpdateUserName();
              }}
              className="edit-form input-row"
            >
              <h2 className="edit-title">Edit user info</h2>
              <div className="input-wrapper">
                <label htmlFor="userName">User name:</label>
                <input
                  type="text"
                  id="userName"
                  value={newUserName}
                  onChange={e => setNewUserName(e.target.value)}
                  required
                />
              </div>
              <div className="input-wrapper">
                <label htmlFor="firstName">First name:</label>
                <input
                  type="text"
                  id="firstName"
                  value={user.firstName}
                  disabled
                  className="input-disabled"
                />
              </div>
              <div className="input-wrapper">
                <label htmlFor="lastName">Last name:</label>
                <input
                  type="text"
                  id="lastName"
                  value={user.lastName}
                  disabled
                  className="input-disabled"
                />
              </div>
              <div className="edit-buttons-wrapper">
                <Button type="submit" className="edit-button">
                  Save
                </Button>
                <Button type="button" className="edit-button" onClick={() => setEditMode(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          )}
        </div>
        <h2 className="sr-only">Accounts</h2>
        <AccountCard
          title="Argent Bank Checking (x8349)"
          amount="$2,082.79"
          description="Available Balance"
        />
        <AccountCard
          title="Argent Bank Savings (x6712)"
          amount="$10,928.42"
          description="Available Balance"
        />
        <AccountCard
          title="Argent Bank Credit Card (x8349)"
          amount="$184.30"
          description="Current Balance"
        />
      </main>
    </>
  );
}

export default Profile;