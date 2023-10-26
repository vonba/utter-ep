import styled from "styled-components";
import VideoBackground from "./VideoBackground";
import RoomDesire from "./RoomDesire";
import RoomItShines from "./RoomItShines";
import RoomSoundAndTouch from "./RoomSoundAndTouch";
import rooms from "../lib/rooms";
import RoomTest from "./RoomTest";
import { useState } from "react";
import RoomTest2 from "./RoomTest2";

const RoomStyles = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;

  video {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }

  .roomWrapper {
    position: relative;
    top: 7em;
    left: 1em;
    z-index: 2;
    width: 100%;
    height: 100%;
  }
`;

export default function Room({ roomName, paused, setEnded }) {
  const videoName = rooms[roomName].videoFile;
  const [videoStyles, setVideoStyles] = useState();
  const [videoBgStyles, setVideoBgStyles] = useState();

  const handleVideoEnded = () => {
    setEnded(true);
    setVideoStyles({});
    setVideoBgStyles({});
  }

  return (
    <RoomStyles>
      <VideoBackground 
        videoStyles={videoStyles} 
        videoBgStyles={videoBgStyles} 
        setVideoStyles={setVideoStyles} 
        setVideoBgStyles={setVideoBgStyles}
        paused={paused} 
        videoName={videoName} 
        handleVideoEnd={handleVideoEnded}
      />
      {roomName === "desire" && (
        <RoomDesire className="room" />
      )}
      {roomName === "it-shines" && (
        <div className="roomWrapper">
          <RoomItShines className="room" />
        </div>
      )}
      {roomName === "sound-and-touch" && (
        <div className="roomWrapper">
          <RoomSoundAndTouch className="room" />
        </div>
      )}
      {roomName === "test" && (
        <div className="roomWrapper">
          <RoomTest className="room" setVideoStyles={setVideoStyles} setVideoBgStyles={setVideoBgStyles} />
        </div>
      )}
      {roomName === "test2" && (
        <RoomTest2 className="room" setVideoStyles={setVideoStyles} setVideoBgStyles={setVideoBgStyles} />
      )}
    </RoomStyles>
  );
}
