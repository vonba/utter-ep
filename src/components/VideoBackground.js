import styled from "styled-components";
import { useEffect, useRef, useState } from "react";

const VideoBackgroundStyles = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  background-color: black;

  video {
    object-fit: cover;
    width: 100%;
    height: 100%;
    background: black url("/24-cover-bw.png") center no-repeat;
    background-size: contain;
  }
`;

export default function VideoBackground({
  videoName, paused, handleVideoEnd, videoStyles, videoBgStyles, setVideoStyles, setVideoBgStyles,
}) {
  const videoRef = useRef(null);
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    const videoElement = videoRef.current;

    if (videoLoaded) {
      if (paused) {
        videoElement.pause();
      } else {
        videoElement.play();
      }
    }
  }, [paused, videoLoaded]);

  useEffect(() => {
    const videoElement = videoRef.current;

    const handleLoadedData = () => {
      // Reset video styles when loading new video
      setVideoStyles({});
      setVideoBgStyles({});
      setVideoLoaded(true);
    };

    const handleVideoEnded = () => {
      handleVideoEnd();
    };

    videoElement.addEventListener('loadeddata', handleLoadedData);
    videoElement.addEventListener('ended', handleVideoEnded);

    // Clean up event listeners when the component unmounts
    return () => {
      videoElement.removeEventListener('loadeddata', handleLoadedData);
      videoElement.removeEventListener('ended', handleVideoEnded);
    };
  }, [handleVideoEnd]);

  return <VideoBackgroundStyles style={videoBgStyles}>
    <video style={videoStyles} ref={videoRef} autoPlay={true} src={`${process.env.PUBLIC_URL}/video/${videoName}`} poster={`${process.env.PUBLIC_URL}/24-cover-bw.png`} />
    {/* <video autoPlay={true} src={`${process.env.PUBLIC_URL}/video/${videoName}`} /> */}
  </VideoBackgroundStyles>
}
