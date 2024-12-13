import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div>
      <div className="navbar bg-base-100 shadow-md">
        <div className="flex-1">
          <Link to={"/homepage"} className="btn btn-ghost text-xl">
            SIMS PPOB
          </Link>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link to={"/topup"}>Top Up</Link>
            </li>
            <li>
              <Link to={"/transactions"}>Transaction</Link>
            </li>
            <li>
              <Link to={"/profile"}>Akun</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
