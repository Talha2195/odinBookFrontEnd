import React from "react"

const IndexPage = ({ allUsers, handleFollowRequest, followedUsers }) => {
  return (
    <div className="relative w-4/4 flex-grow bg-white p-4 shadow-lg mt-10 mb-4 ml-4 mr-4 rounded-lg">
      <h2 className="text-xl font-bold mb-4">All Users</h2>
      <ul className="space-y-4">
        {allUsers.data.map((user) => (
          <li
            key={user.id}
            className="flex items-center justify-between border-b pb-2 last:border-b-0"
          >
            <div className="flex items-center space-x-4">
              <img
                src={user.profilePicture || "/images/defaultProfile.png"}
                alt={`${user.username}'s profile`}
                className="w-10 h-10 rounded-full"
              />
              <span className="text-gray-700 font-medium truncate">
                {user.username}
              </span>
            </div>
            <button
              onClick={() => handleFollowRequest(user.username)}
              className={`px-4 py-2 rounded border ${
                followedUsers[user.username]
                  ? "bg-blue-500 text-white border-blue-500"
                  : "text-blue-500 border-blue-500 hover:bg-blue-500 hover:text-white"
              } transition duration-200`}
            >
              {followedUsers[user.username] ? "Request Sent" : "Follow"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default IndexPage
