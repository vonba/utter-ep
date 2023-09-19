import Room from "./components/Room";
import { useState } from "react";
import RoomSwitcher from "./components/RoomSwitcher";
import './App.css';
import PlayFirst from "./components/PlayFirst";

const firstRoom = 'desire';

function App() {
  const [roomName, setRoomName] = useState();
  const [paused, setPaused] = useState(false);

  return (
    <div className="App">
        {roomName && <>
          <RoomSwitcher roomName={roomName} setRoomName={setRoomName} paused={paused} setPaused={setPaused} />
          <Room roomName={roomName} setRoomName={setRoomName} paused={paused} />
        </>}
        {!roomName && <PlayFirst setRoomName={setRoomName} firstRoom={firstRoom} />}
    </div>
  );
}

export default App;
