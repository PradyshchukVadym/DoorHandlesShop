import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

export default function ControlledRadioButtonsGroup(props) {
  const { label1, label2, titleLable, value, onChange } = props;

  return (
    <FormControl>
      <FormLabel
        id={`${label1} + ${label2}demo-controlled-radio-buttons-group`}
      >
        {titleLable}
      </FormLabel>
      <RadioGroup
        row
        aria-labelledby={`${label1} + ${label2}demo-controlled-radi`}
        name={`${label1} + ${label2}controlled-radio-buttons-group`}
        value={value}
        onChange={onChange}
      >
        <FormControlLabel value={true} control={<Radio />} label={label1} />
        <FormControlLabel value={false} control={<Radio />} label={label2} />
      </RadioGroup>
    </FormControl>
  );
}
