import { Left } from "../components/home/left";
import { Right } from "../components/home/right";
import { Bottom } from "../components/home/bottom";
import "./home.css";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import { useEffect } from "react";

export const Home = () => {
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
      <div className="main">
        <Helmet>
          <title>myMedManager - Home</title>
        </Helmet>
        <div className="container">
          <Left />
          <Right />
        </div>
        <div>
          <Bottom />
        </div>
      </div>
    </HelmetProvider>
  );
};
