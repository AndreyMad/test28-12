import React from "react";
import { ReactComponent as SuccesIcon } from "../assets/success-image.svg";
import classes from "./SuccesMessage.module.css";

const SuccesMessage = () => <div className={classes.container}>
  <h2 className={classes.title}>User successfully registered</h2>
  <SuccesIcon className={classes.succesIcon} />
</div>;

export default SuccesMessage;
