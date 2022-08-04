import { Navigate, Outlet } from "react-router";
import axios from "axios";
import { useState, useEffect } from "react";

// if user is authenticated, allow access into protected route
const ProtectedRoutes = () => {
  const [isAuth, setIsAuth] = useState(true);

  useEffect(() => {
    const getAuth = async () => {
      const res = await axios("http://localhost:3001/users/isauth", {
        withCredentials: true,
      });
      setIsAuth(res.data);
    };
    getAuth();
  }, []);

  return isAuth ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoutes;
