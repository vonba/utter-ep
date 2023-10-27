import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";

const minSpeed = 8;
const maxSpeed = 15;
const maxPoison = 444;
const wormColor = 'rgba(154, 66, 66, 0.9)';
const lineColor = "rgba(87, 99, 101, 0.1)";
const wormSize = 20;

const RoomTest2Styles = styled.div`
  @keyframes pulsate {
    0% {
      transform: scale(1);
      opacity: 0.8;
    }
    50% {
      transform: scale(1.1);
      opacity: 1;
    }
    100% {
      transform: scale(1);
      opacity: 0.8;
    }
  }

  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  cursor: url("/poison-white.svg"), auto;

  .drawingCounter {
    top: 0;
    left: 0;
    background: white url("/poison.svg") left no-repeat;

    @media (max-width: 800px) {
      top: unset;
      bottom: 0;
    }
  }
  .collisions {
    margin: 0;
    top: 4rem;
    left: 0;
    background: rgba(154, 66, 66, 0.9) url("/bug-bw.svg") 0.25em no-repeat;
    border: none;

    @media (max-width: 800px) {
      top: unset;
      bottom: 4rem;
    }
  }

  .counter {
    position: absolute;
    height: 4rem;
    background-size: 3em;
    text-align: right;
    padding: 1rem;
    color: black;
    line-height: 2.2rem;
    width: 6rem;
  }

  &.outOfPoison {
    .collisions {
      cursor: pointer;
      animation: pulsate infinite 2s;
      width: 10em;
      height: 10em;
      left: calc(50% - 5em);
      top: calc(50% - 5em);
      color: white;
      font-size: 2rem;
      padding: 2em;
      background-position: 2em center;
    }
  }
`;

