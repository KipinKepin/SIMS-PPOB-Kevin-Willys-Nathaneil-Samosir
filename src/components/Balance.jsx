import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBalance } from "../features/balanceSlice";

const Balance = () => {
  const { balance } = useSelector((state) => state.balance);
  const dispatch = useDispatch();
  const [isHidden, setIsHidden] = useState(true);

  useEffect(() => {
    dispatch(fetchBalance());
  }, [dispatch]);

  const toggleBalance = () => {
    setIsHidden(!isHidden);
  };

  return (
    <div
      className="text-left"
      style={{
        background: "url(../../public/assets/balance_bg.png)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        padding: "25px",
        borderRadius: "25px",
      }}
    >
      <p className="text-lg">Saldo Anda</p>
      <h1 className="text-3xl font-bold my-4">
        {isHidden
          ? "Rp. ********"
          : `Rp. ${balance.toLocaleString("id-ID")}, -`}
      </h1>
      <button
        onClick={toggleBalance}
        className="btn btn-sm btn-outline text-white border-white hover:bg-white hover:text-red-500"
      >
        {isHidden ? "Lihat Saldo" : "Sembunyikan Saldo"}
      </button>
    </div>
  );
};

export default Balance;
