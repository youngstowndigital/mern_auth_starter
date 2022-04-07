import { useContext, useEffect } from "react";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import { Container } from "@mui/material";
import CssBaseline from '@mui/material/CssBaseline';
import Signup from "./components/Signup";
import { UserContext } from './context/UserContext';
import Welcome from "./components/Welcome";
import axios from "axios";

function App() {
  const [userContext, setUserContext] = useContext(UserContext);

  const verifyUser = async () => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_ENDPOINT}users/refreshtoken`, {}, { withCredentials: true });
      setUserContext(oldValues => {
        return { ...oldValues, token: response.data.token }
      });

      setTimeout(verifyUser, 5 * 6 * 1000);
    } catch (error) {
      setUserContext(oldValues => {
        return { ...oldValues, token: null }
      });
    }
  }

  useEffect(() => {
    verifyUser()
  }, [])

  return (
    <>
      <CssBaseline />
      <Navbar />
      <Container component="main" maxWidth="xs">
        {
          !userContext.token ?
          <>
            <Signup />
            <Login />
          </>
          :
          <Welcome />
        }
      </Container>
    </>
  );
}

export default App;
