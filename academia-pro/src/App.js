import React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { UserProvider } from "./components/context/userContext";
import Home from "./Home";
import AboutUs from "./components/navbar/Aboutus";
import { Routes, Route } from "react-router-dom";
import Homepage from "./components/navbar/Homepage";
import  ContactPage  from "./components/navbar/ContactPage";
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
        <Routes>
          <Route path="/" element={<Homepage/>} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/contact" element={<ContactPage/>} />
          <Route path="/login" element={<Login/>}></Route>
        </Routes>
      </UserProvider>
    </ThemeProvider>
  );
};

export default App;
