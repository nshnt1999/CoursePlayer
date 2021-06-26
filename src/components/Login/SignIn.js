import React, { useState } from "react";
import { useAuth } from "../../contexts/authContext";
import { GrClose } from "react-icons/gr";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useToast } from "../../contexts/toastContext";
import Loader from "react-loader-spinner";
import "./Login.css";
// import { Link } from "react-router-dom";

function SignIn() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const { auth, setAuth } = useAuth();
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  async function handleSignIn() {
    try {
      setIsLoading(true);
      const res = await axios.post("https://codesplasher.herokuapp.com/auth/login", {
        email: email,
        password: password,
      });
      setIsLoading(false);
      if (!res.data.token) {
        setError(res.data);
      } else {
        toast("Logged in Successfully", {
          type: "success",
        });
        setAuth(res.data);
        setAuth((prev) => {
          localStorage.setItem("auth", JSON.stringify(prev));
          return prev;
        });
      }
    } catch (err) {
      setIsLoading(false);
      console.log(err);
    }
  }

  return (
    <div className="login--container">
      <div className="login--modal">
        <GrClose onClick={() => history.goBack()} className="close--btn" />
        <div className="login--title">
          <h1>YOUR ACCOUNT FOR</h1>
          <h1>
            EVERYTHING <span style={{ color: "#ef4444" }}>CODESPLASH</span>
          </h1>
        </div>
        <div className="login--input">
          <input
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button onClick={handleSignIn} className="login--btn">
          {isLoading ? (
            <Loader type="TailSpin" color="#fff" height={20} width={20} />
          ) : (
            "Sign In"
          )}
        </button>
      </div>
    </div>
  );
}

export default SignIn;
