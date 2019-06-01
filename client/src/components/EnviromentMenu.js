import React from "react";
import Fab from "@material-ui/core/Fab";
import Box from "@material-ui/core/Box";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import styled from 'styled-components'

const StyledWrapper = styled(Box)`
position:absolute;
top:2rem;
display:flex;
min-width:200px;
justify-content:space-evenly;
`
const StyledFab = styled(Fab)`
margin-right:2rem;
`

export default function(props) {
  return (
    <StyledWrapper color="text.primary">
      <StyledFab color="default" aria-label="Add" className={2} onClick={()=>props.addEnviroment()}>
        <AddIcon />
      </StyledFab>
      <StyledFab color="default" aria-label="Add" className={2} onClick={()=>props.removeEnviroment()}>
        <RemoveIcon />
      </StyledFab>
    </StyledWrapper>
  );
}
