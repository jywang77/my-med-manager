import { Navigate, Outlet } from "react-router";
import axios from "axios";
import { useState, useEffect } from "react";

// if user is authenticated, allow access into protected route
const ProtectedRoutes = () => {
  const [isAuth, setIsAuth] = useState();

  useEffect(() => {
    axios({
      method: "GET",
      withCredentials: true,
      url: "http://localhost:3001/users/current",
    })
      .then((res) => {
        setIsAuth(res.data);
      })
      .catch((err) => console.err(err));
  }, [isAuth]);

  console.log("isAuth is: " + isAuth);
  return isAuth ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoutes;
