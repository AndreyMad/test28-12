import React from "react";
import PrimaryButton from "../components/PrimaryButton";
import { useProgressiveImage } from "../hoc/ProgressiveImage";
import bckImage from "../assets/pexels-alexandr-podvalny-1227513.webp";
import placeholder from "../assets/placeholder.webp";

const MainSection = () => {
  const loadedImage = useProgressiveImage(bckImage)
  return (
    <section
      style={{ backgroundImage: `url(${loadedImage || placeholder})` }}
      className="mainSection__container"
    >
      <h2 className="mainSection__title">
        Test assignment for front-end developer
      </h2>
      <span className="mainSection__text">
        What defines a good front-end developer is one that has skilled knowledge of HTML,
        CSS, JS with a vast understanding of User design thinking as they'll be building web
        interfaces with accessibility in mind. They should also be excited to learn,
        as the world of Front-End Development keeps evolving.
      </span>
      <PrimaryButton
        btnText="Sign up"
        onClick={() => document.getElementById("form").scrollIntoView()}
      />
    </section>
  )
}

export default MainSection;
