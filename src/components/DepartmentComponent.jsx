import { useEffect, useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";

import useAxiosPrivate from "src/hooks/useAxiosPrivate";

const DepartmentComponent = () => {
  const [departmentName, setDepartmentName] = useState("");
  const [departmentDescription, setDepartmentDescription] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const { id } = useParams();

  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (id) {
      getDepartmentById(id);
    }
  }, [id]);

  const getDepartmentById = async (id) => {
    try {
      const response = await axiosPrivate.get(`/departments/${id}`);
      setDepartmentName(response.data.departmentName);
      setDepartmentDescription(response.data.departmentDescription);
    } catch (err) {
      console.error(err);
      if (err?.response) {
        console.error(err);
        setErrMsg(err.response?.data?.message);
      }
      navigate("/login", { state: { from: location }, replace: true });
    }
  };

  const saveOrUpdateDepartment = async (e) => {
    e.preventDefault();

    const department = { departmentName, departmentDescription };

    try {
      if (id) {
        await axiosPrivate.put(`/departments/${id}`, department);
      } else {
        await axiosPrivate.post(`/departments`, department);
      }
      navigate("/departments", { state: { from: location }, replace: true });

    } catch (err) {
      console.error(err);
      if (err?.response) {
        console.error(err);
        setErrMsg(err.response?.data?.message);
      }
      navigate("/login", { state: { from: location }, replace: true });
    }
  };

  function pageTitle() {
    if (id) {
      return <h2 className="text-center">Update Department</h2>;
    } else {
      return <h2 className="text-center">Add Department</h2>;
    }
  }

  return (
    <div className="container">
      <br />
      <br />
      <div className="row">
        <div className="card col-md-6 offset-md-3 offset-md-3">
          {pageTitle()}
          <p className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">
            {errMsg}
          </p>
          <div className="card-body">
            <form>
              <div className="form-group mb-2">
                <label className="form-label">Department Name:</label>
                <input
                  type="text"
                  name="departmentName"
                  placeholder="Enter Department Name"
                  className="form-control"
                  value={departmentName}
                  onChange={(e) => setDepartmentName(e.target.value)}
                ></input>
              </div>

              <div className="form-group mb-2">
                <label className="form-label">Department Description:</label>
                <input
                  type="text"
                  name="departmentDescription"
                  placeholder="Enter Department Description"
                  value={departmentDescription}
                  onChange={(e) => setDepartmentDescription(e.target.value)}
                  className="form-control"
                ></input>
              </div>
              <button
                className="btn btn-success mb-2"
                onClick={(e) => saveOrUpdateDepartment(e)}
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

export default DepartmentComponent;
