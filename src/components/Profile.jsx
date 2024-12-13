import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfile } from "../features/profileSlice";

const Profile = () => {
  const { profile } = useSelector((state) => state.profile);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  console.log(profile);

  return (
    <div className="flex flex-col items-start space-y-4">
      <div className="avatar">
        <div className="w-16 rounded-full ring ring-primary ring-offset-base-100">
          <img
            src={
              `${profile.profile_image}` || "https://via.placeholder.com/100"
            }
            alt="Profile Avatar"
          />
        </div>
      </div>
      <div>
        <h1 className="text-md lg:text-xl text-gray-600">Selamat Datang,</h1>
        <p className="text-xl lg:text-3xl font-bold">{`${profile.first_name} ${profile.last_name}`}</p>
      </div>
    </div>
  );
};

export default Profile;
