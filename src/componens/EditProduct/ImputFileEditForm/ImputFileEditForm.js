import React, { useEffect, useState } from "react";
import "../ImputFileEditForm/ImputFileEditForm.css";
import CloseIcon from "../../../Images/close.svg";

export const InputFileEditForm = ({
  placeholder,
  accept,
  multiple,
  files,
  setFiles,
}) => {
  const [imageURLs, setImageURLs] = useState([]);
  const [isFirstRender, setIsFirstRender] = useState(true);

  const handleChange = (event) => {
    const selectedFiles = Array.from(event.target.files);

    if (selectedFiles.length > 0) {
      setFiles([...files, ...selectedFiles]);

      const newImageURLs = selectedFiles.map((file) =>
        URL.createObjectURL(file)
      );

      setImageURLs([...imageURLs, ...newImageURLs]);
    }
  };

  const handleRemoveImage = (index) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    const updatedImageURLs = imageURLs.filter((_, i) => i !== index);

    setFiles(updatedFiles);
    setImageURLs(updatedImageURLs);
  };

  useEffect(() => {
    if (files.length > 0 && isFirstRender) {
      const newImageURLs = files.map((file) => URL.createObjectURL(file));

      setImageURLs([...imageURLs, ...newImageURLs]);
      setIsFirstRender(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [files]);

  return (
    <div className="input-file-container">
      <label className="inputFileLabel">
        <input
          type="file"
          className="input-file-element"
          accept={accept}
          multiple={multiple}
          onChange={(e) => handleChange(e)}
        />
        <span className="input-file-placeholder">{placeholder}</span>
      </label>
      <div className="inputBoxPreview">
        {imageURLs.length > 0 &&
          imageURLs.map((url, i) => (
            <div key={i + url} className="inputfilepreview">
              <img src={url} alt={`Preview ${i}`} className="inputFileImage" />
              <img
                onClick={() => handleRemoveImage(i)}
                src={CloseIcon}
                alt="Close"
                className="closeIcon"
              />
            </div>
          ))}
      </div>
    </div>
  );
};
