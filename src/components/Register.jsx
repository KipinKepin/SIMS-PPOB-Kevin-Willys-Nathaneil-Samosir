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
    <div className="flex flex-col lg:flex-row h-screen">
      {/* Bagian Kiri */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-white h-screen">
        <div className="w-full max-w-md p-8 space-y-6">
          <div className="text-center flex items-center justify-center gap-2">
            <img src="../../public/assets/logo.png" alt="" />
            <h1 className="font-bold text-lg">SIMS PPOB</h1>
          </div>
          <h1 className="text-xl lg:text-3xl font-bold text-center text-gray-800">
            Lengkapi data untuk membuat akun
          </h1>
          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <input
                type="email"
                placeholder="Masukkan email anda"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input input-bordered w-full rounded-md"
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="input input-bordered w-full rounded-md"
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="input input-bordered w-full rounded-md"
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input input-bordered w-full rounded-md"
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Confirm Password"
                value={confPassword}
                onChange={(e) => setConfPassword(e.target.value)}
                className="input input-bordered w-full rounded-md"
              />
            </div>
            <div>
              <button
                type="submit"
                className="btn btn-error w-full text-white rounded-md"
              >
                Daftar
              </button>
            </div>
          </form>
          <p className="text-center text-sm text-gray-600">
            sudah punya akun? login{" "}
            <a href="/login" className="text-red-500 hover:underline">
              di sini
            </a>
          </p>
        </div>
      </div>
      {/* Bagian Kanan */}
      <div
        className="hidden lg:flex w-1/2 items-center justify-center bg-pink-50 overflow-hidden"
        style={{ backgroundColor: "#FDE2E2" }}
      >
        <img
          src="../../public/assets/login-register-bg.png"
          alt="Register Illustration"
          className="w-full h-screen object-cover"
        />
      </div>
    </div>
  );
};

export default Register;
