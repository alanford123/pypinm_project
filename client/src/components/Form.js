import React from "react";
import TextField from "@material-ui/core/TextField";
import styled from "styled-components";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  background-color: whitesmoke;
  border-radius: 5px;
  padding: 1.5rem;
`;

export default function(props) {
  const { socket, setFormData, formData, formSend, startCalculation } = props;

  function handleChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    setFormData(name, value);
  }

  return (
    <StyledForm>
      <TextField
        id="diam"
        name="diam"
        label="Diameter [m]"
        className={1}
        value={formData.diam}
        onChange={e => handleChange(e)}
        margin="normal"
      />
      <TextField
        id="pressure"
        name="pressure"
        label="Pritisk [bar]"
        className={1}
        value={formData.pressure}
        onChange={handleChange}
        margin="normal"
      />
      <TextField
        id="height"
        name="height"
        label="Višina [m]"
        className={1}
        value={formData.height}
        onChange={handleChange}
        margin="normal"
      />
      <TextField
        id="gravity"
        name="gravity"
        label="Gravitacija [m/s^2]"
        className={1}
        value={formData.gravity}
        onChange={handleChange}
        margin="normal"
      />
      <FormControl>
        <InputLabel htmlFor="material">Material</InputLabel>
        <Select
          id="material"
          name="material"
          value={formData.material}
          onChange={handleChange}
          inputProps={{
            name: "material",
            id: "material"
          }}
          style={{textAlign:'left'}}
        >
          <MenuItem value={"iron"}>Železo [7874 kg/m^3]</MenuItem>
          <MenuItem value={"aluminum"}>Aluminij [2700 kg/m^3]</MenuItem>
          <MenuItem value={"lead"}>Svinec [11340 kg/m^3]</MenuItem>
          <MenuItem value={"paper"}>Papir [700 kg/m^3]</MenuItem>
          <MenuItem value={"snow"}>Sneg [560 kg/m^3]</MenuItem>
          <MenuItem value={"wool"}>Volna [100 kg/m^3]</MenuItem>
          <MenuItem value={"rubber"}>Guma [1100 kg/m^3]</MenuItem>
        </Select>
      </FormControl>
      <input
        type="submit"
        value="Pošlji nastavitve"
        onClick={e => formSend(e)}
        style={{ marginBottom: "0.5rem", marginTop: "1rem" }}
      />

      <input
        type="submit"
        value="Izračunaj"
        onClick={e => startCalculation(e)}
      />
    </StyledForm>
  );
}
