import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionActions from "@mui/material/AccordionActions";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function AccordionInfoProductPage(props) {
  const { label1, label2, label3, TextBlock1, TextBlock2, TextBlock3 } = props;
  return (
    <div>
      <Accordion defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          {label1}
        </AccordionSummary>
        <AccordionDetails>{TextBlock1}</AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          {label2}
        </AccordionSummary>
        <AccordionDetails>{TextBlock2}</AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3-content"
          id="panel3-header"
        >
          {label3}
        </AccordionSummary>
        <AccordionDetails>{TextBlock3}</AccordionDetails>
        <AccordionActions></AccordionActions>
      </Accordion>
    </div>
  );
}
