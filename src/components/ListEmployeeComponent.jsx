import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import useAxiosPrivate from "src/hooks/useAxiosPrivate";

const ListEmployeeComponent = () => {
  const [employees, setEmployees] = useState([]);
  const [errMsg, setErrMsg] = useState("");
  const [available, setAvailable] = useState(false);

  const axiosPrivate = useAxiosPrivate();

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    listOfEmployees();
  }, []);

  const listOfEmployees = async () => {
    try {
      const response = await axiosPrivate.get("/employees/departments");
      const isDataAvailable = response.data && response.data.length;
      setEmployees(response.data);
      setAvailable(isDataAvailable);
    } catch (err) {
      console.error(err);
      if (err?.response) {
        console.error(err);
        setErrMsg(err.response?.data?.message);
      }
      navigate("/login", { state: { from: location }, replace: true });
    }
  };

  function addNewEmployee() {
    navigate("/add-employee");
  }

  function updateEmployee(id) {
    navigate(`/edit-employee/${id}`);
  }

  const removeEmployee = async (id) => {
    if (window.confirm(`ID = ${id} Are you sure?`)) {
      try {
        await axiosPrivate.delete(`/employees/${id}`);
        listOfEmployees();
      } catch (err) {
        console.error(err);
        if (err?.response) {
          console.error(err);
          setErrMsg(err.response?.data?.message);
        }
        //navigate("/login", { state: { from: location }, replace: true });
      }
    }
  };

  return (
    <div className="container">
      <h2 className="text-center">List of Employees</h2>
      <p className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">
        {errMsg}
      </p>
      <button className="btn btn-primary mb-2" onClick={addNewEmployee}>
        Add Employee
      </button>
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>Id</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email Id</th>
            <th>Department Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {available ? (
            employees.map((employee) => (
              <tr key={employee.id}>
                <td>{employee.id}</td>
                <td>{employee.firstName}</td>
                <td>{employee.lastName}</td>
                <td>{employee.email}</td>
                <td>{employee.departmentDto.departmentName}</td>
                <td>
                  <button
                    className="btn btn-info"
                    onClick={() => updateEmployee(employee.id)}
                  >
                    Update
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => removeEmployee(employee.id)}
                    style={{ marginLeft: "10px" }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td>Employees Empty</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ListEmployeeComponent;
