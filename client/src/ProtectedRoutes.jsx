import { Navigate, Outlet } from "react-router";
// import { axios } from "axios";
// import { useState, useEffect } from "react";

const useAuth = () => {
  // grabbing whether the user is authenticated from back end
  // const [isAuth, setIsAuth] = useState(true);

  // useEffect(() => {
  //   axios
  //     .get("http://localhost:3001/users/current")
  //     .then((res) => setIsAuth(res.data))
  //     .catch((err) => console.err(err));
  // }, []);

  const user = { loggedIn: true };
  return user && user.loggedIn;
};

const ProtectedRoutes = () => {
  const isAuth = useAuth();

  return isAuth ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoutes;
