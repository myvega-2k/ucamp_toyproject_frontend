import { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";

import useAxiosPrivate from "src/hooks/useAxiosPrivate";

import {
  createEmployee,
  getEmployee,
  updateEmployee,
} from "src/services/EmployeeService";
import { getAllDepartments } from "src/services/DepartmentService";

const EmployeeComponent = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [departmentId, setDepartmentId] = useState("");
  const [departments, setDepartments] = useState([]);
  const [errMsg, setErrMsg] = useState("");

  const { id } = useParams();
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    department: "",
  });

  const axiosPrivate = useAxiosPrivate();

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    //Departments Name 목록을 요청하기
    listOfDepartmentNames();
  }, []);

  useEffect(() => {
    //update를 위하여 먼저 조회 요청하기
    if (id) {
      getEmployeeById(id);
    }
  }, [id]);

  const listOfDepartmentNames = async () => {
    try {
      const response = await axiosPrivate.get("/employees/departmentNames");
      setDepartments(response.data);
    } catch (err) {
      console.error(err);
      if (err?.response) {
        console.error(err);
        setErrMsg(err.response?.data?.message);
      }
      //navigate("/login", { state: { from: location }, replace: true });
    }
  };

  const getEmployeeById = async (id) => {
    try {
      const response = await axiosPrivate.get(`/employees/${id}`);
      setFirstName(response.data.firstName);
      setLastName(response.data.lastName);
      setEmail(response.data.email);
      setDepartmentId(response.data.departmentId);
    } catch (err) {
      console.error(err);
      if (err?.response) {
        console.error(err);
        setErrMsg(err.response?.data?.message);
      }
      navigate("/login", { state: { from: location }, replace: true });
    }
  };

  const saveOrUpdateEmployee = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      const employee = { firstName, lastName, email, departmentId };
      
      console.log(`>>>>>useAuth  ${JSON.stringify(employee)}`)
      
      try {
        if (id) {
          await axiosPrivate.put(`/employees/${id}`, employee);
        } else {
          await axiosPrivate.post(`/employees`, employee);
        }
        navigate("/employees", { state: { from: location }, replace: true });
      } catch (err) {
        console.error(err);
        if (err?.response) {
          console.error(err);
          setErrMsg(err.response?.data?.message);
        }
        navigate("/login", { state: { from: location }, replace: true });
      }
    }// validateForm
  };

  function validateForm() {
    let valid = true;

    const errorsCopy = { ...errors };

    if (firstName.trim()) {
      errorsCopy.firstName = "";
    } else {
      errorsCopy.firstName = "First name is required";
      valid = false;
    }

    if (lastName.trim()) {
      errorsCopy.lastName = "";
    } else {
      errorsCopy.lastName = "Last name is required";
      valid = false;
    }

    if (email.trim()) {
      errorsCopy.email = "";
    } else {
      errorsCopy.email = "Email is required";
      valid = false;
    }

    if (departmentId) {
      errorsCopy.department = "";
    } else {
      errorsCopy.department = "Select Department";
      valid = false;
    }

    setErrors(errorsCopy);

    return valid;
  }

  function pageTitle() {
    if (id) {
      return <h2 className="text-center">Update Employee</h2>;
    } else {
      return <h2 className="text-center">Add Employee</h2>;
    }
  }

  return (
    <div className="container">
      <br /> <br />
      <div className="row">
        <div className="card col-md-6 offset-md-3 offset-md-3">
          {pageTitle()}
          <p className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">
            {errMsg}
          </p>
          <div className="card-body">
            <form>
              <div className="form-group mb-2">
                <label className="form-label">First Name:</label>
                <input
                  type="text"
                  placeholder="Enter Employee First Name"
                  name="firstName"
                  value={firstName}
                  className={`form-control ${
                    errors.firstName ? "is-invalid" : ""
                  }`}
                  onChange={(e) => setFirstName(e.target.value)}
                ></input>
                {errors.firstName && (
                  <div className="invalid-feedback"> {errors.firstName} </div>
                )}
              </div>

              <div className="form-group mb-2">
                <label className="form-label">Last Name:</label>
                <input
                  type="text"
                  placeholder="Enter Employee Last Name"
                  name="lastName"
                  value={lastName}
                  className={`form-control ${
                    errors.lastName ? "is-invalid" : ""
                  }`}
                  onChange={(e) => setLastName(e.target.value)}
                ></input>
                {errors.lastName && (
                  <div className="invalid-feedback"> {errors.lastName} </div>
                )}
              </div>

              <div className="form-group mb-2">
                <label className="form-label">Email:</label>
                <input
                  type="text"
                  placeholder="Enter Employee Email"
                  name="email"
                  value={email}
                  className={`form-control ${errors.email ? "is-invalid" : ""}`}
                  onChange={(e) => setEmail(e.target.value)}
                ></input>
                {errors.email && (
                  <div className="invalid-feedback"> {errors.email} </div>
                )}
              </div>

              <div className="form-group mb-2">
                <label className="form-label">Select Department:</label>
                <select
                  className={`form-control ${
                    errors.department ? "is-invalid" : ""
                  }`}
                  value={departmentId}
                  onChange={(e) => setDepartmentId(e.target.value)}
                >
                  <option value="Select Department">Select Department</option>
                  {departments.map((department) => (
                    <option key={department.id} value={department.id}>
                      {department.departmentName}
                    </option>
                  ))}
                </select>
                {errors.department && (
                  <div className="invalid-feedback"> {errors.department} </div>
                )}
              </div>
              <button
                className="btn btn-success"
                onClick={saveOrUpdateEmployee}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeComponent;
