import React, { useState, useContext, useEffect } from "react";
import AppContext from "../appContext";
import "../style/employeeDetails.css";

const EmployeeDetails = () => {
  const { loggedInEmployee, onLogOut, products, onUpdate } =
    useContext(AppContext);

  const [isForklift, setIsForklift] = useState("");

  useEffect(() => {
    const forkliftChecker = () => {
      setIsForklift(loggedInEmployee.forkliftLicense);
    };
    forkliftChecker();
  }, [loggedInEmployee]);

  return (
    <div>
      <p id="welcomeP"> Welcome {loggedInEmployee.employeeName}</p>
      <div id="details">
        Details:
        <div>
          <div> Full Name: {loggedInEmployee.employeeName}</div>
          <div> NO.: {loggedInEmployee.employeeNumber}</div>
          <div> Forklift truck license: {isForklift ? `yes` : `no`}</div>
        </div>
      </div>
      <p id="productsP">List of products:</p>
      {products.map((product) =>
        !product.inPlace ? (
          <div key={product.id} className="productsDiv">
            <p>NO.: {product.id}</p>
            <p>Name: {product.name}</p>
            <p>Need forklift truck: {product.forkliftNeeded ? `yes` : `no`}</p>
            <button
              className="updateButton"
              onClick={() => {
                onUpdate(loggedInEmployee, product);
              }}
            >
              Update
            </button>
          </div>
        ) : null
      )}
      <button
        id="logOutButton"
        onClick={() => {
          onLogOut();
        }}
      >
        Log Out
      </button>
    </div>
  );
};

export default EmployeeDetails;
