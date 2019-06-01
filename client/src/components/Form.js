import React from "react";
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
  const { socket, setFormData, formData, formSend } = props;

  function handleChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.id;
    setFormData(name, value);
  }

  return (
    <StyledForm>
      <TextField
        id="diam"
        label="Diameter"
        className={1}
        value={formData.diam}
        onChange={e => handleChange(e)}
        margin="normal"
      />
      <TextField
        id="pressure"
        label="Pritisk"
        className={1}
        value={formData.pressure}
        onChange={handleChange}
        margin="normal"
      />
      <TextField
        id="height"
        label="Height"
        className={1}
        value={formData.height}
        onChange={handleChange}
        margin="normal"
      />
      <TextField
        id="gravity"
        label="Gravitacija"
        className={1}
        value={formData.gravity}
        onChange={handleChange}
        margin="normal"
      />
      <input type="submit" value="Submit" onClick={e => formSend(e)} />
    </StyledForm>
  );
}
