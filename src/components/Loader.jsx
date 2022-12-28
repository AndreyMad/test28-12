import React from "react";
import { ReactComponent as LoaderIcon } from "../assets/Rolling-1s-200px.svg";
import classes from "./Loader.module.css";

const Loader = () => <div className={classes.container}>
  <LoaderIcon className={classes.loader} />
</div>;

export default Loader;
