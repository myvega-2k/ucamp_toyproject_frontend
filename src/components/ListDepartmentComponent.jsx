import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

import useAxiosPrivate from "src/hooks/useAxiosPrivate";

const ListDepartmentComponent = () => {
  const [departments, setDepartments] = useState([]);
  const [errMsg, setErrMsg] = useState("");

  const axiosPrivate = useAxiosPrivate();

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    listOfDepartments();
  }, []);

  const listOfDepartments = async () => {
    try {
      const response = await axiosPrivate.get("/departments");
      setDepartments(response.data);
    } catch (err) {
      console.error(err);
      if (err?.response) {
        console.error(err);
        setErrMsg(err.response?.data?.message);
      }
      navigate("/login", { state: { from: location }, replace: true });
    }
  };

  function updateDepartment(id) {
    navigate(`/edit-department/${id}`);
  }

  const removeDepartment = async (id) => {
    if (window.confirm(`ID = ${id} Are you sure?`)) {
      try {
        await axiosPrivate.delete(`/departments/${id}`);
        // navigate("/departments", {
        //   state: { from: location },
        //   replace: false,
        // });
        listOfDepartments();
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
      <h2 className="text-center">List of Departments</h2>
      <p className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">
        {errMsg}
      </p>
      <Link to="/add-department" className="btn btn-primary mb-2">
        Add Department
      </Link>
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>Department Id</th>
            <th>Department Name</th>
            <th>Department Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {departments.map((department) => (
            <tr key={department.id}>
              <td> {department.id} </td>
              <td> {department.departmentName} </td>
              <td> {department.departmentDescription} </td>
              <td>
                <button
                  onClick={() => updateDepartment(department.id)}
                  className="btn btn-info"
                >
                  Update
                </button>
                <button
                  onClick={() => removeDepartment(department.id)}
                  className="btn btn-danger"
                  style={{ marginLeft: "10px" }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListDepartmentComponent;
