// Code credits: @steven_creates on medium.com https://medium.com/@steven_creates/creating-a-custom-react-hook-for-password-validation-46fc421c16ee

import { useState, useEffect } from "react";

export const usePasswordValidation = ({
  firstPassword = "",
  secondPassword = "",
}) => {
  let [match, setMatch] = useState(null);

  useEffect(() => {
    setMatch(firstPassword && firstPassword === secondPassword);
  }, [firstPassword, secondPassword]);

  return [match];
};
