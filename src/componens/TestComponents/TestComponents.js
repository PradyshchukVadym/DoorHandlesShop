import { useState } from "react";
import "../TestComponents/TestComponents.css";
import { InputFile } from "./testFileInput/TestFileInput";

export const TestComponents = () => {
  const [photo, setPhoto] = useState([]);
  const onSubmit = (event) => {
    event.preventDefault();
    console.log("submit");
  };
  return (
    <form className="formContainerTest" onSubmit={onSubmit}>
      <h2 className="titleTestComp">Загрузка файлов</h2>
      <InputFile
        placeholder="Добавить фото"
        accept=".png,.svg,.jpeg,.img"
        multiple={true}
        files={photo}
        setFiles={setPhoto}
      />
      <button type="submit" className="form-Button">
        Отправить
      </button>
    </form>
  );
};