const Canvas = styled.canvas`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const getNewWormCoordinates = (canvasWidth, canvasHeight) => {
  let newXProb = Math.random();
  newXProb = Math.min(newXProb, 0.8);
  newXProb = Math.max(newXProb, 0.2);
  let newYProb = Math.random();
  newYProb = Math.min(newYProb, 0.8);
  newYProb = Math.max(newYProb, 0.2);
  const dpr = window.devicePixelRatio || 1;
  const x = newXProb / dpr * canvasWidth;
  const y = newYProb / dpr * canvasHeight;
  return {x, y};
}

export default function RoomTest2() {
  const canvasRef = useRef(null);
  const canvasRefWorm = useRef(null);
  const [context, setContext] = useState(null);
  const [contextWorm, setContextWorm] = useState(null);

  // Default worm
  const [hasCollided, setHasCollided] = useState(false);
  const [collisions, setCollisions] = useState(0);
  const [worm, setWorm] = useState({
    x: (window.innerWidth || document.documentElement.clientWidth) / 2,
    y: (window.innerHeight || document.documentElement.clientHeight) / 2,
    color: wormColor,
    size: wormSize,
    speed: Math.random() * (maxSpeed - minSpeed) + minSpeed,
    direction: 45,
  });

  // Drawing stuff
  const [drawing, setDrawing] = useState(false);
  const [userLineColor, setUserLineColor] = useState(lineColor);
  const [drawingCounter, setDrawingCounter] = useState(0);

  // Set up canvases
  useEffect(() => {
    const canvas = canvasRef.current;
    const canvasWorm = canvasRefWorm.current;
    const ctx = canvas.getContext("2d");
    const ctxWorm = canvasWorm.getContext("2d");
    setContext(ctx);
    setContextWorm(ctxWorm);

    // Set up high-resolution canvas
    const dpr = window.devicePixelRatio || 1;
    canvas.width = canvas.clientWidth * dpr;
    canvas.height = canvas.clientHeight * dpr;
    canvasWorm.width = canvas.clientWidth * dpr;
    canvasWorm.height = canvas.clientHeight * dpr;
    ctx.scale(dpr, dpr);
    ctxWorm.scale(dpr, dpr);

    // Start the worm movement
    const intervalId = setInterval(() => {
      setDrawingCounter(counter => {
        if(counter > 0) moveWorm();
        return counter;
      })
    }, 200);

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [context, contextWorm]);

  // React to collision
  useEffect(() => {
    if (hasCollided) {      
      const canvasWidth = canvasRefWorm.current.width;
      const canvasHeight = canvasRefWorm.current.height;

      setCollisions(collisions + 1);

      // Clear worm canvas
      contextWorm.clearRect(0, 0, canvasWidth, canvasHeight);
      const {x, y} = getNewWormCoordinates(canvasWidth, canvasHeight);
      
      // Reset worm position with new initial values
      setWorm((prevWorm) => ({
        x,
        y,
        color: wormColor,
        size: wormSize,
        speed: Math.random() * (maxSpeed - minSpeed) + minSpeed,
        direction: Math.random() * 360,
      }));
      setHasCollided(false);
    }
  }, [hasCollided, contextWorm]);

  // Move the worm
  const moveWorm = () => {
    if (!context) return; // Ensure context is available
    
    // Use a callback function to ensure the state update is complete
    setWorm((prevWorm) => {
      const newWorm = { ...prevWorm };

      // Change direction at certain intervals
      if (Math.random() < 0.2) {
        const angleChange = (Math.random() - 0.34) * 60; // Random change in direction within a range
        newWorm.direction += angleChange;
      }

      // Calculate new coordinates based on direction and speed
      newWorm.x += Math.cos(newWorm.direction) * newWorm.speed;
      newWorm.y += Math.sin(newWorm.direction) * newWorm.speed;

      // Handle boundary conditions
      const canvasWidth = canvasRefWorm.current.width;
      const canvasHeight = canvasRefWorm.current.height;

      if (newWorm.x < 0 || newWorm.x > canvasWidth) {
        // Bounce off the left or right boundary
        newWorm.direction = 180 - newWorm.direction;
      }

      if (newWorm.y < 0 || newWorm.y > canvasHeight) {
        // Bounce off the top or bottom boundary
        newWorm.direction = -newWorm.direction;
      }

      // Draw the worm
      contextWorm.fillStyle = newWorm.color;
      contextWorm.beginPath();
      contextWorm.arc(newWorm.x, newWorm.y, newWorm.size, 0, 2 * Math.PI);
      contextWorm.fill();

      // == detect collision ==
      // Convert coordinates to integers
      const dpr = window.devicePixelRatio || 1;
      const xInt = Math.round(newWorm.x * dpr);
      const yInt = Math.round(newWorm.y * dpr);
      
      // Get pixel color on the main canvas at the worm's position
      const ctx = canvasRef.current.getContext("2d");
      const imageData = ctx.getImageData(xInt, yInt, 1, 1).data;
      
      const isHit = imageData[0] !== 0; // Non-black colour detected
      // const isHit = imageData[0] === 255 && imageData[1] === 192 && imageData[2] === 203; // Pink color
      if (isHit) {
        setHasCollided(true);
      }

      return newWorm;
    });
  };

  // Start drawing
  const handleMouseDown = (e) => {
    if (!context || drawingCounter === 0) return; // Ensure context is available
    setDrawing(true);
    const { offsetX, offsetY } = e.nativeEvent;
    context.beginPath();
    context.moveTo(offsetX, offsetY);
    context.strokeStyle = userLineColor;
  };

  // Draw
  const handleMouseMove = (e) => {
    if (drawingCounter === 0) setDrawing(false);
    if (!context || !drawing || drawingCounter === 0) return; // Ensure context is available
    const { offsetX, offsetY } = e.nativeEvent;
    context.lineWidth = wormSize;
    context.lineCap = "round";
    context.lineTo(offsetX, offsetY);
    context.stroke();
    setDrawingCounter(Math.max(drawingCounter - 1, 0));
  };

  const handleTouchStart = (e) => {
    e.preventDefault();
    const touch = e.touches[0];
    handleMouseDown({ nativeEvent: { offsetX: touch.clientX, offsetY: touch.clientY } });
  };

  const handleTouchMove = (e) => {
    e.preventDefault();
    const touch = e.touches[0];
    handleMouseMove({ nativeEvent: { offsetX: touch.clientX, offsetY: touch.clientY } });
  };

  const handleTouchEnd = () => {
    handleMouseUp();
  };

  // React to counter 0
  useEffect(() => {
    if (drawingCounter === 0) {
      const canvasWidth = canvasRef.current.width;
      const canvasHeight = canvasRef.current.height;
      if (!context) return;
      context.clearRect(0, 0, canvasWidth, canvasHeight);
      contextWorm.clearRect(0, 0, canvasWidth, canvasHeight);
    }
  }, [drawingCounter])

  const resetCounters = () => {
    if (drawingCounter === 0) {
      setCollisions(0)
      setDrawingCounter(maxPoison);
    }
  }

  // Stop drawing
  const handleMouseUp = () => {
    setDrawing(false);
  };

  return (
    <RoomTest2Styles className={drawingCounter === 0 ? 'outOfPoison' : ''}>
      <Canvas
        ref={canvasRefWorm}
      />
      <Canvas
        ref={canvasRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      />
      <div className="counter drawingCounter">
        {drawingCounter}
      </div>
      <button className="counter collisions" onClick={resetCounters}>
        {collisions}
      </button>
    </RoomTest2Styles>
  );
}
