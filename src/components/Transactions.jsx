import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTransactions,
  incrementOffset,
} from "../features/transactionSlice";
import Navbar from "./Navbar";
import Profile from "./Profile";
import Balance from "./Balance";

const Transactions = () => {
  const { transactions, isLoading, isError, message, offset, limit } =
    useSelector((state) => state.transactions);
  const dispatch = useDispatch();

  useEffect(() => {
    if (transactions.records.length === 0) {
      dispatch(fetchTransactions());
    }
  }, [dispatch, transactions.records.length]);

  console.log(transactions);

  const loadMore = () => {
    dispatch(incrementOffset());
    dispatch(fetchTransactions());
  };

  const renderTransactionType = (type) => {
    switch (type) {
      case "PAYMENT":
        return "text-red-500";
      case "TOPUP":
        return "text-green-500";
      default:
        return "text-black";
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
        <div className="mt-6">
          <h1 className="text-2xl font-bold">Semua Transaksi</h1>
        </div>

        <div className="mt-6">
          {isLoading ? (
            <p>Loading...</p>
          ) : isError ? (
            <p>Error: {message}</p>
          ) : transactions?.records?.length > 0 ? (
            <div className="space-y-4">
              {transactions.records.map((transaction) => (
                <div
                  key={transaction.invoice_number}
                  className="border-b p-4 flex justify-between items-center"
                >
                  <div>
                    <p
                      className={`font-bold ${renderTransactionType(
                        transaction.transaction_type
                      )}`}
                    >
                      {transaction.transaction_type === "TOPUP" ? "+" : "-"} Rp{" "}
                      {transaction.total_amount.toLocaleString()}
                    </p>
                    <p className="text-gray-500 text-sm">
                      {new Date(transaction.created_on).toLocaleString(
                        "id-ID",
                        {
                          day: "2-digit",
                          month: "long",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        }
                      )}
                    </p>
                  </div>
                  <p className="text-gray-700 text-sm">
                    {transaction.description}
                  </p>
                </div>
              ))}
              {transactions.records.length >= limit && (
                <button
                  onClick={loadMore}
                  className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600"
                >
                  Show More
                </button>
              )}
            </div>
          ) : (
            <p className="text-gray-500">Tidak ada data</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Transactions;
