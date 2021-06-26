import React, { useEffect, useState } from "react";
import { usePlaylist } from "../../contexts/playlistContext";
import { RiPlayListAddLine } from "react-icons/ri";
import { AiFillCloseCircle } from "react-icons/ai";
import uuid from "react-uuid";
import { HiOutlineViewGridAdd } from "react-icons/hi";
import { useToast } from "../../contexts/toastContext";
import { useAuth } from "../../contexts/authContext";


function AddToPlaylist({ showPlaylistMenu, setShowPlaylistMenu, vid }) {
  const { playlist, setPlaylist } = usePlaylist();
  const [pname, setPname] = useState();
  const { toast } = useToast();


  function checkAlreadyPresent(videos, vid) {
    return !videos.filter((item) => item === vid).length > 0;
  }

  function addToPlaylist(e, vid) {
    setPlaylist((prev) =>
      prev.map((curr) =>
        curr._id === e.target.value
          ? {
              ...curr,
              videos: checkAlreadyPresent(curr.videos, vid)
                ? [...curr.videos, vid]
                : [...curr.videos],
            }
          : curr
      )
    );
  }

  function checkAlreadyPresentPlaylist(pname){
    return !playlist.filter((item) => item.name === pname).length > 0;
  }

  function addPlaylist(e) {
    if ((e.key === "Enter" || e.type==='click') && pname && pname.trim()!=="" && checkAlreadyPresentPlaylist(pname)) {
      setPlaylist((prev) =>
        prev.concat({
          _id: uuid(),
          name: pname.trim(),
          videos: []
        })
      );
      setPname("");
    }
    else if(e.key === "Enter"){
      toast("Playlist already exist",{
        type:"warning"
      })
    }
  }

  return (
    <div className="modal-container" style={{display:showPlaylistMenu?"":"none"}}>
      <div
        className="addToPlaylist"
        style={{ display: showPlaylistMenu ? "" : "none" }}
      >
        <AiFillCloseCircle
          onClick={() => setShowPlaylistMenu((prev) => !prev)}
          style={{ marginLeft: "auto" }}
          size={24}
        />
        <div className="input--flex">
        <input
          value={pname}
          onChange={(e) => setPname(e.target.value)}
          onKeyDown={addPlaylist}
          placeholder="Add New Playlist"
          style={{
            backgroundColor: "#fff",
            padding: "0.3rem",
            width: "80%",
          }}
        />
        <span><HiOutlineViewGridAdd size={24} onClick={addPlaylist}/></span>
        </div>
        <select
          style={{ width: "100%", marginTop: "1rem" }}
          onChange={(e) => addToPlaylist(e, vid)}
        >
          <option>Add to playlist</option>
          {playlist.map((item) => (
            <option key={item._id} value={item._id}>{item.name}</option>
          ))}
        </select>
      </div>
    </div>
  );
}


function StackList({ vid, setCurrVideo, setShowList }) {
  const [showPlaylistMenu, setShowPlaylistMenu] = useState(false);
  const { auth } = useAuth();

  return (
    <div className="stacklist--container">
      <div
        className="stacklist"
        onClick={() => {
          setCurrVideo(vid);
        }}
      >
        <h1>{vid.heading}</h1>
      </div>
      { auth && <RiPlayListAddLine
        onClick={() => setShowPlaylistMenu((prev) => !prev)}
        size={32}
      />}
      <AddToPlaylist showPlaylistMenu={showPlaylistMenu} setShowPlaylistMenu={setShowPlaylistMenu} vid={vid}/>
    </div>
  );
}

function SideList({ name, videos, showList, setShowList, setCurrVideo }) {

  useEffect(() => {
    console.log("The video is",videos);
    setCurrVideo( videos && videos[0]);
  }, [videos,setCurrVideo]);

  return (
    <div className={!showList ? "sidelist" : "sidelist--show"}>
      <div className="sidelist--header">
        <h1>{name}</h1>
        <AiFillCloseCircle
          className="sidelist--close"
          onClick={() => setShowList((prev) => !prev)}
          size={24}
        />
      </div>
      {videos && videos.map((vid) => (
        <StackList
          key={vid.id}
          vid={vid}
          setCurrVideo={setCurrVideo}
          setShowList={setShowList}
        />
      ))}
    </div>
  );
}

export default SideList;
