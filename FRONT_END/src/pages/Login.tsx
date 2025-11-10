import "./auth.css";
import { useState } from "react";
import { FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { LoginUser } from "../services/authService";
import ShinyText from "../components/ShinyText/ShinyText";

const Login = () => {
  const [errorMsg, setErrorMsg] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const handleLogin = async (e: any) => {
    e.preventDefault();
    setErrorMsg('');

    try {
      const resp = await LoginUser(email, password);

      if (!resp) {
        setErrorMsg('No connection to server');
        return;
      }
      if ("error" in resp) {
        setErrorMsg(resp.error);
        return;
      }
      window.location.href = "/";
    } catch (err) {
        setErrorMsg("An error has occurred. Check your email or password.");
      }
  };

  return (
    <>
      <div className="container">
        <form action="" onSubmit={handleLogin}>
          <ShinyText text="Login" className="title" />

          <div className="input-box">
            <input
              type="text"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
            />
            <MdEmail className="icon" />
          </div>
          {errorMsg && <p className="error-Msg">{errorMsg}</p>}

          <div className="input-box">
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
            />
            <FaLock className="icon" />
          </div>
          <div className="create-account">
            <p>
              Don't have an account?
              <a href="./Register">Sign up</a>
            </p>
          </div>
          <button type="submit" className="btn">
            Login
          </button>
        </form>
      </div>
    </>
  );
};

export default Login;