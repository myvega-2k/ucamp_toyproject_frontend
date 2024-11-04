import { NavLink } from "react-router-dom";
import useAuthContext from "src/hooks/useAuthContext";

const HeaderComponent = () => {
  const { auth, setAuth } = useAuthContext();

  const logout = () => {
    setAuth({ isAuthenticated: false });
  };

  return (
    <div>
      <header>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          {/* <a className="navbar-brand" href="https://react.dev/">Employee Management System</a> */}

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <NavLink className="nav-link" to="/employees">
                  Employees
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink className="nav-link" to="/departments">
                  Departments
                </NavLink>
              </li>
              <li>
                {auth?.isAuthenticated ? (
                  <>
                    <div className="nav-link">{auth.email}</div>
                    <button onClick={logout}>LogOut</button>
                  </>
                ) : (
                  <NavLink className="nav-link" to="/login">
                    Login
                  </NavLink>
                )}
              </li>
            </ul>
          </div>
          <div className="navbar-brand">{import.meta.env.VITE_MODE}</div>
        </nav>
      </header>
    </div>
  );
};

export default HeaderComponent;
