import styled from "styled-components";

const CreditsStyles = styled.div`
  position: fixed;
  background-color: rgba(0, 0, 0, 0.4);
  width: 100%;
  height: 100vh;
  top: 0;
  left: 0;
  padding: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;

  .creditsWrapper {
    width: 100%;
    max-width: 20em;
    height: auto;
    padding: 2rem;
    text-align: center;
  }
`;

export default function Credits({setCreditsVisible}) {
  <CreditsStyles>
    <div className="creditsWrapper">
      <h2>Credits</h2>
      <p>Credits go here</p>
      <p><a href="https://uttermusic.bandcamp.com">Bandcamp</a></p>
      <p>
        <button type="button" onClick={() => setCreditsVisible(false)}>Close</button>
      </p>
    </div>
  </CreditsStyles>
}