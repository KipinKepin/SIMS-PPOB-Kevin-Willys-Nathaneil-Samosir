import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LoginUser } from "../features/authSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, token, isLoading, isError } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (user && token) {
      navigate("/homepage");
    }
  }, [user, token, navigate]);

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(LoginUser({ email, password }));
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
            Masuk atau buat akun untuk memulai
          </h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="email"
                placeholder="masukkan email anda"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input input-bordered w-full rounded-md"
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="masukkan password anda"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input input-bordered w-full rounded-md"
              />
            </div>
            <div>
              <button
                type="submit"
                className="btn btn-error w-full text-white rounded-md"
              >
                Masuk
              </button>
            </div>
          </form>
          <p className="text-center text-sm text-gray-600">
            belum punya akun? registrasi{" "}
            <a href="/" className="text-red-500 hover:underline">
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
          alt="Login Illustration"
          className="w-full max-h-screen object-cover"
        />
      </div>
    </div>
  );
};

export default Login;
