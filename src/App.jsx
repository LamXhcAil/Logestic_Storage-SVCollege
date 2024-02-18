import "./App.css";
import AppContext from "./appContext";
import React, { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import HomePage from "./views/HomePage";
import SignUp from "./views/SignUp";
import LogIn from "./views/LogIn";
import EmployeeDetails from "./components/EmployeeDetails";
import Manager from "./views/Manager";

function App() {
  const [employees, setEmployees] = useState([]);
  const [loggedInEmployee, setLoggedInEmployee] = useState(null);

  const [products, setProducts] = useState([
    { id: 11122, name: "Green Box", forkliftNeeded: false, inPlace: false },
    { id: 22554, name: "Green Box", forkliftNeeded: false, inPlace: false },
    { id: 66698, name: "Blue Box", forkliftNeeded: true, inPlace: false },
    { id: 78544, name: "Red Box", forkliftNeeded: false, inPlace: false },
    { id: 69875, name: "Red Box", forkliftNeeded: false, inPlace: false },
  ]);

  const navigate = useNavigate();

  const addEmployee = (newEmployee) => {
    const existingEmployee = employees.find(
      (employee) => employee.employeeNumber === newEmployee.employeeNumber
    );

    if (existingEmployee) {
      throw "Employee already exists!";
    } else {
      setEmployees((prevEmployees) => [...prevEmployees, newEmployee]);
      navigate("/");
    }
  };

  const onLogin = (employeeNumb) => {
    if (employeeNumb === "99999") {
      navigate("/manager");
    } else {
      const loginEmployee = employees.find(
        (employee) => employee.employeeNumber === employeeNumb
      );
      if (loginEmployee) {
        const employeeIndex = employees.findIndex(
          (employee) => employee.employeeNumber === loginEmployee.employeeNumber
        );
        const loginEmployeeCopy = structuredClone(loginEmployee);
        loginEmployeeCopy.storageVisited += 1;

        setLoggedInEmployee(loginEmployeeCopy);
        employees.splice(employeeIndex, 1, loginEmployeeCopy);
      } else {
        alert("Employee not found!");
      }
    }
  };

  const onLogOut = () => {
    setLoggedInEmployee(null);
    navigate("/");
  };

  const onUpdate = (loggedInEmployee, updatedProduct) => {
    const productsCopy = structuredClone(products);
    const productIndex = productsCopy.findIndex(
      (product) => product.id === updatedProduct.id
    );

    if (!updatedProduct.forkliftNeeded) {
      productsCopy[productIndex].inPlace = true;
    } else {
      if (!loggedInEmployee.forkliftLicense) {
        alert("Forklift license is required");
      } else {
        productsCopy[productIndex].inPlace = true;
      }
    }

    setLoggedInEmployee((prevLoggedInEmployee) => ({
      ...prevLoggedInEmployee,
      products: productsCopy,
    }));
    setProducts(productsCopy);
    console.log(loggedInEmployee);
  };

  const contextValue = {
    employees,
    onUpdate,
    addEmployee,
    onLogin,
    loggedInEmployee,
    onLogOut,
    products,
  };
  return (
    <AppContext.Provider value={contextValue}>
      <>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route
            path="/login"
            element={loggedInEmployee ? <EmployeeDetails /> : <LogIn />}
          />
          <Route path="/manager" element={<Manager />} />
        </Routes>
      </>
    </AppContext.Provider>
  );
}

export default App;
