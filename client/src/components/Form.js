import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import styled from "styled-components";

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  background-color: whitesmoke;
  border-radius: 5px;
  padding: 1.5rem;
`;

export default function(props) {
  const { socket } = props;
  const [values, setValues] = React.useState({
    diam: 0.02,
    pressure: 1,
    height: 67,
    gravity: 9.81
  });

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const handleSubmit = event => {
    event.preventDefault();
    console.log("submit");
    socket.emit("settings", {
        id: 1,
        data: {
          g0: values.gravity,
          height: values.height,
          diam: values.diam,
          pressure: values.pressure
        }
      });
  };

  return (
    <StyledForm>
      <TextField
        id="diam"
        label="Diameter"
        className={1}
        value={values.diam}
        onChange={handleChange("diam")}
        margin="normal"
      />
      <TextField
        id="pressure"
        label="Pritisk"
        className={1}
        value={values.pressure}
        onChange={handleChange("pressure")}
        margin="normal"
      />
      <TextField
        id="height"
        label="Height"
        className={1}
        value={values.height}
        onChange={handleChange("height")}
        margin="normal"
      />
      <TextField
        id="gravity"
        label="Gravitacija"
        className={1}
        value={values.gravity}
        onChange={handleChange("gravity")}
        margin="normal"
      />
      <input type="submit" value="Submit" onClick={e => handleSubmit(e)} />
    </StyledForm>
  );
}
