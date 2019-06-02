import React from "react";
import Form from "./Form";
import styled from "styled-components";
import Graph from "./Graph";
import ResponseInfo from './ResponseInfo'

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
        pressure: 1, //bar
        gravity: 9.81, //m/s**2
        height: 67, //m
        diam: 0.02, //m
        material: 'iron', //material of sphere
      },
      response: {
        a: null,
        v: null,
        y: null,
        t: null
      }
    };

    this.componentDidMount = this.componentDidMount.bind(this);
    this.setFormDataState = this.setFormDataState.bind(this);
    this.handleFormSend = this.handleFormSend.bind(this);
  }

  componentDidMount() {
    this.props.socket.emit("createEnviroment", { id: this.props.id });
    this.props.socket.emit("settings", {
      id: this.props.id,
      data: {
        g0: this.state.form.gravity,
        height: this.state.form.height,
        diam: this.state.form.diam,
        pressure: this.state.form.pressure,
        density:this.state.form.material,        
      }
    });

    this.props.socket.on("calculationResponse", response => {
      if (response.id === this.props.id) {
        console.log("Response! ID: ", response.id);
        console.log("Response! data: ", response.data);
        //Round the response down to 2 digits
        let t = response.data.t.map(function(each_element) {
          return Number(each_element.toFixed(2));
        });

        this.setState({
          response: {
            a: response.data.a,
            v: response.data.v,
            y: response.data.y,
            t: t
          }
        });
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
    console.log(`Sent: ${this.state.form.density}`);
    this.props.socket.emit("settings", {
      id: this.props.id,
      data: {
        g0: this.state.form.gravity,
        height: this.state.form.height,
        diam: this.state.form.diam,
        pressure: this.state.form.pressure,
        density: this.state.form.material,  
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
        {this.state.response.t !== null && (
          <Graph
            id={"acceleration"}
            x={this.state.response.t}
            y={this.state.response.a}
            title={"Pospešek"}
            
          />
        )}
        {this.state.response.t !== null && (
          <Graph
            id={"acceleration"}
            x={this.state.response.t}
            y={this.state.response.v}
            title={"Hitrost"}
          />
        )}
        {this.state.response.t !== null && (
          <Graph
            id={"acceleration"}
            x={this.state.response.t}
            y={this.state.response.y}
            title={"Pot"}
            ticks
          />
        )}
        {this.state.response.t !== null && (
          <ResponseInfo
            id={"responseInfo"}
            t={this.state.response.t[this.state.response.t.length - 1]}
            y={this.state.response.y[this.state.response.y.length - 1]}
            v={this.state.response.v[this.state.response.v.length - 1]}            
          />
        )}
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
