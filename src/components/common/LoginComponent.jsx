import { useRef, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import useAuthContext from 'src/hooks/useAuthContext';

import axios from 'src/services/axiosCreate';
const LOGIN_URL = '/users/login';

const LoginComponent = () => {
  const { setAuth } = useAuthContext();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  
  const emailRef = useRef();
  const errRef = useRef();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errMsg, setErrMsg] = useState('');

  useEffect(() => {
      emailRef.current.focus();
  }, [])

  useEffect(() => {
      setErrMsg('');
  }, [email, password])

  const handleSubmit = async (e) => {
      e.preventDefault();

      try {
          const response = await axios.post(LOGIN_URL,
              JSON.stringify({ email, password }),
              {
                  headers: { 'Content-Type': 'application/json' },
                  withCredentials: true
              }
          );
          console.log(' 응답 데이터 ' + JSON.stringify(response?.data));
          const accessToken = response?.data?.accessToken;
          const roles = response?.data?.roles;          
          setAuth({ email, password, roles, accessToken, isAuthenticated: true });
          setEmail('');
          setPassword('');
          navigate(from, { replace: true });
      } catch (err) {
          if (err?.response) {
              setErrMsg(err.response?.data?.message);
          // } else if (err.response?.data?.statusCode === 400) {
          //     setErrMsg(err.response?.data?.message);
          // } else if (err.response?.status === 401) {
          //     setErrMsg('Unauthorized');
          // } else {
          //     setErrMsg('Login Failed');
          }
          errRef.current.focus();
      }
  }
  return (
    <div>
      <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
      <h1 className="text-success text-center mt-3">LogIn</h1>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card">
              <div className="card-body">
                <form id="registrationForm" onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      ref={emailRef}
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mt-3 form-group">
                    <label htmlFor="password">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mt-3 form-group">
                    <button className="btn btn-danger">Login</button>
                  </div>
                </form>
                <p className="mt-3">
                  Not registered?
                  <a href="#">Create an account</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginComponent;
