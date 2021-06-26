import React, {useState} from "react";
import { GrClose } from "react-icons/gr";
import axios from "axios";
import { Redirect, useHistory } from "react-router-dom";
import { useToast } from "../../contexts/toastContext";
import "./Login.css";
// import { Link } from "react-router-dom";

function SignUp() {
  const [error, setError] = useState("");
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  async function handleSignUp() {
    console.log("inside sign up");
    try {
      const res = await axios.post("https://codesplasher.herokuapp.com/auth/register", {
        name: name,
        email: email,
        password: password,
      });
      if (!res.data.user) {
        setError(res.data);
      } else {
        toast("Signed Up Successfully, Login to Continue", {
          type: "success",
        });
        <Redirect to="/login" />;
      }
    } catch (err) {
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
            placeholder="Username"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
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
        <button className="login--btn" onClick={handleSignUp}>
          Sign Up
        </button>
      </div>
    </div>
  );
}

export default SignUp;
