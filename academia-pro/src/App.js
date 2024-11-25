import React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { UserProvider } from "./components/context/userContext";
import { Routes, Route } from "react-router-dom";
import Home from './Home';
import Login from "./components/Login/login";
const darkTheme = createTheme({
  palette: {
    mode: "light", 
  },
});

const App = () => {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <UserProvider>
        <Home/>
      </UserProvider>
    </ThemeProvider>
  );
};

export default App;
