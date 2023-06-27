import styled from "styled-components";
import getRandomInteger from "../lib/getRandomInteger";
import RoomWheel from "./RoomWheel";
import { useState } from "react";

const RoomSwitcherStyles = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 0;
  z-index: 1;
  background-color: black;
  transition: height 1s;
  
  .changeRoom {
    position: absolute;
    border: none;
    bottom: -2.25em;
    left: calc(50% - 1em);
    width: 3em;
    height: 2.25em;
    background: black url("/skip.svg") center no-repeat;
    background-size: 1em;
    cursor: pointer;
  }

  &.open {
    height: 250px;
  }
`;

const rooms = [
  {roomName: 'desire', label: 'Desire'},
  {roomName: 'it-shines', label: 'It Shines'},
  {roomName: 'sound-and-touch', label: 'Sound & Touch'},
]

export default function RoomSwitcher({roomName, setRoomName}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMoving, setIsMoving] = useState(false);
  const [showRoomName, setShowRoomName] = useState(roomName);
  const [roomsLeft, setRoomsLeft] = useState(Object.keys(rooms));

  const handleRoomSwitch = () => {
    if (!isOpen) {
      setIsOpen(true);
      setIsMoving(true);

      // Pick a random room
      let newIndex = getRandomInteger(0, Object.keys(rooms).length - 1);
      
      // Only one room left? Then just pick that
      if (roomsLeft.length === 1) {
        newIndex = Object.keys(rooms).indexOf(roomsLeft[0]);
        // Also set all rooms as unvisited
        setRoomsLeft(Object.keys(rooms));
      } else {
        // If rooms left doesn't include the random room, randomize again
        while (!roomsLeft.includes(Object.keys(rooms)[newIndex])) {
          newIndex = getRandomInteger(0, Object.keys(rooms).length - 1);
        }
        // Remove room from rooms left
        setRoomsLeft(roomsLeft.filter(r => r !== Object.keys(rooms)[newIndex]))
      }


      const newRoomName = rooms[newIndex].roomName;
      setShowRoomName(Object.keys(rooms)[newIndex]);
      setTimeout(() => {
        setIsMoving(false);
        setTimeout(() => {
          setRoomName(newRoomName);
          setIsOpen(false);
          setIsMoving(false);
        }, 2000);
      }, 3000);

    }
  }

  return <RoomSwitcherStyles className={isOpen ? 'open' : 'close'}>
    <RoomWheel currentRoom={showRoomName} rooms={rooms} isMoving={isMoving} />
    {!isOpen && <button className="changeRoom" onClick={handleRoomSwitch} type="button" />}
  </RoomSwitcherStyles>
}