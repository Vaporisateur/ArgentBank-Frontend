import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../store/userSlice";
import AuthForm from "../components/AuthForm";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const token = useSelector((state) => state.user.token);

  const dispatch = useDispatch();

  useEffect(() => {
    if (token) {
      navigate("/profile");
    }
  }, [token, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await dispatch(loginUser({ email, password })).unwrap();
    } catch (err) {
      setError(err || "Login failed");
    }
  };

  const fields = [
    {
      id: "username",
      label: "Username",
      type: "text",
      value: email,
      onChange: (e) => setEmail(e.target.value),
      autoComplete: "username",
      required: true,
    },
    {
      id: "password",
      label: "Password",
      type: "password",
      value: password,
      onChange: (e) => setPassword(e.target.value),
      autoComplete: "current-password",
      required: true,
    },
  ];

  return (
    <main className="main bg-dark">
      <section className="sign-in-content">
        <i className="fa fa-user-circle sign-in-icon"></i>
        <AuthForm
          title="Sign In"
          fields={fields}
          onSubmit={handleSubmit}
          error={error}
          submitLabel="Sign In"
          submitClassName="sign-in-button"
        >
          <div className="input-remember">
            <input type="checkbox" id="remember-me" />
            <label htmlFor="remember-me">Remember me</label>
          </div>
        </AuthForm>
      </section>
    </main>
  );
}

export default Login;