import { useContext, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import { Container } from "@mui/material";
import CssBaseline from '@mui/material/CssBaseline';
import Signup from "./components/Signup";
import Welcome from "./components/Welcome";
import { AuthContext } from './context/AuthContext';

function App() {
  return (
    <>
      <Router>
        <CssBaseline />
        <Navbar />
        <Container component="main" maxWidth="xs">
          <Routes>
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/welcome" element={<Welcome />} />
          </Routes>
        </Container>
      </Router>
    </>
  );
}

export default App;
