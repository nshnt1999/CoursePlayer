import React from "react";
import "./Home.css";
import { useLibrary } from "../../contexts/libraryContext";
import { usePlaylist } from "../../contexts/playlistContext";
import { useState } from "react";
import SideList from "./SideList";
import VideoPlay from "./VideoPlay";
import { AiOutlineMenuUnfold } from "react-icons/ai";
import { useParams, useLocation } from "react-router-dom";
// import { useAuth } from "../../contexts/authContext";
// import axios from "axios";

function Home() {
  let { id } = useParams();
  const path = useLocation().pathname;
  // const { auth } = useAuth();
  const { library } = useLibrary();
  const { playlist } = usePlaylist();
  const [showList, setShowList] = useState(false);
  const [currVideo, setCurrVideo] = useState("");

  
  function getFilteredData(library) {
    if(path.includes("playlist"))
    {
      return playlist.find(item=>item._id===id);
    }
    return library.find(item=>item._id===id);
  }

  const filteredData = getFilteredData(library, id);
  
  return (
    <div className="home--body">
      <SideList
        name={filteredData && filteredData.name}
        videos={filteredData && filteredData.videos}
        showList={showList}
        setShowList={setShowList}
        setCurrVideo={setCurrVideo}
      />
      <AiOutlineMenuUnfold
        className="sidebar--icon"
        size={32}
        onClick={() => setShowList((prev) => !prev)}
      />
      <VideoPlay currVideo={currVideo} playlistId={id} playlistName={filteredData && filteredData.name}/>
    </div>
  );
}

export default Home;
