import Room from "./components/Room";
import { useState } from "react";
import RoomSwitcher from "./components/RoomSwitcher";
import './App.css';
import PlayFirst from "./components/PlayFirst";
import rooms from "./lib/rooms";
import getRandomInteger from "./lib/getRandomInteger";

function App() {
  const firstIndex = getRandomInteger(0, Object.keys(rooms).length - 1);
  const firstRoom = Object.keys(rooms)[firstIndex];

  const [roomName, setRoomName] = useState();
  const [paused, setPaused] = useState(false);
  // Keep track of what rooms left to show (since order is random)
  const [roomsLeft, setRoomsLeft] = useState(
    Object.keys(rooms).filter(r => r !== firstRoom) // Avoid repeating initial room
  );

  return (
    <div className="App">
        {roomName && <>
          <RoomSwitcher 
            roomName={roomName} 
            setRoomName={setRoomName} 
            paused={paused} 
            setPaused={setPaused} 
            roomsLeft={roomsLeft}
            setRoomsLeft={setRoomsLeft}
          />
          <Room roomName={roomName} setRoomName={setRoomName} paused={paused} />
        </>}
        {!roomName && <PlayFirst setRoomName={setRoomName} firstRoom={firstRoom} />}
    </div>
  );
}

export default App;
