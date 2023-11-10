
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

const { Button } = chakraTheme.components;

const theme = extendBaseTheme({
  components: {
    Button,
  },
});



function App() {

  const [Role, setRole] = useState([])
  const [UserData, setUserData] = useState([]);
  const [separateData,setSeparateData] = useState({})
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
  
  return (
    <div>
      <ChakraBaseProvider theme={theme}>
        <StoreProvider value={{ Role, setRole, UserData, setUserData,separateData,setSeparateData  }}>
          <BrowserRouter>
            <Routes>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/" element={<Login />} />
              {/* <Route path="/clientdata" element={<ClientData />} />
            <Route path="/paymentdata" element={<PaymentData />} />
            <Route path="/csvfileupload" element={<CsvfileUpload />} /> */}
            </Routes>
          </BrowserRouter>
        </StoreProvider >
      </ChakraBaseProvider>
    </div>
  );
}

export default App;
