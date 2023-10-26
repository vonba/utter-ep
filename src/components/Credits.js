import styled from "styled-components";

const CreditsStyles = styled.div`
  @keyframes fade-in {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  @keyframes rotate-in {
    0% {
      transform: scale(0.93);
    }
    100% {
      transform: scale(1);
    }
  }

  position: fixed;
  z-index: 99;
  /* background-color: rgba(0, 0, 0, 0.6); */
  background-color: black;
  width: 100%;
  height: 100vh;
  top: 0;
  left: 0;
  padding: 1em;
  display: flex;
  justify-content: center;
  align-items: center;
  /* animation: fade-in 1s; */

  header {
    margin-bottom: 2em;
  }

  h2, h3 {
    font-weight: 200;
  }

  h2 {
    font-size: 50px;
    margin: 0 auto 0.25em auto;
    @media (max-width: 800px) {
      max-width: 5em;
    }
  }

  .creditsWrapper {
    /* background-color: black; */
    width: 100%;
    height: auto;
    padding: 2em;
    text-align: center;
    animation: rotate-in 6s, fade-in 4s;
    max-height: 100%;
    overflow-y: auto;
    
    p {
      max-width: 26em;
      margin-left: auto;
      margin-right: auto;
    }
  }

  button {
    background-color: black;
    color: white;
    
    &:hover {
      background-color: white;
      color: black;
    }
  }
`;

export default function Credits({setCreditsVisible}) {
  return <CreditsStyles>
    <div className="creditsWrapper">
      <header>
        <h2>24-Hour Fur Coat Store</h2>
        <h3>by UTTER</h3>
      </header>
      <p>
        This music was produced independently and is not on Spotify or any other major platform
      </p>
      <p>
        If you want to support the project or need a download you can buy the tracks on <a href="https://uttermusic.bandcamp.com">Bandcamp</a>
      </p>
      <p>
        Live shows will be announced on <a href="https://instagram.com/uttermusic">@uttermusic</a>
      </p>
      <p>
        Music by Tom Kearney and Simon Balthazar<br />
        Videos by Miguel Jara<br />
        Coding by Simon Balthazar
      </p>
      <p>
        Bookings/press <a href="mailto:hola@utter.band">hola@utter.band</a>
      </p>
      <p>
        <button type="button" onClick={() => setCreditsVisible(false)}>yes</button>
      </p>
    </div>
  </CreditsStyles>
}