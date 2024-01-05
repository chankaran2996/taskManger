import React, {useState} from 'react';
import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { Outlet } from "react-router-dom";
import { Logout } from './Logout';

export function Portal({ mode, setMode }) {

  const darkTheme = createTheme({
    palette: {
      mode: mode,
    },
  });

  const [movie, setMovie] = useState([]);

  const navigate = useNavigate();

  return (
    <ThemeProvider theme={darkTheme}>
    <Paper style={{ minHeight: "100vh", borderRadius: "0%" }} elevation={9}>
      <div className="App">
        <AppBar position="static">
          <Toolbar>
            <Button color="inherit" onClick={() => navigate("/portal/home")}>
              Home
            </Button>
            <Button color="inherit" onClick={() => navigate("/portal/allnotes")}>
              All-notes
            </Button>
            <Button color="inherit" onClick={() => navigate("/portal/add")}>
            Add-note
            </Button>
          

            <Button
              sx={{ marginLeft: "auto" }}
              startIcon={
                mode === "light" ? <Brightness4Icon /> : <Brightness7Icon />
              }
              color="inherit"
              onClick={() => setMode(mode === "light" ? "dark" : "light")}
            >
              {mode === "light" ? "dark" : "light"}
            </Button>

            <Button color="inherit" onClick={Logout}>LogOut</Button>
          </Toolbar>
        </AppBar>          

        <Outlet />
    </div>
    </Paper>
  </ThemeProvider>
  
  );
}
