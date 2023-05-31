import styled from "styled-components";

const VideoBackgroundStyles = styled.div`
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
`;

export default function VideoBackground({videoName}) {
  return <VideoBackgroundStyles>
    <video autoPlay={true} src={`${process.env.PUBLIC_URL}/video/${videoName}`} />
  </VideoBackgroundStyles>
}