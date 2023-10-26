import styled from "styled-components";

const PlayFirstStyles = styled.div`
  /* max-width: 25em; */
  margin: auto;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 1em;

  .logo {
    width: 100%;
    background: transparent url("24-cover-bw.png") center no-repeat;
    background-size: contain;
    /* filter: invert(100%); */
    height: 33vh;
    margin-bottom: 3em;
  }

  h1 {
    font-size: 50px;
  }

  .blurb {
    max-width: 14em;
  }
`;

export default function PlayFirst({ firstRoom, setRoomName }) {

  return (
    <PlayFirstStyles>
      <div className="logo"></div>
      {/* <h1>24-Hour Fur Coat Store</h1> */}
      {/* <p className="blurb">
        Interactive presentation of the classic Utter album
      </p> */}
      <button type="button" onClick={() => setRoomName(firstRoom)}>Begin</button>
    </PlayFirstStyles>
  );
}
