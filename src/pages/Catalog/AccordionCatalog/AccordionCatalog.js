import "./AccordionCatalog.css";
import { useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export const AccordionCatalog = (props) => {
  const { label, component } = props;
  return (
    <div>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>{label}</Typography>
        </AccordionSummary>
        <AccordionDetails>{component}</AccordionDetails>
      </Accordion>
    </div>
  );
};
