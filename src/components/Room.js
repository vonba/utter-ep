import styled from "styled-components";
import VideoBackground from "./VideoBackground";
import RoomDesire from "./RoomDesire";
import RoomItShines from "./RoomItShines";
import RoomSoundAndTouch from "./RoomSoundAndTouch";
import rooms from "../lib/rooms";
import RoomTest from "./RoomMother";
import { useState } from "react";
import RoomTest2 from "./RoomGenius";
import RoomKiller from "./RoomKiller";
import RoomMother from "./RoomMother";
import RoomGenius from "./RoomGenius";

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

export default function Room({ roomName, paused, setEnded, roomVideoPosition, setRoomVideoPosition }) {
  const videoName = rooms[roomName].videoFile;
  const [videoStyles, setVideoStyles] = useState();
  const [videoBgStyles, setVideoBgStyles] = useState();

  const handleVideoEnded = () => {
    setEnded(true);
    setVideoStyles(null);
    setVideoBgStyles(null);
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
        setRoomVideoPosition={setRoomVideoPosition}
      />
      {roomName === "sound-and-touch" && (
        <div className="roomWrapper">
          <RoomSoundAndTouch className="room" roomVideoPosition={roomVideoPosition} setVideoStyles={setVideoStyles} setVideoBgStyles={setVideoBgStyles} />
        </div>
      )}
      {roomName === "it-shines" && (
        <div className="roomWrapper">
          <RoomItShines className="room" roomVideoPosition={roomVideoPosition}  setVideoStyles={setVideoStyles} setVideoBgStyles={setVideoBgStyles}  />
        </div>
      )}
      {roomName === "flash-of-genius" && (
        <RoomGenius className="room" roomVideoPosition={roomVideoPosition} />
      )}
      {roomName === "cloth-mother-vs-metal-mother" && (
        <div className="roomWrapper">
          <RoomMother className="room" setVideoStyles={setVideoStyles} setVideoBgStyles={setVideoBgStyles} roomVideoPosition={roomVideoPosition} />
        </div>
      )}
      {roomName === "car-massacre-picnic" && (
        <RoomDesire className="room" roomVideoPosition={roomVideoPosition} />
      )}
      {roomName === "the-killer-is-on-the-phone" && (
        <div className="roomWrapper">
          <RoomKiller className="room" roomVideoPosition={roomVideoPosition} />
        </div>
      )}
    </RoomStyles>
  );
}
