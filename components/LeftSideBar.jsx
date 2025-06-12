import React from "react"

const LeftSidebar = ({
  user,
  searchOpen,
  handleSearchSubmit,
  handleSearchClick,
  searchQuery,
  setSearchQuery,
  togglePanel,
  panelOpen,
  panelRef,
  friendRequests,
  handleAcceptRequest,
  handleDeclineRequest,
  toggleMenu,
  menuOpen,
  handleLogout,
  userProfilePicture,
  handleEditProfileClick,
  handleIndexClick,
  handleHomeClick,
}) => {
  return (
    <div
      className="sticky top-0 h-screen w-64 bg-white p-4 shadow-lg"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex flex-col items-center mb-6">
        <div className="w-24 h-24 bg-gray-300 rounded-full mb-4 overflow-hidden">
          {userProfilePicture ? (
            <img
              src={userProfilePicture}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          ) : (
            <img src="" alt="" className="w-full h-full object-cover" />
          )}
        </div>
        {user && user.user && (
          <p className="text-gray-700 font-bold">{user.user.username}</p>
        )}
      </div>
      <nav className="space-y-4">
        <a
          href="#"
          className="flex items-center text-gray-700 hover:text-blue-500"
          onClick={(e) => {
            e.preventDefault()
            handleHomeClick()
          }}
        >
          <img src="/images/homeIcon.svg" alt="Home" className="w-6 h-6 mr-2" />
          Home
        </a>

        <div className="relative" ref={panelRef}>
          <a
            href="#"
            className="flex items-center text-gray-700 hover:text-blue-500"
            onClick={togglePanel}
          >
            <img
              src="/images/notifications.svg"
              alt="Notifications"
              className="w-6 h-6 mr-2"
            />
            Notifications
          </a>
          <div
            className={`transition-all duration-300 ease-in-out ${
              panelOpen ? "max-h-96" : "max-h-0"
            } overflow-hidden`}
          >
            <div className="mt-2 w-full bg-white border border-gray-300 rounded-lg shadow-lg">
              <div className="requests-dropdown">
                {friendRequests.length > 0 ? (
                  friendRequests.map((request, index) => (
                    <div
                      key={index}
                      className="request-item flex justify-between items-center px-4 py-2"
                    >
                      <p className="request-name text-gray-700">
                        {request.username}
                      </p>
                      <div className="request-buttons flex space-x-2">
                        <button
                          className="accept-button bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                          onClick={() => handleAcceptRequest(request.id)}
                        >
                          Accept
                        </button>
                        <button
                          className="decline-button bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                          onClick={() => handleDeclineRequest(request.id)}
                        >
                          Decline
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="no-requests-message px-4 py-2 text-gray-700">
                    No notifications
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
        <a
          href="#"
          className="flex items-center text-gray-700 hover:text-blue-500"
          onClick={(e) => {
            e.preventDefault()
            handleEditProfileClick()
          }}
        >
          <img
            src="/images/profileIcon.svg"
            alt="Profile"
            className="w-6 h-6 mr-2"
          />
          Profile
        </a>
        <a
          href="#"
          className="flex items-center text-gray-700 hover:text-blue-500"
          onClick={(e) => {
            e.preventDefault()
            handleIndexClick()
          }}
        >
          <img
            src="/images/indexIcon.svg"
            alt="Index"
            className="w-6 h-6 mr-2"
          />
          Index
        </a>
      </nav>
      <div className="absolute bottom-4 left-4">
        <button onClick={toggleMenu} className="flex flex-col items-center">
          <span className="block w-6 h-0.5 bg-gray-700 mb-1"></span>
          <span className="block w-6 h-0.5 bg-gray-700 mb-1"></span>
          <span className="block w-6 h-0.5 bg-gray-700"></span>
        </button>
        {menuOpen && (
          <div className="absolute bottom-10 left-0 bg-white shadow-lg rounded-lg p-4">
            <button
              onClick={handleLogout}
              className="block text-gray-700 hover:text-blue-500"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default LeftSidebar
