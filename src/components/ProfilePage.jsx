import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProfile,
  updateProfile,
  updateProfileImage,
} from "../features/profileSlice";
import Navbar from "./Navbar";
import { logout } from "../features/authSlice";

const ProfilePage = () => {
  const { profile, isError, isLoading, message } = useSelector(
    (state) => state.profile
  );
  const dispatch = useDispatch();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [resultModal, setResultModal] = useState({
    open: false,
    success: false,
  });
  const [confirmModal, setConfirmModal] = useState(false);

  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  useEffect(() => {
    if (profile) {
      setFirstName(profile.first_name || "");
      setLastName(profile.last_name || "");
      setEmail(profile.email || "");
      setPreviewImage(
        profile.profile_image || "https://via.placeholder.com/150"
      );
    }
  }, [profile]);

  const handleImageUpload = () => {
    if (!selectedImage) {
      setResultModal({ open: true, success: false });
      return;
    }

    if (selectedImage.size > 100 * 1024) {
      setResultModal({ open: true, success: false });
      return;
    }

    if (!["image/jpeg", "image/png"].includes(selectedImage.type)) {
      setResultModal({ open: true, success: false });
      return;
    }

    dispatch(updateProfileImage(selectedImage))
      .unwrap()
      .then(() => {
        dispatch(fetchProfile());
        setSelectedImage(null);
        setResultModal({ open: true, success: true });
      })
      .catch(() => setResultModal({ open: true, success: false }));
  };

  const handleProfileUpdate = (e) => {
    e.preventDefault();

    const updatedProfile = {
      first_name: firstName,
      last_name: lastName,
    };

    dispatch(updateProfile(updatedProfile))
      .unwrap()
      .then(() => {
        setResultModal({ open: true, success: true });
        setIsEditing(false);
      })
      .catch(() => setResultModal({ open: true, success: false }));
  };

  const handleLogout = () => {
    setConfirmModal(true);
  };

  const confirmLogout = () => {
    dispatch(logout());
    setConfirmModal(false);
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {message}</div>;

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="text-center">
          <div className="relative inline-block">
            <img
              src={previewImage}
              alt="Profile"
              className="w-32 h-32 object-cover rounded-full mx-auto cursor-pointer"
              onClick={() => document.getElementById("fileInput").click()}
            />
            {isEditing && (
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <input
                  id="fileInput"
                  type="file"
                  className="hidden"
                  accept="image/jpeg, image/png"
                  onChange={(e) => setSelectedImage(e.target.files[0])}
                />
              </div>
            )}
            {isEditing && (
              <button
                className="mt-2 bg-blue-500 text-white py-2 px-3 rounded-lg"
                onClick={handleImageUpload}
              >
                Done
              </button>
            )}
          </div>
          <h2 className="text-2xl font-bold mt-4">
            {firstName} {lastName}
          </h2>
        </div>

        <form onSubmit={handleProfileUpdate} className="mt-6 space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              disabled
              className="w-full border rounded-lg px-4 py-2 bg-gray-100 cursor-not-allowed"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Nama Depan
            </label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              disabled={!isEditing}
              className={`w-full border rounded-lg px-4 py-2 ${
                isEditing ? "bg-white" : "bg-gray-100 cursor-not-allowed"
              }`}
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Nama Belakang
            </label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              disabled={!isEditing}
              className={`w-full border rounded-lg px-4 py-2 ${
                isEditing ? "bg-white" : "bg-gray-100 cursor-not-allowed"
              }`}
            />
          </div>

          {isEditing && (
            <button
              type="submit"
              className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600"
            >
              Save Profile
            </button>
          )}
        </form>

        <button
          onClick={() => setIsEditing(!isEditing)}
          className="w-full mt-4 bg-white text-red-500 py-2 rounded-lg hover:bg-red-500 hover:text-white"
          style={{ border: "1px solid red" }}
        >
          {isEditing ? "Cancel" : "Edit Profile"}
        </button>

        <button
          onClick={handleLogout}
          className="w-full mt-4 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      {/* Confirmation Modal */}
      {confirmModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-80">
            <h2 className="text-lg font-semibold text-center">
              Konfirmasi Logout
            </h2>
            <p className="text-center mt-2">Apakah Anda yakin ingin logout?</p>
            <div className="flex justify-between mt-4">
              <button
                className="bg-gray-300 text-black py-2 px-4 rounded-lg"
                onClick={() => setConfirmModal(false)}
              >
                Batalkan
              </button>
              <button
                className="bg-blue-500 text-white py-2 px-4 rounded-lg"
                onClick={confirmLogout}
              >
                Iya
              </button>
            </div>
          </div>
        </div>
      )}
      {resultModal.open && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-80 text-center">
            <div className="flex justify-center mb-4">
              {resultModal.success ? (
                <div className="text-green-500 text-3xl">✔</div>
              ) : (
                <div className="text-red-500 text-3xl">✖</div>
              )}
            </div>
            <h2 className="text-lg font-semibold">
              {resultModal.success
                ? "Update Profil Berhasil!"
                : "Update Profil Gagal"}
            </h2>
            <p className="mt-2">
              {resultModal.success
                ? "Berhasil melakukan update profil."
                : "Terjadi kesalahan, silakan coba lagi."}
            </p>
            <button
              className="w-full bg-blue-500 text-white py-2 rounded-lg mt-4"
              onClick={() => setResultModal({ open: false, success: false })}
            >
              Tutup
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
