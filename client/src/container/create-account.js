import { Left } from "../components/home/left";
import { RightCreate } from "../components/create-account/right-create";
import "./home.css";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import { useEffect } from "react";

export const CreateAccount = () => {
  // protect route
  const navigate = useNavigate();

  useEffect(() => {
    Axios({
      method: "GET",
      withCredentials: true,
      url: "http://localhost:3001/users/isauth",
    }).then((res) => {
      if (res.data === true) {
        navigate("/dashboard");
      }
    });
  }, [navigate]);

  return (
    <HelmetProvider>
      <div className="main container">
        <Helmet>
          <title>myMedManager - Create Account</title>
        </Helmet>
        <Left></Left>
        <RightCreate></RightCreate>
      </div>
    </HelmetProvider>
  );
};
