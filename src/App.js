import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from './Pages/Dashboard/Dashboard'
import { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import { StoreProvider } from './ContextApi';
import Login from './Pages/Login/Login';
import { Url } from './Pages/Core';
import chakraTheme from "@chakra-ui/theme";
import CashierDashboard from './Component/CashierDashboard/CashierDashboard';
import {
  ChakraBaseProvider,
  extendBaseTheme,
  RadioButtonGroup,
  Text,
} from "@chakra-ui/react";
import { PrivateRoutes } from './PrivateRoute';

const { Button } = chakraTheme.components;



const theme = extendBaseTheme({
  components: {
    Button,
  },
});



function App() {

  const [Role, setRole] = useState([])
  const [UserData, setUserData] = useState([]);
  const [separateData, setSeparateData] = useState({})
  const [riderObj, setRiderObj] = useState({});
  // console.log(Role, "Rollll");
  // useEffect(() => {
  //   axios({
  //     method: "get",
  //     url: Url,
  //   }).then(response => {
  //     setRoll(response.data.Data)
  //   }).catch(() => {

  //   })
  // }, [])

  const theme = extendBaseTheme({
    components: {
      Button,
    },
  });

  console.log("UserData",UserData)

  return (
    <div>
      <ChakraBaseProvider theme={theme}>
        <StoreProvider value={{ Role, setRole, UserData, setUserData, separateData, setSeparateData, setRiderObj, riderObj }}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/dashboard" element={<PrivateRoutes><Dashboard /></PrivateRoutes>} />
            </Routes>
          </BrowserRouter>
        </StoreProvider >
      </ChakraBaseProvider>
    </div>
  );
}

export default App;
