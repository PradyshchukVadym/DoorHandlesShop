import React, { useState } from "react";
import "./TestFileInput.css";
import CloseIcon from "../../../Images/close.svg";

export const InputFile = ({
  placeholder,
  accept,
  multiple,
  files,
  setFiles,
}) => {
  const [imageURLs, setImageURLs] = useState([]);

  const handleChange = (event) => {
    console.log("aaa", event.target.files);

    const selectedFiles = Array.from(event.target.files);
    if (selectedFiles.length > 0) {
      setFiles([...files, selectedFiles]);

      const newImageURLs = selectedFiles.map((file) =>
        URL.createObjectURL(file)
      );
      setImageURLs([...imageURLs, newImageURLs]);
    }
  };

  const handleRemoveImage = (index) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    const updatedImageURLs = imageURLs.filter((_, i) => i !== index);

    setFiles(updatedFiles);
    setImageURLs(updatedImageURLs);
  };

  return (
    <div className="input-file-container">
      <label className="input-file-label">
        <input
          type="file"
          className="input-file-element"
          accept={accept}
          multiple={multiple}
          onChange={(e) => handleChange(e)}
        />
        <span className="input-file-placeholder">{placeholder}</span>
      </label>

      {imageURLs.length > 0 &&
        imageURLs.map((url, i) => (
          <div key={i} className="input-file-preview">
            <img src={url} alt={`Preview ${i}`} className="input-file-image" />
            <img
              onClick={() => handleRemoveImage(i)}
              src={CloseIcon}
              alt="Close"
              className="closeIcon"
            />
          </div>
        ))}
    </div>
  );
};
