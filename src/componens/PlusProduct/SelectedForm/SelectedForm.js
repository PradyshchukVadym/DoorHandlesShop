import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import "./SelectedForm.css";

export const SelectedForm = (props) => {
  const {
    label,
    value,
    error,
    onChange,
    selectBoxArray,
    className,
    selectContainerClassName,
  } = props;

  const handleChange = (event) => {
    const selectedValue = event.target.value;
    onChange(selectedValue);
  };

  return (
    <>
      <Box className={selectContainerClassName}>
        {selectBoxArray && (
          <>
            <FormControl fullWidth error={!!error}>
              <InputLabel id="demo-simple-select-label">{label}</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={value}
                label={label}
                placeholder={label}
                onChange={handleChange}
                error={!!error}
                className={className}
              >
                {selectBoxArray.map((el) => (
                  <MenuItem value={el.value}>{el.label}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <span className="emptyError">{error}</span>
          </>
        )}
      </Box>
    </>
  );
};
