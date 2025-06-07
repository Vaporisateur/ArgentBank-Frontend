import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser, fetchUserProfile } from "../store/userSlice";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import Button from "../components/Button";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const token = useSelector((state) => state.user.token);

  useEffect(() => {
    if (token) {
      navigate("/profile");
    }
  }, [token, navigate]);

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = await dispatch(loginUser({ email, password })).unwrap();
      await dispatch(fetchUserProfile(token));
      navigate("/profile");
    } catch (err) {
      alert("Erreur : " + err);
    }
  };

  return (
    <>
      <main className="main bg-dark">
        <section className="sign-in-content">
          <i className="fa fa-user-circle sign-in-icon"></i>
          <h1>Sign In</h1>
          <form onSubmit={handleSubmit}>
            <div className="input-wrapper">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="input-wrapper">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="input-remember">
              <input type="checkbox" id="remember-me" />
              <label htmlFor="remember-me">Remember me</label>
            </div>
            <Button type="submit" className="sign-in-button">
              Sign In
            </Button>
          </form>
        </section>
      </main>
    </>
  );
}

export default Login;