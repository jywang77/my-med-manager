import { Left } from "../components/home/left";
import { Right } from "../components/home/right";
import { Bottom } from "../components/home/bottom";
import "./home.css";
import { Helmet, HelmetProvider } from "react-helmet-async";

export const Home = ({ handleIsAuth }) => {
  return (
    <HelmetProvider>
      <div className="main">
        <Helmet>
          <title>myMedManager - Home</title>
        </Helmet>
        <div className="container">
          <Left />
          <Right handleIsAuth={handleIsAuth} />
        </div>
        <div>
          <Bottom />
        </div>
      </div>
    </HelmetProvider>
  );
};
