import React from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import "../Styles/styles.css";
import ToDo from "../components/MainPage/ToDo";
import Login from "../components/Login/Login";
import useToken from "./useToken";
import Register from "../components/Register/Register";
import PageNotFound from "../components/PageNotFound/PageNotFound";

function App() {
  const { token, setToken, deleteToken } = useToken();

  return (
    <BrowserRouter>
      {token ? (
        <Routes>
          <Route path="/" element={<ToDo deleteToken={deleteToken} />} />
          <Route path="/todo" element={<ToDo deleteToken={deleteToken} />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Login setToken={setToken} />} />
        </Routes>
      )}
    </BrowserRouter>
  );
}

export default App;
