import React from "react";
import { toast } from "react-toastify";

const FileUploader = (props) => {
  const hiddenFileInput = React.useRef(null);
  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };

  const handleChange = (event) => {
    const fileUploaded = event.target.files;

    if (fileUploaded[0].size / 1024 > 1024) {
      toast.error("File size cannot be greater than 1mb");
    } else {
      props.onChange(fileUploaded);
    }
    // props.onChange(fileUploaded);
  };
  return (
    <>
      <button
        className="btn fs-15 text-default fw-normal btn-outline-dark"
        onClick={handleClick}
      >
        Change Picture
      </button>
      <input
        type="file"
        ref={hiddenFileInput}
        onChange={handleChange}
        style={{ display: "none" }}
        accept="image/*"
      />
    </>
  );
};
export default FileUploader;
