import React, { useState } from "react";
import Profile from "./Profile";
import Balance from "./Balance";
import Navbar from "./Navbar";
import { useDispatch } from "react-redux";
import { topUpBalance } from "../features/topUpSlice";
import { fetchBalance } from "../features/balanceSlice";

const TopUp = () => {
  const [amount, setAmount] = useState(0);
  const [isValid, setIsValid] = useState(false);
  const [confirmModal, setConfirmModal] = useState(false);
  const [resultModal, setResultModal] = useState({
    open: false,
    success: false,
  });
  const [emptyAmount, setEmptyAmount] = useState(true);
  const dispatch = useDispatch();

  const validateAmount = (value) => {
    const num = Number(value);
    if (num >= 10000 && num <= 1000000) {
      setIsValid(true);
      setEmptyAmount(false);
    } else {
      setIsValid(false);
      setEmptyAmount(true);
    }
  };

  const handleAmountChange = (e) => {
    const value = e.target.value;
    setAmount(value);
    validateAmount(value);
  };

  const handleQuickSelect = (value) => {
    setAmount(value);
    validateAmount(value);
  };

  const handleAddBalance = () => {
    dispatch(topUpBalance(Number(amount)))
      .unwrap()
      .then(() => {
        setResultModal({ open: true, success: true });
        dispatch(fetchBalance());
      })
      .catch(() => {
        setResultModal({ open: true, success: false });
      });
  };

  const quickSelectValues = [10000, 20000, 50000, 100000, 250000, 500000];

  return (
    <div className="bg-white min-h-screen font-sans">
      <Navbar />
      <div className="px-8 py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
          <div className="col-span-1">
            <Profile />
          </div>
          <div className="col-span-2">
            <div className="rounded-xl text-white">
              <Balance />
            </div>
          </div>
        </div>
        <div className="mt-6">
          <p className="text-lg">Silahkan Masukkan</p>
          <h1 className="text-2xl font-bold">Nominal Top Up</h1>
        </div>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
          <form
            className="flex flex-col gap-4 md:col-span-2"
            onSubmit={(e) => {
              e.preventDefault();
              if (isValid) setConfirmModal(true);
            }}
          >
            <label className="input input-bordered flex items-center gap-2 w-full">
              <input
                type="number"
                className="grow border rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="masukkan nominal Top Up"
                value={amount}
                onChange={handleAmountChange}
              />
            </label>
            <button
              className={`py-2 px-4 rounded-lg w-full md:w-auto ${
                isValid
                  ? "bg-blue-500 hover:bg-blue-600 text-white"
                  : "bg-gray-400 cursor-not-allowed text-gray-700"
              }`}
              type="submit"
              disabled={!isValid}
            >
              Top Up
            </button>
          </form>

          {/* Quick Select buttons */}
          <div className="grid grid-cols-3 gap-4 md:col-span-1">
            {quickSelectValues.map((value) => (
              <button
                key={value}
                onClick={() => handleQuickSelect(value)}
                className={`py-2 px-4 rounded-lg border text-center ${
                  Number(amount) === value
                    ? "bg-blue-500 text-white"
                    : "bg-white text-black border-gray-300 hover:bg-gray-100"
                }`}
              >
                Rp {value.toLocaleString()}
              </button>
            ))}
          </div>
        </div>
        {/* Confirmation Modal */}
        {confirmModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg w-80">
              <h2 className="text-lg font-semibold text-center">
                Konfirmasi Top Up
              </h2>
              <p className="text-center mt-2">
                Apakah Anda yakin ingin menambah saldo sebesar Rp{" "}
                {Number(amount).toLocaleString()}?
              </p>
              <div className="flex justify-between mt-4">
                <button
                  className="bg-gray-300 text-black py-2 px-4 rounded-lg"
                  onClick={() => setConfirmModal(false)}
                >
                  Batalkan
                </button>
                <button
                  className="bg-blue-500 text-white py-2 px-4 rounded-lg"
                  onClick={() => {
                    setConfirmModal(false);
                    handleAddBalance();
                  }}
                >
                  Iya
                </button>
              </div>
            </div>
          </div>
        )}
        {emptyAmount ? (
          <div className="mt-6 lg:mt-1 text-orange-500">
            <p>*Tidak dapat melakukan topup jika:</p>
            <ol>
              <li>1. Kurang dari Rp. 10.000</li>
              <li>2. Lebih dari Rp. 1.000.000</li>
            </ol>
          </div>
        ) : (
          <p>hai</p>
        )}
        {/* Result Modal */}
        {resultModal.open && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg w-80 text-center">
              <div className="flex justify-center mb-4">
                {resultModal.success ? (
                  <div className="text-green-500 text-3xl">✔</div>
                ) : (
                  <div className="text-red-500 text-3xl">✖</div>
                )}
              </div>
              <h2 className="text-lg font-semibold">
                {resultModal.success ? "Top-up Berhasil!" : "Top-up Gagal"}
              </h2>
              <p className="mt-2">
                {resultModal.success
                  ? "Saldo Anda berhasil ditambahkan."
                  : "Terjadi kesalahan, silakan coba lagi."}
              </p>
              <button
                className="w-full bg-blue-500 text-white py-2 rounded-lg mt-4"
                onClick={() => setResultModal({ open: false, success: false })}
              >
                Tutup
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TopUp;
