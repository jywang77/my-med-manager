import { Left } from "../../components/home/left";
import { RightCreate } from "../../components/create-account/right-create";
import "../home/home.css";

export const CreateAccount = () => {
  return (
    <div className="main container">
      <Left></Left>
      <RightCreate></RightCreate>
    </div>
  );
};
