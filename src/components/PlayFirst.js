import styled from "styled-components";

const PlayFirstStyles = styled.div`
  max-width: 25em;
  margin: auto;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;

  .logo {
    width: 100%;
    background: transparent url("24-cover-bw.png") center no-repeat;
    background-size: contain;
    /* filter: invert(100%); */
    height: 25em;
    margin-bottom: 4em;
  }

  button {
    width: 15em;
    background: white;
    border: 2px solid white;
    color: black;
    transition: all 1s;
    cursor: pointer;
    text-transform: uppercase;
    padding: 1em 2em;
    font-weight: bold;
    margin-top: 2em;

    &:hover {
      background-color: black;
      color: white;
    }
  }
`;

export default function PlayFirst({ firstRoom, setRoomName }) {

  return (
    <PlayFirstStyles>
      <div className="logo"></div>
      <h1>24-Hour Fur Coat Store</h1>
      <p>
        Interactive presentation of the classic Utter album
      </p>
      <button type="button" onClick={() => setRoomName(firstRoom)}>Begin</button>
    </PlayFirstStyles>
  );
}
