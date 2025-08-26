import React from "react";

const Heading = ({ children, className = "", style = {} }) => {
  return (
    <h1
      className={`text-text-5xl font-extrabold ml-3 text-primary ${className}`}
      style={style}
    >
      {children}
    </h1>
  );
};

export default Heading;
