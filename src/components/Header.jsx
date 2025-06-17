import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/img/argentBankLogo.webp";
import Button from "./Button";

function Header({ isAuthenticated = false, userName = "", onLogout }) {
  const navigate = useNavigate();

  return (
    <header>
      <nav className="main-nav">
        <Link className="main-nav-logo" to="/">
          <img
            className="main-nav-logo-image"
            src={logo}
            alt="Argent Bank Logo"
          />
          <h1 className="sr-only">Argent Bank</h1>
        </Link>

        <div>
          {!isAuthenticated ? (
            <Link className="main-nav-item" to="/login">
              <i className="fa fa-user-circle"></i> Sign In
            </Link>
          ) : (
            <>
              <span
                className="main-nav-item"
                style={{ cursor: "pointer" }}
                onClick={() => navigate("/profile")}
              >
                <i className="fa fa-user-circle"></i> {userName}
              </span>
              <Button type="submit" className="logout-button" onClick={onLogout}>
                <i className="fa fa-sign-out"></i> Sign Out
              </Button>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Header;