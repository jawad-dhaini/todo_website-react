import React from "react";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <>
      <h1>Page Not Found</h1>
      <h3>Error 404</h3>
      <p>
        Return to <Link to="/todo">HomePage</Link>
      </p>
    </>
  );
};

export default PageNotFound;
