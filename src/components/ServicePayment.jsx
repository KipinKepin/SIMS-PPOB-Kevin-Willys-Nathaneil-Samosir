import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchServices } from "../features/servicesSlice";
import { useParams } from "react-router-dom";
import Balance from "./Balance";
import Profile from "./Profile";
import Navbar from "./Navbar";
import { fetchBalance } from "../features/balanceSlice";
import {
  createTransaction,
  fetchTransactions,
} from "../features/transactionSlice";

const ServicePayment = () => {
  const [confirmModal, setConfirmModal] = useState(false);
  const [resultModal, setResultModal] = useState({
    open: false,
    success: false,
    msg: "",
  });
  const { services, isLoading, isError } = useSelector(
    (state) => state.services
  );

  const { balance } = useSelector((state) => state.balance);

  const dispatch = useDispatch();
  const { serviceId } = useParams();

  useEffect(() => {
    dispatch(fetchServices());
    dispatch(fetchBalance());
  }, [dispatch]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading services</div>;
  }

  const service = services?.find((s) => s.service_code === serviceId);
  console.log(service);

  if (!service) {
    return <div>Service not found</div>;
  }

  const handlePayment = async () => {
    if (balance >= service.service_tariff) {
      try {
        const result = await dispatch(
          createTransaction({
            serviceId: service.service_code,
            tariff: service.service_tariff,
          })
        ).unwrap(); // Await the promise and get the actual result
        console.log(result);

        if (result.message == "Transaksi berhasil") {
          setResultModal({
            open: true,
            success: true,
            msg: "Berhasil melakukan pembayaran 😄",
          });
        } else {
          setResultModal({
            open: true,
            success: false,
            msg: "Terjadi kesalahan, silakan coba lagi 😔",
          });
        }
      } catch (error) {
        setResultModal({
          open: true,
          success: false,
          msg: "Terjadi kesalahan, silakan coba lagi 😔",
        });
      }
      dispatch(fetchTransactions());
    } else {
      setResultModal({
        open: true,
        success: false,
        msg: "Saldo tidak mencukupi, silahkan menuju ke halaman topup",
      });
    }
  };

  return (
    <div className="bg-white min-h-screen font-sans">
      <Navbar />
      <div className="container mx-auto px-8 py-6">
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
        <div className="mt-6 flex flex-col gap-4">
          <h1 className="text-2xl font-semibold">Pembayaran</h1>
          <div className="flex gap-4 items-center">
            <img
              className="w-12 h-12"
              src={service.service_icon}
              alt={service.service_name}
            />
            <h1 className="font-bold">{service.service_name}</h1>
          </div>
          <div>
            <input
              type="text"
              value={service.service_tariff.toLocaleString()}
              disabled
              className="w-full border rounded-lg px-4 py-2 bg-gray-100 cursor-not-allowed"
            />
          </div>
          <div>
            <button
              className="w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg"
              onClick={() => setConfirmModal(true)}
            >
              Bayar
            </button>
          </div>
        </div>
      </div>
      {confirmModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-80">
            <h2 className="text-lg font-semibold text-center">
              Konfirmasi Pembayaran
            </h2>
            <p className="text-center mt-2">
              Bayar senilai
              {` Rp. ${service.service_tariff.toLocaleString()}?`}
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
                  handlePayment();
                }}
              >
                Iya
              </button>
            </div>
          </div>
        </div>
      )}
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
              {resultModal.success
                ? "Pembayaran Berhasil!"
                : "Pembayaran Gagal"}
            </h2>
            <p className="mt-2">{resultModal.msg}</p>
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
  );
};

export default ServicePayment;
