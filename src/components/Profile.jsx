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
    <div className="flex flex-col items-center lg:items-start space-y-4">
      {/* gambar */}
      <div className="avatar">
        <div className="w-16 rounded-full ring ring-primary ring-offset-base-100">
          {profile.profile_image ==
          "https://minio.nutech-integrasi.com/take-home-test/null" ? (
            <img
              src={
                "https://yourteachingmentor.com/wp-content/uploads/2020/12/istockphoto-1223671392-612x612-1.jpg"
              }
              alt="Profile Avatar"
            />
          ) : (
            <img src={`${profile.profile_image}`} alt="Profile Avatar" />
          )}
        </div>
      </div>
      {/* tulisan */}
      <div>
        <h1 className="text-md lg:text-xl text-center lg:text-left text-gray-600">
          Selamat Datang,
        </h1>
        <p className="text-xl lg:text-3xl font-bold">{`${profile.first_name} ${profile.last_name}`}</p>
      </div>
    </div>
  );
};

export default Profile;
