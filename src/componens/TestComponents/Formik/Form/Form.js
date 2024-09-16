import "./Form.css";
import { Formik, Form } from "formik";
import { initialValues, schemas } from "./Helper";
import { Input } from "../Input/Input";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const CustomForm = () => {
  const navigate = useNavigate();
  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={schemas.custom}
        onSubmit={() => console.log("lox")}
      >
        <Form action="" className="form">
          <Input
            label="Имя"
            name="firstName"
            id="firstName"
            placeholder="Введите имя"
          />
        </Form>
      </Formik>
      <button className="testCom" onClick={() => navigate("/TestComponents")}>
        тест
      </button>
    </>
  );
};
