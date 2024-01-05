import React, { useState } from "react";
import "./App.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Portal } from "./pages/Portal";
import {Allnotes } from "./pages/Allnotes";
import { Addnote } from "./pages/Addnote";
import { Editnote } from "./pages/Editnote";
import { NotFound } from "./pages/NotFound";
import { Viewnote } from "./pages/Viewnote";
import { Home } from "./pages/Home";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { ProtectedRoute } from "./pages/ProtectedRoute";
// import Overview from "./pages/Overview";

function App() {
  const [mode, setMode] = useState("light");

  const darkTheme = createTheme({
    palette: {
      mode: mode,
    },
  });
  return (
    <ThemeProvider theme={darkTheme}>
         <Paper style={{ minHeight: "100vh", borderRadius: "0%" }} elevation={9}>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Register />} />
      <Route path="/portal" element={<ProtectedRoute><Portal mode={mode} setMode={setMode}/> </ProtectedRoute> }>
      <Route path="home" element={ <ProtectedRoute><Home /></ProtectedRoute>  } />
        <Route path="allnotes" element={ <ProtectedRoute><Allnotes /></ProtectedRoute>} />
        <Route path="add" element={ <ProtectedRoute><Addnote /></ProtectedRoute> } />
        <Route path="edit/:_id" element={<ProtectedRoute><Editnote /></ProtectedRoute> } />
        <Route path="view/:_id" element={<ProtectedRoute><Viewnote /></ProtectedRoute> } />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
    </Paper>
    </ThemeProvider>
  );
}

export default App;
