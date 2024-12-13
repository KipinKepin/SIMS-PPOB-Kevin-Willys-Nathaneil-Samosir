import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBanner } from "../features/bannerSlice";

const Banner = () => {
  const { banner } = useSelector((state) => state.banner);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBanner());
  }, [dispatch]);

  console.log(banner);

  return (
    <div className="w-full">
      {/* Wrapper untuk scroll di mobile, memenuhi lebar di desktop */}
      <div className="flex gap-4 overflow-x-auto lg:overflow-x-hidden justify-between">
        {banner && banner.length > 0 ? (
          banner.map((item, idx) => (
            <div
              key={idx}
              className="flex-shrink-0 bg-white shadow-md overflow-hidden rounded-lg min-w-[200px] lg:min-w-[18%] max-w-[200px] lg:max-w-[18%]"
            >
              <img
                src={item.banner_image}
                alt={item.banner_name}
                className="w-full h-24 md:h-28 lg:h-32 object-cover"
              />
            </div>
          ))
        ) : (
          <p className="text-center w-full">Tidak ada banner</p>
        )}
      </div>
    </div>
  );
};

export default Banner;
