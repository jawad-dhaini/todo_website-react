import { useState } from "react";

export default function useToken() {
  function getToken() {
    return localStorage.getItem("token");
  }

  const [token, setToken] = useState(getToken());

  function saveToken(userToken) {
    localStorage.setItem("token", JSON.stringify(userToken));
    setToken(userToken);
  }

  function deleteToken() {
    localStorage.clear();
    setToken(null);
  }

  return {
    token,
    setToken: saveToken,
    deleteToken,
  };
}
