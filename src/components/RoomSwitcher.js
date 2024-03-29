import styled from "styled-components";
import getRandomInteger from "../lib/getRandomInteger";
import RoomWheel from "./RoomWheel";
import { useState } from "react";
import rooms from "../lib/rooms";
import { useEffect } from "react";

const RoomSwitcherStyles = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 0;
  z-index: 1;
  background-color: black;
  transition: height 1s;
  
  .buttons {
    position: absolute;
    text-align: center;
    width: 100%;
  }

  .label {
    @media (max-width: 800px) {
      display: none;
    }
  }
  
  .nowPlaying,
  button {
    font-size: 0.8em;
    vertical-align: top;
    font-weight: 200;
    display: inline-block;
    border: none;
    /* bottom: -2.25em; */
    width: auto;
    height: 2.5em;
    cursor: pointer;
    color: white;
    padding: 0.5em 1em;
    margin-left: 1px;
    margin-top: 0;
    border: 1px solid transparent;   
    background-color: black;
    text-transform: uppercase; 
    
    @media (max-width: 800px) {
      font-size: 0.7em;
    }
  }
  
  button {
    background: black url("/skip.svg") calc(100% - 1em) center no-repeat;
    background-size: 1em;
  }

  button:hover {
    border-color: white;
  }

  .about {
    background-image: none;
    font-weight: bold;
  }
  
  .changeRoom {
    background-image: url("/skip.svg");
    padding-left: 2.3em;
    background-size: 1.3em;
  }
  
  .pause {
    padding-left: 2.3em;
    background-size: 1.3em;
    background-image: url("/pause.svg");
    
    &.paused {
      background-image: url("/play.svg");
    }
  }

  &.open {
    height: 350px;
  }
`;

export default function RoomSwitcher({
  roomName, 
  setRoomName, 
  paused, 
  setPaused, 
  roomsLeft, 
  setRoomsLeft,
  ended,
  setEnded,
  creditsVisible,
  setCreditsVisible
}) {
  // General state of switcher
  const [isOpen, setIsOpen] = useState(false);
  const [isMoving, setIsMoving] = useState(false);
  const [nextRoomName, setNextRoomName] = useState(roomName);

  useEffect(() => {
    if (ended) {
      handleRoomSwitch();
      setEnded(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ended])

  // Switch to a new random room
  const handleRoomSwitch = () => {
    if (!isOpen) {
      // No rooms left? Show credits
      if (!roomsLeft.length) {
        setCreditsVisible(true);
        return;
      }
      
      setIsOpen(true);
      setIsMoving(true);

      // Pick a random room
      let newIndex = getRandomInteger(0, Object.keys(rooms).length - 1);
      
      // Only one room left? Then just pick that
      if (roomsLeft.length === 1) {
        newIndex = Object.keys(rooms).indexOf(roomsLeft[0]);
        setRoomsLeft([]);
      } else {
        // If we already visited the random room, randomize again
        while (
          !roomsLeft.includes(Object.keys(rooms)[newIndex])
        ) {
          newIndex = getRandomInteger(0, Object.keys(rooms).length - 1);
        }
        // Remove room from rooms left
        setRoomsLeft(roomsLeft.filter(r => r !== Object.keys(rooms)[newIndex]))
      }

      const newRoomName = Object.keys(rooms)[newIndex];
      setNextRoomName(newRoomName);
      setTimeout(() => {
        setIsMoving(false);
        setTimeout(() => {
          setPaused(false);
          setRoomName(newRoomName);
          setIsOpen(false);
          setIsMoving(false);
        }, 2000);
      }, 3000);

    }
  }

  // Pause/play
  const handlePause = () => {
    setPaused(!paused);
  }

  return <RoomSwitcherStyles className={isOpen ? 'open' : 'close'}>
    <RoomWheel currentRoom={nextRoomName} rooms={rooms} isMoving={isMoving} />
    {!isOpen && <div className="buttons">
        <span className="nowPlaying">
          <span className="label">Now playing: </span>
          {rooms[roomName].label}
        </span>
        <button className={`pause ${paused ? 'paused' : ''}`} onClick={handlePause} type="button"/>
        <button className={`changeRoom ${paused ? 'paused' : ''}`} onClick={handleRoomSwitch} type="button" />
        <button className="about" onClick={() => setCreditsVisible(true)} type="button">?</button>
      </div>
    }
  </RoomSwitcherStyles>
}