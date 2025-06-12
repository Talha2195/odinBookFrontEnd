import React from "react"

const EditProfile = ({
  formData,
  setFormData,
  handleSaveProfile,
  handleCancelEdit,
}) => {
  return (
    <div className="relative w-4/4  h-[700px] flex-grow bg-white p-4 shadow-lg mt-16 mb-4 ml-4 mr-4 rounded-lg">
      <h2 className="text-xl font-bold mb-4">Edit Profile</h2>
      <div className="mb-4">
        <label
          className="block text-gray-700 font-bold mb-2"
          htmlFor="firstName"
        >
          First Name
        </label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          value={formData.firstName}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, firstName: e.target.value }))
          }
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 font-bold mb-2"
          htmlFor="lastName"
        >
          Last Name
        </label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          value={formData.lastName}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, lastName: e.target.value }))
          }
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="bio">
          Bio
        </label>
        <input
          type="bio"
          id="bio"
          name="bio"
          value={formData.bio}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, bio: e.target.value }))
          }
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <div className="flex space-x-4">
        <button
          onClick={handleSaveProfile}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Save
        </button>
        <button
          onClick={handleCancelEdit}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
        >
          Cancel
        </button>
      </div>
    </div>
  )
}

export default EditProfile
