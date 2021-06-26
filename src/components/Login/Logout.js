import React from "react";
import { useAuth } from "../../contexts/authContext";
import { GrClose } from "react-icons/gr";
// import axios from "axios";
import { useHistory } from "react-router-dom";
import { useToast } from "../../contexts/toastContext";
// import Loader from "react-loader-spinner";
import "./Login.css";
import { useBookmark } from "../../contexts/bookmarkContext";
import { usePlaylist } from "../../contexts/playlistContext";

function Logout() {
  const { toast } = useToast();
  // const [isLoading, setIsLoading] = useState(false);
  const { setAuth } = useAuth();
  const { setBookmark } = useBookmark();
  const { setPlaylist } = usePlaylist();
  // const [error, setError] = useState("");
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  const history = useHistory();

  function handleLogout() {
    setAuth(null);
    setBookmark([]);
    setPlaylist([]);
    localStorage.clear();
    toast("Logged out Successfully", {
      type: "success",
    });
    history.goBack();
  }

  return (
    <div className="login--container">
      <div className="login--modal">
        <GrClose onClick={() => history.goBack()} className="close--btn" />
        <div className="login--title">
          <h1>ARE YOU SURE YOU WANT TO </h1>
          <h1>
            <span style={{ color: "#ef4444" }}>LOG OUT</span>
          </h1>
        </div>
        <div style={{display:"flex", width:"80%"}}>
        <button style={{backgroundColor:"#fff", color:"#000"}} onClick={()=>history.goBack()} className="login--btn">
          No
        </button>
        <button onClick={handleLogout} className="login--btn">
          Yes
        </button>
        </div>
      </div>
    </div>
  );
}

export default Logout;
