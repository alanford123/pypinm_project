import React from "react";
import Form from "./Form";
import styled from 'styled-components'

const StyledContainer = styled.div`
padding:0 2rem;
`

export default class Enviroment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pressure: 1, //bar
      gravity: 9.81, //m/s**2
      height: 67, //m
      diam: 0.02 //m
    };

    this.componentDidMount = this.componentDidMount.bind(this);
  }

  componentDidMount() {
    this.props.socket.emit("createEnviroment", { id: this.props.id });
  }

  render() {
    return (
      <StyledContainer>
        HI
        <Form socket={this.props.socket} />
      </StyledContainer>
    );
  }
}
