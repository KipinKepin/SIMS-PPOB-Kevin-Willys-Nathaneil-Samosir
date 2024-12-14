import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <nav className="navbar container mx-auto flex items-center justify-between py-4 px-6">
        {/* Logo Section */}
        <div className="flex items-center gap-3">
          <img
            src="/assets/logo.png"
            alt="SIMS PPOB Logo"
            className="h-8 w-8"
          />
          <Link
            to="/homepage"
            className="text-md font-bold text-gray-800 lg:text-xl"
          >
            SIMS PPOB
          </Link>
        </div>

        {/* Menu Section */}
        <ul className="flex items-center gap-6 text-gray-700">
          <li>
            <Link
              to="/topup"
              className="hover:text-red-500 transition duration-300"
            >
              Top Up
            </Link>
          </li>
          <li>
            <Link
              to="/transactions"
              className="hover:text-red-500 transition duration-300"
            >
              Transaction
            </Link>
          </li>
          <li>
            <Link
              to="/profile"
              className="hover:text-red-500 transition duration-300"
            >
              Akun
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
