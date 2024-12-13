import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RegisterUser, reset } from "../features/authSlice";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isError, isRegistered, isLoading, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    dispatch(reset());
  }, [dispatch]);

  useEffect(() => {
    if (isRegistered) {
      console.log("berhasil");
      navigate("/login");
      dispatch(reset());
    }
  }, [isError, dispatch, navigate]);

  const handleRegister = (e) => {
    e.preventDefault();
    dispatch(RegisterUser({ email, firstName, lastName, password }));
  };

  return (
    <div>
      <h1>register</h1>
      <form onSubmit={handleRegister}>
        <div className="field">
          <label htmlFor="email">email: </label>
          <input
            type="email"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="field">
          <label htmlFor="first_name">First Name: </label>
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div className="field">
          <label htmlFor="last_name">Last Name: </label>
          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div className="field">
          <label htmlFor="password">Password: </label>
          <input
            type="password"
            placeholder="********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="field">
          <label htmlFor="confpassword">Confirm Password: </label>
          <input
            type="password"
            placeholder="********"
            value={confPassword}
            onChange={(e) => setConfPassword(e.target.value)}
          />
        </div>
        <div className="field">
          <button type="submit">kirim</button>
        </div>
      </form>
    </div>
  );
};

export default Register;
