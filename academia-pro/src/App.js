import Home from "./Home";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import {UserProvider} from './components/context/userContext';

const darkTheme = createTheme({
  palette: {
    mode: 'light',
  },
});
const App = ()=>{
  return (<>
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
        <UserProvider>
          <Home />
        </UserProvider>
    </ThemeProvider>
  </>)
}
export default App;