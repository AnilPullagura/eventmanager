import { useNavigate, Navigate } from "react-router-dom";

import Cookies from "js-cookie";

import "react-toastify/dist/ReactToastify.css";
import { User, LoginResponse } from "../../types";
import { useState, useContext } from "react";
import EventContext from "../../context";

import "./index.css";

const Login = () => {
  const [isregister, setStatus] = useState<boolean>(true);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPass] = useState<string>("");
  const [errMsg, setMSg] = useState<string>("");
  const navigate = useNavigate();

  const { loginUser } = useContext(EventContext);

  const api = "https://eventmanager-api.onrender.com";

  const setToken = (token: string): void => {
    Cookies.set("jwt_token", token, { expires: 2 });
  };

  const navigateToHome = (user: User) => {
    if (user.role === "admin") {
      return navigate("/admin", { replace: true });
    } else {
      return navigate("/", { replace: true });
    }
  };

  const fetchLogin = async (): Promise<void> => {
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
        const data: LoginResponse = await response.json();
        Cookies.set("user", data.user.id, { expires: 2 });
        loginUser(data.user.id);
        if (data.token) setToken(data.token);
        navigateToHome(data.user);
      } else {
        const data = await response.json();
        setMSg(data.message);
      }
    } catch (er) {
      alert(er);
    }
  };

  const getloginApicall = (e: React.ChangeEvent<HTMLFormElement>) => {
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

  const getApicall = (e: React.ChangeEvent<HTMLFormElement>) => {
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
