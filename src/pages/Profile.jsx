import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import AccountCard from "../components/AccountCard";
import Button from "../components/Button";
import { fetchUserProfile, updateUserName } from "../store/userSlice";
import EditUserInfo from "../components/EditUserInfo";

function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state) => state.user.token);
  const user = useSelector((state) => state.user.user);
  const [editMode, setEditMode] = useState(false);
  const [newUserName, setNewUserName] = useState(user?.userName || "");

  const handleUpdateUserName = (newUserName, onSuccess) => {
    dispatch(updateUserName({ token, userName: newUserName }))
      .unwrap()
      .then(() => onSuccess())
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
            <EditUserInfo
              user={user}
              token={token}
              handleUpdateUserName={handleUpdateUserName}
              onCancel={() => setEditMode(false)}
            />
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