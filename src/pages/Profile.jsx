import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import AccountCard from "../components/AccountCard";
import Button from "../components/Button";

function Profile() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Déconnexion
  const handleSignOut = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  // Récupérer les infos utilisateur
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    fetch("http://localhost:3001/api/v1/user/profile", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          setUser(data.body);
        } else {
          navigate("/login");
        }
      })
      .catch(() => {
        navigate("/login");
      });
  }, [navigate]);

  return (
    <>
      <Header isAuthenticated={true} userName={user?.userName} onLogout={handleSignOut} />

      <main className="main bg-dark">
        <div className="header">
          <h1>
            Welcome back<br />
            {user?.firstName} {user?.lastName}!
          </h1>
          <Button className="edit-button" onClick={() => alert("Not implemented")}>
            Edit Name
          </Button>
        </div>

        <h2 className="sr-only">Accounts</h2>

        {/* Comptes simulés (à remplacer plus tard) */}
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

      <Footer />
    </>
  );
}

export default Profile;