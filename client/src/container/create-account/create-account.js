import { Left } from "../../components/home/left";
import { RightCreate } from "../../components/create-account/right-create";
import "../home/home.css";
import { Helmet } from "react-helmet";

export const CreateAccount = () => {
  return (
    <div className="main container">
      <Helmet>
        <title>myMedManager - Create Account</title>
      </Helmet>
      <Left></Left>
      <RightCreate></RightCreate>
    </div>
  );
};
