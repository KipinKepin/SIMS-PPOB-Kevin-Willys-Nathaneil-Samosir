import React from "react";
import Profile from "./Profile";
import Balance from "./Balance";
import Services from "./Services";
import Banner from "./Banner";
import Navbar from "./Navbar";

const Homepage = () => {
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

        {/* Services */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Layanan</h2>
          <Services />
        </div>

        {/* Banner */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Temukan Promo Menarik</h2>
          <Banner />
        </div>
      </div>
    </div>
  );
};

export default Homepage;
