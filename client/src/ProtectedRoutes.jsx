import { Navigate, Outlet } from "react-router";

const useAuth = () => {
  const user = { loggedIn: true }; // CONNECT TO BACK END (USER AUTH)
  return user && user.loggedIn;
};

const ProtectedRoutes = () => {
  const isAuth = useAuth();

  return isAuth ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoutes;
