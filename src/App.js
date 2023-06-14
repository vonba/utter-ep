import Room from "./components/Room";
import { useState } from "react";
import RoomSwitcher from "./components/RoomSwitcher";
import './App.css';

function App() {
  const [roomName, setRoomName] = useState('desire');

  return (
    <div className="App">
        <RoomSwitcher roomName={roomName} setRoomName={setRoomName} />
        <Room roomName={roomName} />
    </div>
  );
}

export default App;
