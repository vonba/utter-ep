import { useState } from "react";
import styled from "styled-components";
import SoundAndTouchVideo from "./SoundAndTouchVideo";

const RoomSoundAndTouchStyles = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 40px;

  .header {
    border: 10px solid #000;
    padding: 1rem;
    font-size: 32px;
    background-color: white;
    margin-bottom: 20px;
  }

  .panel {
    // background-color: rgba(242, 242, 242, 0.8);
    padding: 1rem;
    border-radius: 4px;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 1rem;
    width: 90%;
    justify-content: space-around;
  }

  .video-container {
    position: relative;
    width: 30%;
    height: 0;
    padding-bottom: 30%;
    border: ${({ selected }) => (selected ? "10px solid white" : "none")}; /* Add white border if selected */
    z-index: 1;

    &.current {
      border: 4px solid white;
    }

    label {
      z-index: 2;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: white;
      display: flex;
      flex-direction: row;
      align-items: center;
      text-align: center;
    }
  }

  video {
    position: absolute;
    object-fit: cover;
    width: 100%;
    height: 100%;
  }

  .button {
    padding: 0.5rem 1rem;
    background-color: white;
    color: black;
    border: 5px double black;
    border-radius: 4px;
    cursor: pointer;
    font-family: "Bitter", serif;
    margin-top: 20px;
  }

  .kumar-font {
    font-family: "Kumar One Outline", cursive;
    font-size: 20px;
  }
  .bitter-font {
    font-family: "Bitter", serif;
    font-size: 20px;
  }
`;

const newVideos = [
  {
    source: "coyote_compressed.mov",
    label: (
      <>
        <span className="kumar-font">મ્tમ્યાંo</span>
        <span className="kumar-font">મ્યાંptમ્o</span>
        <span className="bitter-font">чел</span>
      </>
    ),
  },
  {
    source: "deer_compressed.mov",
    label: (
      <>
        <span className="kumar-font">મ્tમ્યાંo</span>
        <span className="kumar-font">મ્યાંptમ્o</span>
        <span className="bitter-font">чел</span>
      </>
    ),
  },
  {
    source: "owl_compressed.mov",
    label: (
      <>
        <span className="kumar-font">મ્tમ્યાંo</span>
        <span className="kumar-font">મ્યાંptમ્o</span>
        <span className="bitter-font">чел</span>
      </>
    ),
  },
];

export default function RoomSoundAndTouch() {
  const [selectedVideoIndex, setSelectedVideoIndex] = useState(); /* Added state to track selected video */
  const [choiceConfirmed, setChoiceConfirmed] = useState(false);

  const handleSelection = () => {
    const selectedVideo = newVideos[selectedVideoIndex];

    // const randomIndex = Math.floor(Math.random() * newVideos.length);
    // setSelectedVideo(newVideos[randomIndex]);
  };

  return (
    <RoomSoundAndTouchStyles>
      <div className="header">મ્યાંt iл a cમ્oice</div>

      {choiceConfirmed && <div>Thanks!</div>}

      {!choiceConfirmed && (
        <div className="panel">
          {newVideos.map((video, index) => {
            return (
              <SoundAndTouchVideo
                key={`video-${index}`}
                video={video}
                isCurrent={index === selectedVideoIndex}
                index={index}
                setSelectedVideoIndex={setSelectedVideoIndex}
              />
            );
          })}
        </div>
      )}

      <button type="button" className="button" onClick={() => setChoiceConfirmed(true)}>
        CલીOICE
      </button>
    </RoomSoundAndTouchStyles>
  );
}
