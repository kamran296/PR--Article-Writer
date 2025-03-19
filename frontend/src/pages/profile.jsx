import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../pages/REA/navbar";

const Profile = ({ userId }) => {
  const [role, setRole] = useState("");
  const [department, setDepartment] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [userName, setUserName] = useState("User"); // State to hold the user's name

  useEffect(() => {
    // Fetch profile data when the component mounts
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/getProfile/${userId}`);
        setRole(response.data.role);
        setDepartment(response.data.department);
        setUserName(response.data.user?.name || "User"); // Set the user's name
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };
    fetchProfile();
  }, [userId]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/updateProfile", {
        userId,
        role,
        department,
      });
      alert("Profile updated successfully");
      setIsEditing(false); // Disable editing after updating
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className="min-h-screen bg-indigo-100 flex flex-col">
      <Navbar />
      <div className="flex-grow flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-lg p-10 w-full max-w-4xl">
          <h1 className="text-4xl font-bold text-center mb-10">Profile</h1>
          <form className="space-y-10" onSubmit={handleUpdate}>
            {/* Name Section */}
            <div>
              <label htmlFor="name" className="block text-xl font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={data.user.displayName ? data.user.displayName : "user"}
                readOnly // Make the input read-only
                className="mt-2 block w-full px-6 py-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-xl bg-gray-100"
              />
            </div>

            {/* Role Input */}
            <div>
              <label htmlFor="role" className="block text-xl font-medium text-gray-700">
                Role
              </label>
              <input
                type="text"
                id="role"
                name="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                disabled={!isEditing} // Disable if not in editing mode
                placeholder="Enter your role"
                className="mt-2 block w-full px-6 py-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-xl"
              />
            </div>

            {/* Department Input */}
            <div>
              <label htmlFor="department" className="block text-xl font-medium text-gray-700">
                Department
              </label>
              <input
                type="text"
                id="department"
                name="department"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                disabled={!isEditing} // Disable if not in editing mode
                placeholder="Enter your department"
                className="mt-2 block w-full px-6 py-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-xl"
              />
            </div>

            <div className="flex justify-between">
              <button
                type="submit"
                className="w-1/2 py-4 px-8 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-xl"
              >
                Update
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsEditing(!isEditing); // Toggle editing mode
                  console.log("isEditing:", !isEditing); // Debugging line
                }}
                className="w-1/2 py-4 px-8 ml-6 bg-gray-600 text-white font-semibold rounded-lg shadow-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 text-xl"
              >
                {isEditing ? "Cancel" : "Edit"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;