import { Left } from "../../components/index/left";
import { Right } from "../../components/index/right";
import { Bottom } from "../../components/index/bottom";
import "./home.css";

export const Home = () => {
  return (
    <div className="main">
      <div className="container">
        <Left></Left>
        <Right></Right>
      </div>
      <div>
        <Bottom></Bottom>
      </div>
    </div>
  );
};
