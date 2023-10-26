import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";

const minSpeed = 10;
const maxSpeed = 20;
const maxPoison = 333;
const wormColor = 'rgba(154, 66, 66, 0.9)';

const RoomTest2Styles = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  cursor: url("/poison-white.svg"), auto;

  .drawingCounter {
    position: absolute;
    top: 2rem;
    right: 2rem;
    height: 4rem;
    background: white url("/poison.svg") left no-repeat;
    background-size: contain;
    padding: 1rem 1rem 1rem 6rem;
    color: black;
  }
  `;

const Canvas = styled.canvas`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

export default function RoomTest2() {
  const canvasRef = useRef(null);
  const canvasRefWorm = useRef(null);
  const [context, setContext] = useState(null);
  const [contextWorm, setContextWorm] = useState(null);
  
  // Default worm
  const [hasCollided, setHasCollided] = useState(false);
  const [worm, setWorm] = useState({
    x: 200,
    y: 200,
    color: wormColor,
    size: 20,
    speed: Math.random() * (maxSpeed - minSpeed) + minSpeed,
    direction: 45,
  });

  // Drawing stuff
  const [drawing, setDrawing] = useState(false);
  const [userLineColor, setUserLineColor] = useState("rgba(87, 99, 101, 0.1)");
  const [drawingCounter, setDrawingCounter] = useState(maxPoison);

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
      moveWorm();
    }, 500);

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [context, contextWorm]);

  // React to collision
  useEffect(() => {
    if (hasCollided) {      
      const canvasWidth = canvasRefWorm.current.width;
      const canvasHeight = canvasRefWorm.current.height;

      // Clear worm canvas
      contextWorm.clearRect(0, 0, canvasWidth, canvasHeight);
      let newXProb = Math.random();
      newXProb = Math.min(newXProb, 0.8);
      newXProb = Math.max(newXProb, 0.2);
      let newYProb = Math.random();
      newYProb = Math.min(newYProb, 0.8);
      newYProb = Math.max(newYProb, 0.2);
      const dpr = window.devicePixelRatio || 1;
      
      // Reset worm position with new initial values
      setWorm((prevWorm) => ({
        x: newXProb / dpr * canvasWidth,
        y: newYProb / dpr * canvasHeight,
        color: wormColor,
        size: prevWorm.size,
        speed: Math.random() * (maxSpeed - minSpeed) + minSpeed,
        direction: Math.random() * 360,
      }));
      setHasCollided(false);
    }
  }, [hasCollided, contextWorm]);

  // UNUSED: paint over drawing
  const paintOverUser = () => {
    if (!context) return; // Ensure context is available
    const dpr = window.devicePixelRatio || 1;
    const canvasWidth = canvasRef.current.width;
    const canvasHeight = canvasRef.current.height;

    const x = Math.random() * canvasWidth;
    const y = Math.random() * canvasHeight;
  
    // Write a pixel
    const imageData = context.getImageData(x, y, 1, 1);
    const data = imageData.data;  
    data[0] = 0;
    data[1] = 0;
    data[2] = 0;
    data[3] = 255;
    context.globalCompositeOperation = "source-over"; // Reset composite operation
    context.putImageData(imageData, x, y);
  }

  // Move the worm
  const moveWorm = () => {
    if (!context) return; // Ensure context is available

    // Use a callback function to ensure the state update is complete
    setWorm((prevWorm) => {
      const newWorm = { ...prevWorm };

      // Change direction at certain intervals
      if (Math.random() < 0.3) {
        const angleChange = (Math.random() - 0.44) * 60; // Random change in direction within a range
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

    // for (let i = 0; i < 10000; i++) {
    //   paintOverUser();
    // }

  };

  // Start drawing
  const handleMouseDown = (e) => {
    if (!context) return; // Ensure context is available
    setDrawing(true);
    const { offsetX, offsetY } = e.nativeEvent;
    context.beginPath();
    context.moveTo(offsetX, offsetY);
    context.strokeStyle = userLineColor;
  };

  // Draw
  const handleMouseMove = (e) => {
    if (!context || !drawing) return; // Ensure context is available
    const { offsetX, offsetY } = e.nativeEvent;
    context.lineWidth = worm.size;
    context.lineCap = "round";
    context.lineTo(offsetX, offsetY);
    context.stroke();
    setDrawingCounter(Math.max(drawingCounter - 1, 0));
  };

  // React to counter 0
  useEffect(() => {
    if (drawingCounter === 0) {
      setDrawingCounter(maxPoison);
      const canvasWidth = canvasRef.current.width;
      const canvasHeight = canvasRef.current.height;
      context.clearRect(0, 0, canvasWidth, canvasHeight);
      contextWorm.clearRect(0, 0, canvasWidth, canvasHeight);
    }
  }, [drawingCounter])

  // Stop drawing
  const handleMouseUp = () => {
    setDrawing(false);
  };

  return (
    <RoomTest2Styles>
      <Canvas
        ref={canvasRefWorm}
      />
      <Canvas
        ref={canvasRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      />
      <div className="drawingCounter">
        {drawingCounter}
      </div>
    </RoomTest2Styles>
  );
}
