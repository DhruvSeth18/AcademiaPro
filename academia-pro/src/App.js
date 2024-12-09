import React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { UserProvider } from "./components/context/userContext";
import Home from './Home';

const darkTheme = createTheme({
  palette: {
    mode: "dark", 
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
