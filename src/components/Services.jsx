import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchServices } from "../features/servicesSlice";
import { Link } from "react-router-dom";

const Services = () => {
  const { services } = useSelector((state) => state.services);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchServices());
  }, [dispatch]);

  console.log(services);

  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 gap-4 w-full lg:flex lg:justify-between">
      {services && services.length > 0 ? (
        services.map((service, index) => (
          <Link
            to={`/${service.service_code}`}
            key={index}
            className="flex flex-col items-center p-4 bg-gray-100 rounded-lg shadow hover:bg-gray-200 transition w-full sm:w-auto"
          >
            <img
              src={service.service_icon}
              alt={service.service_name}
              className="w-12 h-12 mb-2"
            />
            <p className="text-sm font-medium text-center">
              {service.service_name}
            </p>
          </Link>
        ))
      ) : (
        <p className="col-span-full text-center">No services available</p>
      )}
    </div>
  );
};

export default Services;
