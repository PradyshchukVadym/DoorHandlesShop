import "../AccordinInAdmin/AccordinInAdmin.css";
import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { TextBox } from "../TextBox/TextBox";

export default function AccordionExpandDefault(props) {
  const { label, value, accordionType, error, onChange } = props;

  // console.log(props);

  const addInputFields = () => {
    const newInput = { id: 0, key: "", value: "" };
    onChange(accordionType === "features" ? "features" : "characteristics", [
      ...value,
      newInput,
    ]);
  };

  const getErrorIfExist = (index, isValue) => {
    if (accordionType === "features") {
      if (error && error.features && error.features[index]) {
        // console.log("err", error.features);
        // console.log("err2", error.features[index]);

        return isValue === true
          ? error.features[index].value
          : error.features[index].key;
      }
    }

    if (accordionType === "characteristics") {
      if (error && error.characteristics && error.characteristics[index]) {
        return isValue === true
          ? error.characteristics[index].value
          : error.characteristics[index].key;
      }
    }
  };

  return (
    <div>
      {accordionType === "features" && (
        <Accordion defaultExpanded={false}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <Typography>{label}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            {value &&
              value.map((input, index) => (
                <div className="input-row" key={index}>
                  <TextBox
                    inputClassName="accordionInput"
                    placeholder="Название комплектации"
                    value={input.key}
                    onChange={(e) =>
                      onChange(`features[${index}].key`, e.target.value)
                    }
                    error={getErrorIfExist(index, false)}
                  />

                  <TextBox
                    inputClassName="accordionInput"
                    placeholder="Значение комплектации"
                    value={input.value}
                    onChange={(e) =>
                      onChange(`features[${index}].value`, e.target.value)
                    }
                    error={getErrorIfExist(index, true)}
                  />
                </div>
              ))}
            <div className="addBtnBox">
              <button className="addInput" onClick={addInputFields}>
                Добавить новый элемент
              </button>
            </div>
          </AccordionDetails>
        </Accordion>
      )}
      {accordionType === "characteristics" && (
        <Accordion defaultExpanded={false}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <Typography>{label}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            {value &&
              value.map((input, index) => (
                <div className="input-row" key={index}>
                  <TextBox
                    inputClassName="accordionInput"
                    placeholder="Название характеристики"
                    value={input.key}
                    onChange={(e) =>
                      onChange(`characteristics[${index}].key`, e.target.value)
                    }
                    error={getErrorIfExist(index, false)}
                  />
                  <TextBox
                    inputClassName="accordionInput"
                    placeholder="Значение характеристики"
                    value={input.value}
                    onChange={(e) =>
                      onChange(
                        `characteristics[${index}].value`,
                        e.target.value
                      )
                    }
                    error={getErrorIfExist(index, true)}
                  />
                </div>
              ))}
            <div className="addBtnBox">
              <button className="addInput" onClick={addInputFields}>
                Добавить новый элемент
              </button>
            </div>
          </AccordionDetails>
        </Accordion>
      )}
    </div>
  );
}
