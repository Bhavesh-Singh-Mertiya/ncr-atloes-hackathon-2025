import React from "react";

const FileUploader = (props) => {
  const hiddenFileInput = React.useRef(null);
  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };

  const handleChange = (event) => {
    const fileUploaded = event.target.files;
    props.onChange(fileUploaded);
  };
  return (
    <>
      <button
        className="btn fs-15 text-default fw-normal btn-outline-dark"
        onClick={handleClick}
      >
        Browse
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
