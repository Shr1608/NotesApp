import { useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Note from "./pages/Note";

function App() {
  const user = localStorage.getItem("email");
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            exact
            path="/"
            element={user ? <Home /> : <Navigate to="/login" />}
          />
          <Route
            exact
            path="/login"
            element={user ? <Navigate to="/" /> : <Login />}
          />
          <Route
            exact
            path="/register"
            element={user ? <Navigate to="/" /> : <Register />}
          />
          <Route
            exact
            path="/note/:id"
            element={!user ? <Navigate to="/" /> : <Note />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
