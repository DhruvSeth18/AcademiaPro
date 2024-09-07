import Home from "./Home";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';


const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});
const App = ()=>{
  return (<>
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Home/>
    </ThemeProvider>
  </>)
}
export default App;