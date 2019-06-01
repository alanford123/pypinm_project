import React from "react";
import Form from "./Form";
import styled from "styled-components";

const StyledContainer = styled.div`
  padding: 0 2rem;
`;

export default class Enviroment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        pressure: 3, //bar
        gravity: 9.81, //m/s**2
        height: 67, //m
        diam: 0.02 //m
      }
    };

    this.componentDidMount = this.componentDidMount.bind(this);
    this.setFormDataState = this.setFormDataState.bind(this)
    this.handleFormSend = this.handleFormSend.bind(this)
  }

  componentDidMount() {
    this.props.socket.emit("createEnviroment", { id: this.props.id });
  }

  setFormDataState(property, value) {
    this.setState(prevState => ({
      ...prevState,
      form: {
        ...prevState.form,
        [property]: value
      }
    }));
  }

  handleFormSend = event => {
    event.preventDefault();
    console.log("submit");
    this.props.socket.emit("settings", {
        id: this.props.id,
        data: {
          g0: this.state.form.gravity,
          height: this.state.form.height,
          diam: this.state.form.diam,
          pressure: this.state.form.pressure
        }
      });
  };

  render() {
    return (
      <StyledContainer>
        <Form socket={this.props.socket} setFormData={this.setFormDataState} formData={this.state.form} formSend={this.handleFormSend} />
      </StyledContainer>
    );
  }
}
