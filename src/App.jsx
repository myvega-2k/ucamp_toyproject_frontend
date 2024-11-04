import { Routes, Route } from "react-router-dom";

import "./App.css";
import ListEmployeeComponent from "src/components/ListEmployeeComponent";
import EmployeeComponent from "src/components/EmployeeComponent";
import ListDepartmentComponent from "src/components/ListDepartmentComponent";
import DepartmentComponent from "src/components/DepartmentComponent";
import LoginComponent from "src/components/common/LoginComponent";
import RequireAuth from 'src/components/common/RequireAuth';
import Layout from 'src/components/common/Layout';
import Unauthorized from 'src/components/common/Unauthorized';
import Missing from 'src/components/common/Missing';


const ROLES = {
  'User': 'ROLE_USER',//2001,
  'Editor': 'ROLE_ADMIN',//1984,
  'Admin': 'ROLE_ADMIN'
};

function App() {
  return (
    <>
        <Routes>
          <Route path="/" element={<Layout />}>
            {/* // http://localhost:3000/login */}
            <Route path="/login" element={<LoginComponent />} />
            <Route path="unauthorized" element={<Unauthorized />} />

            {/* // http://localhost:3000 */}
            <Route path="/" element={<ListEmployeeComponent />} />
            {/* // http://localhost:3000/employees */}
            <Route path="/employees" element={<ListEmployeeComponent />} />
            {/* // http://localhost:3000/add-employee */}
            <Route path="/add-employee" element={<EmployeeComponent />} />
            {/* // http://localhost:3000/edit-employee/1 */}
            <Route path="/edit-employee/:id" element={<EmployeeComponent />} />

            <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
              {/* // http://localhost:3000/departments */}
              <Route path='/departments' element = { <ListDepartmentComponent />} />
            </Route> 

            <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>         
              {/* // http://localhost:3000/add-department */}
              <Route path='/add-department' element = { <DepartmentComponent /> } />
            </Route>
            {/* // http://localhost:3000/edit-department/1 */}
            <Route path='/edit-department/:id' element = { <DepartmentComponent />} />

            {/* catch all */}
            <Route path="*" element={<Missing />} />
          </Route>          
        </Routes>
    </>
  );
}

export default App;
