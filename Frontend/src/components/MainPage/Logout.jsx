import React from "react";
import { useNavigate } from "react-router-dom";

const Logout = ({ deleteToken }) => {
  const navigate = useNavigate();

  function logout() {
    deleteToken();
    navigate("/login");
  }

  return (
    <>
      <button className="logout" onClick={logout}>
        Log out
      </button>
    </>
  );
};

export default Logout;
