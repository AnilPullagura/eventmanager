import { useNavigate, Navigate } from "react-router-dom";
import { useState, useContext } from "react";
import EventContext from "../../context";

import Cookies from "js-cookie";
import "./index.css";

const Login = () => {
  const [isregister, setStatus] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");
  const [errMsg, setMSg] = useState("");
  const navigate = useNavigate();

  const { loginUser } = useContext(EventContext);

  const api = "https://eventmanager-api.onrender.com";

  const setToken = (token) => {
    Cookies.set("jwt_token", token, { expires: 20 });
    navigate("/", { replace: true });
  };

  const fetchLogin = async () => {
    const url = `${api}/api/auth/login`;
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    };
    try {
      const response = await fetch(url, options);
      if (response.ok) {
        const data = await response.json();
        Cookies.set("user", data.user.id, { expires: 20 });
        loginUser(data.user.id);
        setToken(data.token);
      } else {
        const data = await response.json();
        setMSg(data.message);
      }
    } catch (er) {
      alert(er);
    }
  };

  const getloginApicall = (e) => {
    e.preventDefault();
    fetchLogin();
  };

  const fetchRegister = async () => {
    const url = `${api}/api/auth/register`;
    const user = {
      name,
      email,
      password,
    };

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    };

    try {
      const response = await fetch(url, options);
      if (response.ok) {
        const data = response.json();
        fetchLogin();
      } else {
        const data = await response.json();
        setMSg(data.message);
      }
    } catch (er) {
      alert(er);
    }
  };

  const renderLoginform = () => {
    return (
      <form onSubmit={getloginApicall} className="login-section">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPass(e.target.value)}
        />
        <button type="submit">Login</button>
        {errMsg && <p className="err-msg">{errMsg}</p>}
        <p>
          Don't have an account?
          <span onClick={() => setStatus((prev) => !prev)}>Register</span>
        </p>
      </form>
    );
  };

  const getApicall = (e) => {
    e.preventDefault();
    fetchRegister();
  };

  const renderRegisterform = () => {
    return (
      <form onSubmit={getApicall} className="register-section">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(p) => setPass(p.target.value)}
        />
        <button type="submit">Register</button>
        {errMsg && <p className="err-msg">{errMsg}</p>}
        <p>
          Already have an account{" "}
          <span onClick={() => setStatus((prev) => !prev)}>Login</span>
        </p>
      </form>
    );
  };

  const token = Cookies.get("jwt_token");
  if (token) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="login-box">
      <div className="login-container">
        <h1>
          Welcome To <span>Event Pro</span>
        </h1>
      </div>
      <div className="login-form">
        {isregister ? renderLoginform() : renderRegisterform()}
      </div>
    </div>
  );
};

export default Login;
