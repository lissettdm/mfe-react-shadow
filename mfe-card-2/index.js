import React from "react";
import PropTypes from "prop-types";
import style from "./index.scss";

const Card = ({ onClick, text }) => {
  return (
    <>
      <style>{style}</style>
      <div className="card" onClick={onClick}>
        <h3>Remote Card Content- updated</h3>
        {text}
      </div>
    </>
  );
};

Card.protoTypes = {
  onClick: PropTypes.func,
};

Card.defaultProps = {
  onUpdate: () => {},
};

export default Card
