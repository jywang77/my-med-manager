import { Left } from "../../components/home/left";
import { Right } from "../../components/home/right";
import { Bottom } from "../../components/home/bottom";
import "./home.css";
import { Helmet } from "react-helmet";

export const Home = () => {
  return (
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
  );
};
