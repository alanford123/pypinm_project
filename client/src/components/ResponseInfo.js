import React from "react";
import styled from "styled-components";

const StyledWrapper = styled.div`
  min-height: 50px;
  background-color: whitesmoke;
  border-radius: 5px;
  margin: 0.5rem 0;
  padding: 0.3rem 1rem;
  p {
    color: black;
    margin: 0;
    text-align: left;
    margin: 0.2rem 0;
    font-size: 0.8rem;
  }
`;

export default function(props) {
  return (
    <StyledWrapper>
      <p>Prepotovana pot: {props.y.toFixed(2)}m</p>
      <p>Končna hitrost: {props.v.toFixed(2)}m/s</p>
      <p>Čas padca: {props.t.toFixed(2)}s</p>
    </StyledWrapper>
  );
}
