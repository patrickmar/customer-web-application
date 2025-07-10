import React from "react";
import PropTypes from "prop-types";
import Loader from "./Loader";

type IButtonLoader = {
  isLoading: boolean;
  text: string;
  loadingText: string;
};

const ButtonLoader = ({ isLoading, text, loadingText }: IButtonLoader) => {
  return (
    <>
      {isLoading ? (
        <>
          <Loader text={loadingText != undefined ? loadingText : undefined} />
        </>
      ) : (
        <span>{text}</span>
      )}
    </>
  );
};

ButtonLoader.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired,
  loadingText: PropTypes.string,
};

export default ButtonLoader;
