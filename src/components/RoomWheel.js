import styled from "styled-components";

const RoomWheelStyles = styled.div`
  text-align: center;
  height: 100%;
  width: 100%;
  overflow: hidden;

  .wrapper {
    display: inline-block;
    width: 250px;
    height: 250px;
    left: calc(50% - 125px);
    top: 1rem;
  }

  .slice {
    border: 2px solid white;
    padding: 1rem 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    white-space: nowrap;
    transition: transform 3s, opacity 1s;
    color: white;
    opacity: 0;

    &.isMoving {
      opacity: 1;
    }

    &.current {
      color: red;
      border-color: red;
      opacity: 1;

      &:not(.isMoving) {
        transition: transform 1s, opacity 1s;
        transform: none !important;
      }
    }
  }
`;

export default function RoomWheel({ currentRoom, rooms, isMoving }) {
  const sliceAngle = 360 / rooms.length;
  const offset = Object.keys(rooms).indexOf(currentRoom);

  return (
    <RoomWheelStyles>
      <div className="wrapper">
        {rooms.map((room, index) => (
          <div
            className={`slice ${index === offset ? 'current' : ''} ${isMoving ? 'isMoving' : ''}`}
            key={room.roomName}
            style={{
              transform: `rotate(${sliceAngle * (index + offset)}deg)`,
            }}
          >
            {room.label}
          </div>
        ))}
      </div>
    </RoomWheelStyles>
  );
}
