import React, { useState, useContext } from "react";
import AppContext from "../appContext";
import "../style/signUp.css";

const SignUp = () => {
  const { addEmployee } = useContext(AppContext);

  const [newEmployee, setNewEmployee] = useState({
    employeeNumber: "",
    employeeName: "",
    forkliftLicense: false,
    storageVisited: 0,
  });

  const [numberError, setNumberError] = useState(false);
  const [nameError, setNameError] = useState(false);

  const handleCreate = () => {
    if (
      newEmployee.employeeNumber.length !== 5 ||
      newEmployee.employeeNumber === "99999"
    ) {
      setNumberError(true);
      return;
    } else {
      setNumberError(false);
    }

    const nameRegex = /^[a-zA-Z]+(\s[a-zA-Z]+)*$/;
    if (
      newEmployee.employeeName.length < 4 ||
      !nameRegex.test(newEmployee.employeeName) ||
      newEmployee.employeeName.indexOf(" ") === -1
    ) {
      setNameError(true);
      return;
    } else {
      setNameError(false);
    }
    addEmployee(newEmployee);
  };

  return (
    <div>
      <p id="signUpTitle">Sign up</p>
      <div className="inputsDiv">
        NO.
        <input
          style={{ marginLeft: "50px" }}
          className="inputs"
          value={newEmployee.employeeNumber}
          onInput={(e) => {
            setNewEmployee((prevState) => ({
              ...prevState,
              employeeNumber: e.target.value,
            }));
          }}
          type="number"
        />
      </div>
      {numberError ? (
        <p className="errors">the number must be with 5 digits.</p>
      ) : null}
      <div className="inputsDiv">
        FullName
        <input
          className="inputs"
          value={newEmployee.employeeName}
          onInput={(e) => {
            setNewEmployee((prevState) => ({
              ...prevState,
              employeeName: e.target.value,
            }));
          }}
          type="text"
        />
      </div>
      {nameError ? (
        <p className="errors">the name must contain minimum 4 characters.</p>
      ) : null}
      <span className="subTitles">Forklift truck</span>
      <label className="radioLabel">
        <div>
          <input
            type="radio"
            checked={!newEmployee.forkliftLicense}
            onChange={() => {
              setNewEmployee((prevState) => ({
                ...prevState,
                forkliftLicense: false,
              }));
            }}
          />
          no
        </div>
        <div>
          <input
            type="radio"
            checked={newEmployee.forkliftLicense}
            onChange={() => {
              setNewEmployee((prevState) => ({
                ...prevState,
                forkliftLicense: true,
              }));
            }}
          />
          yes
        </div>
      </label>
      <button
        id="createButton"
        onClick={() => {
          handleCreate();
        }}
      >
        Create
      </button>
    </div>
  );
};

export default SignUp;
