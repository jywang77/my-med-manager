import { Left } from "../../components/home/left";
import { Right } from "../../components/home/right";
import { Bottom } from "../../components/home/bottom";
import "./home.css";

export const Home = () => {
  return (
    <div className="main">
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
