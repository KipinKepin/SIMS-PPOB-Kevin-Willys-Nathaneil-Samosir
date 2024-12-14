import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LoginUser } from "../features/authSlice";
import { EnvelopeIcon, LockClosedIcon } from "@heroicons/react/24/outline";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, token, isLoading, isError, message } = useSelector(
    (state) => state.auth
  );

  const [error, setError] = useState("");

  useEffect(() => {
    if (user && token) {
      navigate("/homepage");
    }
  }, [user, token, navigate]);

  const handleLogin = (e) => {
    e.preventDefault();

    // Validasi Input
    if (!email || !password) {
      setError("Email dan Password harus diisi.");
      return;
    }

    setError("");
    dispatch(LoginUser({ email, password }));
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen">
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-white h-screen">
        <div className="w-full max-w-md p-8 space-y-6">
          <div className="text-center flex items-center justify-center gap-2">
            <img src="/assets/logo.png" alt="Logo" />
            <h1 className="font-bold text-lg">SIMS PPOB</h1>
          </div>
          <h1 className="text-xl lg:text-3xl font-bold text-center text-gray-800">
            Masuk atau buat akun untuk memulai
          </h1>

          {/* Validasi Error */}
          {error && (
            <div className="bg-red-500 text-white text-center p-2 rounded-md flex justify-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 shrink-0 stroke-current"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
              <p className="flex justify-between">{error}</p>
            </div>
          )}

          {/* Jika Login Gagal */}
          {isError && (
            <div className="bg-red-500 text-white text-center p-2 rounded-md flex justify-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 shrink-0 stroke-current"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
              <p className="flex justify-between">
                {message || "Login gagal. Periksa email dan password Anda."}
              </p>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
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
              <LockClosedIcon className="h-6 w-6 ml-3 text-gray-500 mr-3" />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input w-full border-0 focus:ring-0 rounded-md"
              />
            </div>

            <div>
              <button
                type="submit"
                className="btn btn-error w-full text-white rounded-md"
                disabled={isLoading}
              >
                {isLoading ? "Loading..." : "Masuk"}
              </button>
            </div>
          </form>

          <p className="text-center text-sm text-gray-600">
            Belum punya akun? Registrasi{" "}
            <a href="/" className="text-red-500 hover:underline">
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
          src="/assets/login-register-bg.png"
          alt="Login Illustration"
          className="w-full h-screen object-cover"
        />
      </div>
    </div>
  );
};

export default Login;
