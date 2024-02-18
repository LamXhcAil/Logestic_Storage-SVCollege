import React, { useState, useContext } from "react";
import AppContext from "../appContext";

const LogIn = () => {
  const { onLogin } = useContext(AppContext);
  const [employeeNumber, setEmployeeNumber] = useState("");

  return (
    <div>
      Log in
      <div className="inputsDiv">
        NO.
        <input
          className="inputs"
          value={employeeNumber}
          onInput={(e) => {
            setEmployeeNumber(e.target.value);
          }}
          type="number"
        />
      </div>
      <button
        onClick={() => {
          onLogin(employeeNumber);
        }}
      >
        Enter
      </button>
    </div>
  );
};

export default LogIn;
