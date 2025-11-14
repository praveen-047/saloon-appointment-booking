import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../api";
import Cookies from "js-cookie";
import "./index.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setError] = useState("");
  const navigate = useNavigate();

  const loginSuccess = (token) => {
    Cookies.set("jwt_token", token, { expires: 30 });
    navigate("/");
  };

  const loginFailure = (error) => {
    setError(error);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login(email, password);
      const data = await res.json();
      if (res.ok) {
        loginSuccess(data.token);
      } else {
        loginFailure(data.msg);
      }
    } catch (error) {
      console.log("login error ", error);
    }
  };

  const onClickRegister = () => {
    navigate("/register", { replace: true });
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            required
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            required
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <p className="forgot-text">Forgot password?</p>

          <div className="btn-group">
            <button type="submit" className="btn-login">Login</button>
          </div>

          <p className="signup-text">
            Don’t have an account?{" "}
            <span onClick={onClickRegister}>click here</span>
          </p>

          {errorMsg && <p className="error">{errorMsg}</p>}
        </form>
      </div>
    </div>
  );
}
