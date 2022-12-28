import React, { Fragment, useState } from "react";
import { Button } from "@mui/material";
import classes from "./fileUpload.module.css";

export default function FileUploadBtn({ setFile, fileName, setFileName }) {
  const [error, setError] = useState("");
  const changeHandler = async (data) => {
    setError("");
    if (data.size > 5000000) {
      setError("Max allowed file size 5mb");
      return;
    }
    const { width, height } = await getImagesize(data);
    if (width <= 70 || height <= 70) {
      setError("Minimum width and height 70px*70px");
      return;
    }
    if (data.name) {
      setFileName(data.name)
    }
    setFile(data);
  }

  const getImagesize = file => {
    return new Promise((resolve, reject) => {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function (e) {
        //Initiate the JavaScript Image object.
        let image = new Image();

        //Set the Base64 string return from FileReader as source.
        image.src = e.target.result;

        //Validate the File Height and Width.
        image.onload = function () {
          let height = this.height;
          let width = this.width;
          resolve({ height, width });
        };
      };
    });
  };

  return (
    <Fragment>
      <input
        accept=".jpg, .jpeg"
        type="file"
        onChange={({ target }) => changeHandler(target.files[0])}
        id="icon-button-file"
        style={{ display: 'none', }}
      />
      <label className={error.length > 0 ? `${classes.label} ${classes.labelError}` : classes.label} htmlFor="icon-button-file">
        <Button
          className={error.length > 0 ? `${classes.button} ${classes.buttonError}` : classes.button}
          variant="contained"
          component="span"
          size="large"
          color="inherit"

        >
          <span>Upload</span>
          <p className={classes.buttonError}>{error.length > 0 ? error : null}</p>
        </Button>

        <span>
          {fileName || 'Upload your photo'}
        </span>
      </label>
    </Fragment>
  )
}
