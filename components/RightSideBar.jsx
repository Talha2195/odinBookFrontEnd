import React from "react"

const RightSidebar = ({ randomUsers, handleFollowRequest, followedUsers }) => {
  return (
    <div className=" sticky w-1/4 bg-white p-4 shadow-lg ">
      <h2 className="text-xl font-semibold mb-4">Suggested for you</h2>
      <ul className="space-y-4">
        {randomUsers.map((user) => (
          <li
            key={user.id}
            className="flex items-center justify-between w-full border-b pb-2 last:border-b-0"
          >
            <div className="flex items-center space-x-4">
              <img
                src={user.profilePicture}
                alt={`${user.username}'s profile`}
                className="w-10 h-10 rounded-full"
              />
              <span className="text-gray-700 font-medium truncate">
                {user.username}
              </span>
            </div>
            <button
              onClick={() => handleFollowRequest(user.username)}
              className={`whitespace-nowrap px-4 py-2 rounded border transition duration-200 ${
                followedUsers[user.username]
                  ? "bg-blue-500 text-white border-blue-500"
                  : "text-blue-500 border-blue-500 hover:bg-blue-500 hover:text-white"
              }`}
            >
              {followedUsers[user.username] ? "Following" : "Follow"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default RightSidebar
