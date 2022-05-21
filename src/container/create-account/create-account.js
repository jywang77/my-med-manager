import { Left } from "../../components/index/left";
import { RightCreate } from "../../components/create-account/right-create";
import "../index/home.css";

export const CreateAccount = () => {
  return (
    <div className="main container">
      <Left></Left>
      <RightCreate></RightCreate>
    </div>
  );
};
