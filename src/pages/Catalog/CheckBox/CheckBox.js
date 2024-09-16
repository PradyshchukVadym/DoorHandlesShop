import React, { useEffect, useState } from "react";
import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";

export const CategoryCheckboxes = ({ label, onChange, isRemoveSelected }) => {
  const [selectedFilters, setSelectedFilters] = useState({
    category1: false,
  });

  const handleChange = (event) => {
    setSelectedFilters({
      ...selectedFilters,
      [event.target.name]: event.target.checked,
    });

    onChange(event.target.checked);
  };

  useEffect(() => {
    setSelectedFilters({});
  }, [isRemoveSelected]);

  return (
    <FormGroup>
      <FormControlLabel
        control={
          <Checkbox
            checked={selectedFilters.category1}
            onChange={handleChange}
            name="category1"
          />
        }
        label={label}
      />
    </FormGroup>
  );
};
