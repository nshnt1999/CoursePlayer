import React, { useEffect, useState } from "react";
import "./Courses.css";
import { Link } from "react-router-dom";
import { useLibrary } from "../../contexts/libraryContext";
import { BsBookmark, BsFillBookmarkFill } from "react-icons/bs";
import { useBookmark } from "../../contexts/bookmarkContext";
import { useAuth } from "../../contexts/authContext";
import axios from "axios";

function Course({
  item: { _id, author, profile, image, desc, duration, name, type, back },
}) {
  const { bookmark, setBookmark } = useBookmark();

  function isSaved() {
    let avail = false;
    bookmark.map((item) => {
      if (item._id === _id) {
        avail = true;
      }
      return item;
    });
    return avail;
  }

  function handleBookmark() {
    if (isSaved()) {
      setBookmark((prev) => prev.filter((item) => item._id !== _id));
    } else {
      setBookmark((prev) =>
        prev.concat({ _id, author, profile, name, back, type })
      );
    }
  }
  
  return (
    <div className="course--div">
      <div className="course--img">
        <img src={back} alt="" />
      </div>
      <div className="course--details">
        <div className="course--title">
          <h1>{name}</h1>
          {!isSaved() ? (
            <BsBookmark
              onClick={handleBookmark}
              size={24}
              style={{ marginLeft: "auto" }}
            />
          ) : (
            <BsFillBookmarkFill
              onClick={handleBookmark}
              color={"#E56026"}
              size={24}
              style={{ marginLeft: "auto" }}
            />
          )}
        </div>
        <div className="course--author">
          <img src={image} alt="" />
          <div className="author--details">
            <h1>{author}</h1>
            <h2>{profile}</h2>
          </div>
        </div>
        <p>{desc}</p>
        <h1 className="course--duration">{duration}</h1>
        <Link className="link" to={`/course/${_id}`}>
          <button>View Playlist</button>
        </Link>
      </div>
    </div>
  );
}

function Courses({ setShowNavBottom }) {
  const { library } = useLibrary();
  const [inputText, setInputText] = useState("");
  const [output, setOutput] = useState([]);
  const { auth } = useAuth();
  const { bookmark } = useBookmark();

  useEffect(() => {
    setShowNavBottom(true);
    return () => {
      setShowNavBottom(false);
    };
  }, [setShowNavBottom]);

  useEffect(() => {
    if (auth) {
      try {
        (async function postPlaylist() {
          const response = await axios.post(
            "https://codesplasher.herokuapp.com/bookmark",
            {
              bookmark: bookmark,
            },
            {
              headers: {
                "auth-token": auth.token,
              },
            }
          );
          console.log("bookmark", response.data.bookmark);
          response.data.bookmark &&
            localStorage.setItem("bookmark", JSON.stringify(response.data.bookmark));
        })();
      } catch (err) {
        console.log(err);
      }
    }
  }, [bookmark,auth]);

  function checkAvailable(db, item) {
    let pat = item.trim();
    return db.toUpperCase().includes(pat.toUpperCase());
  }

  useEffect(() => {
    setOutput(library.filter((curr) => checkAvailable(curr.name, inputText)));
  }, [inputText,library]);

  return (
    <div className="courses--main">
      <div className="courses--header">
        <h1>Full Stack Development Courses</h1>
        <input
          type="text"
          placeholder="Type to Search"
          onChange={(e) => setInputText(e.target.value)}
        />
      </div>
      <div className="courses--list">
        {inputText.length
          ? output.map((item) => <Course key={item._id} item={item} />)
          : library.map((item) => <Course key={item._id} item={item} />)}
      </div>
    </div>
  );
}

export default Courses;
