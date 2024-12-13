import React, { useEffect } from "react";
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
  const { services, isLoading, isError } = useSelector(
    (state) => state.services
  );
  const { message, isError: isTransactionError } = useSelector(
    (state) => state.transactions
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

  if (!service) {
    return <div>Service not found</div>;
  }

  const handlePayment = () => {
    if (balance >= service.service_tariff) {
      dispatch(
        createTransaction({
          serviceId: service.service_code,
          tariff: service.service_tariff,
        })
      ).then(() => {
        dispatch(fetchTransactions()); // Panggil ulang fetchTransactions
      });
    } else {
      alert("Saldo tidak cukup untuk melakukan pembayaran.");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="grid grid-cols-3 gap-4 items-center">
        <div className="col-span-1">
          <Profile />
        </div>
        <div className="col-span-2 bg-red-500 rounded-lg p-4">
          <Balance />
        </div>
      </div>
      <h1>{service.service_name}</h1>
      <img src={service.service_icon} alt={service.service_name} />
      <p>Tariff: Rp {service.service_tariff.toLocaleString()}</p>
      <button onClick={handlePayment}>Bayar</button>
      {message && <p>{message}</p>}
      {isTransactionError && <p>Terjadi kesalahan dalam transaksi.</p>}
    </div>
  );
};

export default ServicePayment;
