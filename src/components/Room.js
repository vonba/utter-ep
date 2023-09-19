import styled from "styled-components";
import VideoBackground from "./VideoBackground";
import RoomDesire from "./RoomDesire";
import RoomItShines from "./RoomItShines";
import RoomSoundAndTouch from "./RoomSoundAndTouch";

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

// TODO: Move to separate file, merge with rooms variable in RoomSwitcher
const videoNames = {
  desire: "desire.mov",
  "it-shines": "it-shines.mov",
  "sound-and-touch": "sound-and-touch.mov",
};

export default function Room({ roomName, paused }) {
  const videoName = videoNames[roomName];

  const nextRoom = () => {
    // TODO: move to the next room
    console.log("Next video")
  };

  return (
    <RoomStyles>
      <VideoBackground paused={paused} videoName={videoName} handleVideoEnd={nextRoom} />
      {roomName === "desire" && (
        <div className="roomWrapper">
          <RoomDesire className="room" />
        </div>
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
    </RoomStyles>
  );
}
