import React from "react";
import Fab from "@material-ui/core/Fab";
import Box from "@material-ui/core/Box";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";

export default function(props) {
  return (
    <Box color="text.primary">
      <Fab color="primary" aria-label="Add" className={2} onClick={()=>props.addEnviroment()}>
        <AddIcon />
      </Fab>
      <Fab color="primary" aria-label="Add" className={2} onClick={()=>props.removeEnviroment()}>
        <DeleteIcon />
      </Fab>
    </Box>
  );
}
