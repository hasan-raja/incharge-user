import React, { useEffect, useContext, useState } from "react";
import EmployeeFinder from "../api/EmployeeFinder";
import { useHistory } from "react-router-dom";
import { EmployeeContext } from "../context/EmployeeContext";
import StarRating from "./StarRating";


export const EmployeeList = () => {
  const { employees, setEmployees } = useContext(EmployeeContext);
  // console.log(employees);
  let history = useHistory();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await EmployeeFinder.get("/");
        setEmployees(response.data.data.employees);
      } catch (err) {}
    };
    fetchData();
  }, []);

  const handleEmployeeSelect = (id) => {
    history.push(`/employees/${id}`);
  };

  const renderRating = (employee) => {
    if (!employee.count) {
      return <span className="text-warning">0 reviews</span>;
    }
    return (
      <>
        <StarRating rating={employee.id} />
        <span className="text-warning ml-1">({employee.count})</span>
      </>
    );
  };
  const [search, setSearch] = useState("");
  const handleChanges = (e) => {
    setSearch(e.target.value);
  };

  const filterEmployeeN = employees.filter((employee) =>
    employee.emp_name.toLowerCase().includes(search.toLowerCase())
  );

  
  return (
    <>
      <div className="d-flex justify-content-center m-3">
        <input
          placeholder="Search Employee"
          onChange={(e) => handleChanges(e)}
        />
      </div>

      <div className="list-group">
        <table className="table table-hover bg-light">
          <thead>
            <tr className="bg-primary">
              <th scope="col">Employee Name</th>
              <th scope="col">Employee Department</th>
              <th scope="col">Employee Branch</th>
              <th scope="col">Ratings</th>
            </tr>
          </thead>
          <tbody>
            {
              filterEmployeeN.map((employee) => (
                //   return (
                <tr
                  onClick={() => handleEmployeeSelect(employee.id)}
                  key={employee.id}
                >
                  <td>{employee.emp_name}</td>
                  <td>{employee.emp_department}</td>
                  <td>{employee.emp_branch}</td>
                  <td>{renderRating(employee)}</td>
                  {/* <td>{employee.emp_activity?'Active':'Inactive'}</td> */}
                </tr>
                //   );
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
