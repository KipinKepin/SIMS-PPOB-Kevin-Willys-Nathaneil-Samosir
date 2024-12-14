import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RegisterUser, reset } from "../features/authSlice";
import {
  EnvelopeIcon,
  UserIcon,
  LockClosedIcon,
} from "@heroicons/react/24/outline";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [error, setError] = useState("");

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
  }, [isRegistered, dispatch, navigate]);

  const handleRegister = (e) => {
    e.preventDefault();
    validateInput();
  };

  // validasi
  const validateInput = () => {
    setError("");

    if (!email || !firstName || !lastName || !password || !confPassword) {
      setError("Semua field harus diisi!");
      return;
    }

    if (password.length < 8) {
      setError("Password minimal 8 karakter.");
      return;
    }

    if (password !== confPassword) {
      setError("Password dan Konfirmasi Password tidak cocok.");
      return;
    }

    dispatch(RegisterUser({ email, firstName, lastName, password }));
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen">
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-white h-screen">
        <div className="w-full max-w-md p-8 space-y-6">
          <div className="text-center flex items-center justify-center gap-2">
            <img src="../../public/assets/logo.png" alt="Logo" />
            <h1 className="font-bold text-lg">SIMS PPOB</h1>
          </div>
          <h1 className="text-xl lg:text-3xl font-bold text-center text-gray-800">
            Lengkapi data untuk membuat akun
          </h1>

          {/* Error Messages */}
          {error && (
            <div className="bg-red-500 text-white text-center p-2 rounded-md flex justify-center gap-2">
              <p>{error}</p>
            </div>
          )}
          {isError && (
            <div className="bg-red-500 text-white text-center p-2 rounded-md flex">
              <p>{message}</p>
            </div>
          )}

          <form onSubmit={handleRegister} className="space-y-4">
            <div className="flex items-center border border-gray-300 rounded-md">
              <EnvelopeIcon className="h-6 w-6 ml-3 text-gray-500 mr-3" />
              <input
                type="email"
                placeholder="Masukkan email anda"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input w-full border-0 focus:ring-0 rounded-md"
              />
            </div>

            <div className="flex items-center border border-gray-300 rounded-md">
              <UserIcon className="h-6 w-6 ml-3 text-gray-500 mr-3" />
              <input
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="input w-full border-0 focus:ring-0 rounded-md"
              />
            </div>

            <div className="flex items-center border border-gray-300 rounded-md">
              <UserIcon className="h-6 w-6 ml-3 text-gray-500 mr-3" />
              <input
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="input w-full border-0 focus:ring-0 rounded-md"
              />
            </div>

            <div className="flex items-center border border-gray-300 rounded-md">
              <LockClosedIcon className="h-6 w-6 ml-3 text-gray-500 mr-3" />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input w-full border-0 focus:ring-0 rounded-md"
              />
            </div>

            <div className="flex items-center border border-gray-300 rounded-md">
              <LockClosedIcon className="h-6 w-6 ml-3 text-gray-500 mr-3" />
              <input
                type="password"
                placeholder="Confirm Password"
                value={confPassword}
                onChange={(e) => setConfPassword(e.target.value)}
                className="input w-full border-0 focus:ring-0 rounded-md"
              />
            </div>

            <div>
              <button
                type="submit"
                className="btn btn-error w-full text-white rounded-md"
                disabled={isLoading}
              >
                {isLoading ? "Loading..." : "Daftar"}
              </button>
            </div>
          </form>

          <p className="text-center text-sm text-gray-600">
            Sudah punya akun? Login{" "}
            <a href="/login" className="text-red-500 hover:underline">
              di sini
            </a>
          </p>
        </div>
      </div>

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
