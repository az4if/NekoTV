import React from "react";

const Heading = ({ children, className = "", style = {} }) => {
  return (
    <h1
      className={`text-xl font-extrabold ml-5 text-primary ${className}`}
      style={style}
    >
      {children}
    </h1>
  );
};

export default Heading;
