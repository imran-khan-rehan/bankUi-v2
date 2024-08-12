'use client';
import { useState, useEffect, useRef } from "react";
import { BellIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import bcrypt from 'bcryptjs';
import { useRouter } from "next/navigation";

const NavBar = () => {
  const router = useRouter();
  const [isProfilePopupOpen, setIsProfilePopupOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [profileData, setProfileData] = useState({
    id: "",
    name: "",
    email: "",
    password: "",
  });
  const [editPassword, setEditPassword] = useState({
    oldPassword: "",
    newPassword: ""
  });
  const [error, setError] = useState(null);
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isValidEmail, setValidEmail] = useState(true);
  const [validPassword, setValidPassword] = useState(true);
  const menuRef = useRef(null);

  useEffect(() => {
    const storedUser = JSON.parse(sessionStorage.getItem('user'));
    if (storedUser) {
      setToken(storedUser.token);
      setUserId(storedUser.id);
      fetchProfileData(storedUser.id, storedUser.token);
    }
  }, []);

  const fetchProfileData = async (userId, token) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        
        setProfileData({
          name: data.name,
          email: data.email,
          address: data.address
        });
      } else {
        console.error('Failed to fetch profile data');
      }
    } catch (error) {
      console.error('Error fetching profile data:', error);
    }
  };

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsProfilePopupOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef]);

  const handleEditToggle = () => {
    setIsEditMode(!isEditMode);
  };

  const handleInputChange = (e) => {
    setError(null);

    const { name, value } = e.target;
    setProfileData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handlePasswordChange = (e) => {
    setError(null);
    const { name, value } = e.target;
    setEditPassword((prevData) => ({ ...prevData, [name]: value }));
  };

  const validateEmail = (email) => {
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&`^~#\-_+=<>?.,:;\\'"]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      if (!validateEmail(profileData.email)) {
        setError("Invalid email format.");
        setValidEmail(false);
        setLoading(false);
        return;
      }
      setValidEmail(true);

      // if (editPassword.newPassword !== "" && !validatePassword(editPassword.newPassword)) {
      //   setError("Password must be at least 8 characters long and must include letters and digits.");
      //   setValidPassword(false);
      //   setLoading(false);
      //   return;
      // }
      setValidPassword(true);

      // const passwordMatch = await bcrypt.compare(editPassword.oldPassword, profileData.password);
      // if (editPassword.newPassword !== "" && !passwordMatch) {
      //   setError("Old password is incorrect.");
      //   setLoading(false);
      //   return;
      // }

      if (profileData.name.trim().length === 0 || profileData.email.trim().length === 0) {
        setError("Name or email can't be empty.");
        setLoading(false);
        return;
      }

      const updatedData = {
        name: profileData.name,
        email: profileData.email,
        address: profileData.address
      };

      // if (editPassword.newPassword !== "") {
      //   updatedData.password = await bcrypt.hash(editPassword.newPassword, 10);
      // }

      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/${userId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(updatedData)
      });

      if (response.ok) {
        const data = await response.json();
        setProfileData({
          name: data.name,
          email: data.email,
          address: data.address
        });

        setIsEditMode(false);
        setError(null);
      } else if (response.status === 409) {
        setError('Email already exists.');
      } else if(response.status === 404)
      {
        setError("invalid user");
      }
      else {
        setError('Failed to update profile.');
      }
    } catch (error) {
      setError("error");
      console.error('Error updating profile data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUserIconClick = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
      });

      if (response.ok) {
        sessionStorage.removeItem('user');
        router.push('/login');
      } else {
        alert('Failed to log out');
      }
    } catch (error) {
      alert('Failed to log out');
    }
  };

  return (
    <nav className="bg-white shadow-md p-4 flex justify-between items-center w-full h-fit">
      <div className="text-black font-bold max-md:ml-[10%]">REDMATH</div>
      <div className="flex items-center">
        <BellIcon className="text-black h-6 w-6 mr-4" />
        <div className="relative">
          <div className="text-black" onClick={handleUserIconClick}>
            <UserCircleIcon className="h-8 w-8 cursor-pointer" />
          </div>
          {isMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md py-1 z-10">
              <button
                className="block hover:bg-slate-400 shadow-custom w-full text-left px-4 py-2 text-sm text-gray-700"
                onClick={() => { setIsProfilePopupOpen(true); setIsMenuOpen(false); }}
              >
                My Profile
              </button>
              <button
                onClick={handleLogout}
                className="block w-full shadow-custom hover:bg-slate-400 text-left px-4 py-2 text-sm text-gray-700"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
      {isProfilePopupOpen && (
        <div className="fixed inset-0 w-screen h-screen flex items-center justify-center bg-black bg-opacity-50 z-20">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl mb-4">Profile</h2>
            <div className="space-y-4">
              {isEditMode ? (
                <>
                  <div>
                    <label className="block text-gray-700">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={profileData.name}
                      onChange={handleInputChange}
                      className="w-full mt-1 p-2 border border-gray-300 rounded"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={profileData.email}
                      onChange={handleInputChange}
                      className="w-full mt-1 p-2 border border-gray-300 rounded"
                      required
                    />
                    {/* {!isValidEmail && <div className="text-red-500">Invalid email format.</div>} */}
                  </div>
                  <div>
                    <label className="block text-gray-700">Address</label>
                    <input
                      type="text"
                      name="address"
                      value={profileData.address}
                      onChange={handleInputChange}
                      className="w-full mt-1 p-2 border border-gray-300 rounded"
                      required
                    />
                  </div>
                  {/* <div>
                    <label className="block text-gray-700">Old Password</label>
                    <input
                      type="password"
                      name="oldPassword"
                      value={editPassword.oldPassword}
                      onChange={handlePasswordChange}
                      className="w-full mt-1 p-2 border border-gray-300 rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700">New Password</label>
                    <input
                      type="password"
                      name="newPassword"
                      value={editPassword.newPassword}
                      onChange={handlePasswordChange}
                      className="w-full mt-1 p-2 border border-gray-300 rounded"
                    />
                  </div> */}
                  {loading && <div className="text-red-500">Loading ...</div>}
                  {error && <div className="text-red-500">{error}</div>}
                </>
              ) : (
                <>

                  <div>
                    <strong>Name:</strong> {profileData.name}
                  </div>
                  <div>
                    <strong>Email:</strong> {profileData.email}
                  </div>
                  <div>
                    <strong>Address:</strong> {profileData.address}
                  </div>
                </>
              )}
            </div>
            <div className="mt-4 flex justify-end space-x-2">
              {isEditMode ? (
                <button
                  onClick={handleSave}
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Save
                </button>
              ) : (
                <button
                  onClick={handleEditToggle}
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Edit
                </button>
              )}
              <button
                onClick={() => { setIsProfilePopupOpen(false); setIsEditMode(false); setIsMenuOpen(false); }}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
