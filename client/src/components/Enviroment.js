import React from "react";
import Form from "./Form";
import styled from "styled-components";
import Graph from "./Graph";

const StyledContainer = styled.div`
  padding: 0 2rem;
  flex: 1 1 400px;
  max-width: 400px;
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
      },
      response: {
          a:null,
          v:null,
          y:null,
          t:null
      }
    };

    this.componentDidMount = this.componentDidMount.bind(this);
    this.setFormDataState = this.setFormDataState.bind(this);
    this.handleFormSend = this.handleFormSend.bind(this);
  }

  componentDidMount() {
    this.props.socket.emit("createEnviroment", { id: this.props.id });
    this.props.socket.on("calculationResponse", (response) => {        
        if(response.id === this.props.id){
            console.log("Response! ID: ", response.id);
           this.setState({response:{
               a:response.data.a,
               v:response.data.v,
               y:response.data.y,
               t:response.data.t,
           }})
        }

    });
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

  startCalculation = event => {
    event.preventDefault();
    console.log("starting calculation");
    this.props.socket.emit("startCalculation", {
      id: this.props.id
    });
  };

  render() {
    return (
      <StyledContainer>
        {this.state.response.t !== null && <Graph id={'acceleration'} x={this.state.response.t} y={this.state.response.a} />}
        <Form
          socket={this.props.socket}
          setFormData={this.setFormDataState}
          formData={this.state.form}
          formSend={this.handleFormSend}
          startCalculation={this.startCalculation}
        />
      </StyledContainer>
    );
  }
}
