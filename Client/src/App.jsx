import Header from "./components/Header";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import Error from "./components/Error";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { Routes, Route, useNavigate } from "react-router-dom"
import { useEffect, useContext, useState } from "react";
import { LoginContext } from "./components/ContextProvider/Context";
import Extra_Info from "./components/Extra_Info";


function App() {

  const [data, setData] = useState(false);

  const { logindata, setLoginData } = useContext(LoginContext);


  const history = useNavigate();

  const DashboardValid = async () => {
    let token = localStorage.getItem("usersDataToken");
    console.log("user verify data token is: ",token);

    const res = await fetch("http://localhost:8009/validuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": token
      }
    });

    const data = await res.json();
    console.log("user verify data is: ",data);

    if (data.status == 401 || !data) {
      console.log("user not valid");
    } else {
      console.log("user verify");
      setLoginData(data)
      history("/dash");
    }
  }

  useEffect(() => {
    setTimeout(()=>{
      DashboardValid();
      setData(true)
    },2000)

  }, [])

  return (
    <>
      {
        data ? (
          <>
            <Header />

            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/dash" element={<Dashboard />} />
              <Route path="/extra" element={<Extra_Info />} />
              <Route path="*" element={<Error />} />
            </Routes>
          </>

        ) : <Box sx={{ display: 'flex', justifyContent: "center", alignItems: "center", height: "100vh" }}>
          Loading... &nbsp;
          <CircularProgress />
        </Box>
      }


    </>
  );
}

export default App;