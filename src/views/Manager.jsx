import React, { useContext } from "react";
import AppContext from "../appContext";
import { useNavigate } from "react-router-dom";
import "../style/manager.css";

const Manager = () => {
  const navigate = useNavigate();
  const { employees } = useContext(AppContext);
  return (
    <div>
      <p id="managerTitle">Manager</p>
      <div>
        <table id="employeesTable">
          <thead>
            <tr>
              <th>NO</th>
              <th>FullName</th>
              <th>Counter</th>
              <th>Number of products</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee.employeeNumber}>
                <td>{employee.employeeNumber}</td>
                <td>{employee.employeeName}</td>
                <td>{employee.storageVisited}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button
        id="logOutButton"
        onClick={() => {
          navigate("/");
        }}
      >
        Log Out
      </button>
    </div>
  );
};

export default Manager;
