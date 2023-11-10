import React, { useEffect, useRef } from "react";
import { useState } from "react";
import styled from "styled-components";
import { LyricsContainer } from "../lib/useEvents";

const lines = [
  {start: {m: 0, s: 13}, durationMs: 1000,  text: 'Attack yourself', class: ''},
  {start: {m: 0, s: 17}, durationMs: 1000,  text: 'Attack yourself', class: ''},
  {start: {m: 0, s: 22}, durationMs: 1500,  text: 'Baby I’m going insane', class: 'shake'},
  {start: {m: 0, s: 32}, durationMs: 2000,  text: 'Lap dance and carnage / For a wild eyed amateur', class: 'huge'},
  {start: {m: 0, s: 36}, durationMs: 2000,  text: 'Moved to the city / With vague plans of luck', class: 'huge'},
  {start: {m: 0, s: 39}, durationMs: 3000,  text: 'Of rotten rags to red riches / Of a scandalous ascent', class: 'huge'},
  {start: {m: 0, s: 42}, durationMs: 1000,  text: 'If you touch me I’ll scream', class: 'huge'},
  {start: {m: 0, s: 49}, durationMs: 1500,  text: 'Collecting dividends in hot tubs', class: 'shake'},
  {start: {m: 0, s: 51}, durationMs: 1500,  text: 'Reaching out for the stars', class: 'shake'},
  {start: {m: 0, s: 54}, durationMs: 1500,  text: 'Until the rusty stairs collapse', class: 'shake'},
  {start: {m: 1, s: 21}, durationMs: 800,  text: 'The killer is on the phone', class: ''},
  {start: {m: 1, s: 23}, durationMs: 800,  text: 'The killer is on the phone', class: 'shake'},
  {start: {m: 1, s: 25}, durationMs: 800,  text: 'The killer is on the phone', class: ''},
  {start: {m: 1, s: 28}, durationMs: 800,  text: 'The killer is on the phone', class: ''},
  {start: {m: 1, s: 30}, durationMs: 800,  text: 'The killer is on the phone', class: ''},
  {start: {m: 1, s: 40}, durationMs: 1500,  text: 'I’ve lost myself', class: ''},
  {start: {m: 1, s: 45}, durationMs: 1500,  text: 'I’ve lost myself', class: 'huge'},
  {start: {m: 1, s: 50}, durationMs: 800,  text: 'The killer is on the phone', class: ''},
  {start: {m: 1, s: 53}, durationMs: 800,  text: 'The killer is on the phone', class: ''},
  {start: {m: 1, s: 55}, durationMs: 800,  text: 'The killer is on the phone', class: 'shake'},
  {start: {m: 1, s: 57}, durationMs: 800,  text: 'The killer is on the phone', class: 'shake'},
  {start: {m: 1, s: 59}, durationMs: 1200,  text: 'The killer is on the phone', class: 'huge'},
]

const RoomKillerStyles = styled.div`
  position: absolute;
  top: 20vh;
  /* height: 50vh; */
  display: flex;
  justify-content: space-evenly;
  width: 100%;
`;

const CanvasContainer = styled.div`
  width: 25%;
  /* height: 25%; */
  animation: pulsate 0.588s linear infinite; /* 102 bpm */

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(ellipse at center, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 70%);
    opacity: 0.7;
    z-index: 1;
    pointer-events: none;
    width: 89%;
  }

  @keyframes pulsate {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.2);
    }
    100% {
      transform: scale(1);
    }
  }

  @keyframes noise {
    0% {
      transform: translate(0, 0);
    }
    10% {
      transform: translate(-5%, -5%);
    }
    20% {
      transform: translate(5%, 5%);
    }
    30% {
      transform: translate(-5%, 5%);
    }
    40% {
      transform: translate(5%, -5%);
    }
    50% {
      transform: translate(0, 0);
    }
    100% {
      transform: translate(0, 0);
    }
  }
`;

const RoomKiller = ({roomVideoPosition}) => {
  const [cameraReady, setCameraReady] = useState(false);
  const canvasRef1 = useRef();
  const canvasRef2 = useRef();

  // Camera stuff
  useEffect(() => {
    startCamera();
  });

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      const video = document.createElement("video");
      setCameraReady(true);

      video.srcObject = stream;
      video.play();

      const canvas1 = canvasRef1.current;
      const ctx1 = canvas1.getContext("2d");

      const canvas2 = canvasRef2.current;
      const ctx2 = canvas2.getContext("2d");

      let lastFrame;

      const renderFrame = () => {
        // Get the video image data
        ctx1.drawImage(video, 0, 0, canvas1.width, canvas1.height);

        // Apply the effect to the first canvas
        applyEffect(ctx1, canvas1.width, canvas1.height);

        // Flip the second canvas horizontally
        ctx2.save();
        ctx2.scale(-1, 1);
        ctx2.drawImage(video, -canvas2.width, 0, canvas2.width, canvas2.height);
        ctx2.restore();

        // Apply the effect to the second canvas
        applyEffect(ctx2, canvas2.width, canvas2.height);

        // Store the current frame for the next iteration
        lastFrame = requestAnimationFrame(renderFrame);
      };

      const applyEffect = (ctx, width, height) => {
        const imageData = ctx.getImageData(0, 0, width, height);
        const data = imageData.data;

        for (let i = 0; i < data.length; i += 4) {
          data[i] = 255 - data[i]; // Red
          data[i + 1] = 255 - data[i + 1]; // Green
          data[i + 2] = 255 - data[i + 2]; // Blue
        }

        ctx.putImageData(imageData, 0, 0);
      };

      video.addEventListener("loadedmetadata", () => {
        canvas1.width = canvas2.width = video.videoWidth / 2;
        canvas1.height = canvas2.height = video.videoHeight / 2;
        lastFrame = requestAnimationFrame(renderFrame);
      });

      return () => {
        video.srcObject.getTracks().forEach((track) => track.stop());
        cancelAnimationFrame(lastFrame);
      };
    } catch (error) {
      console.error("Error accessing camera:", error);
    }
  };

  return (
    <RoomKillerStyles>
      {cameraReady && <>
        <CanvasContainer>
          <canvas ref={canvasRef1} />
        </CanvasContainer>
        <CanvasContainer>
          <canvas ref={canvasRef2} />
        </CanvasContainer>
      </>}
      <LyricsContainer 
        lines={lines}
        roomVideoPosition={roomVideoPosition}
      />
    </RoomKillerStyles>
  );
};

export default RoomKiller;
