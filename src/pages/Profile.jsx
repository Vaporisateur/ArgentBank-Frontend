import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import AccountCard from "../components/AccountCard";
import Button from "../components/Button";
import { fetchUserProfile } from "../store/userSlice";

function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state) => state.user.token);
  const user = useSelector((state) => state.user.user);

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
          <h1>
            Welcome back<br />
            {user.firstName} {user.lastName}!
          </h1>
          <Button className="edit-button" onClick={() => alert("Not implemented")}>
            Edit Name
          </Button>
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