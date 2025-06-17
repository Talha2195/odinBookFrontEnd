import React, { useState, useEffect, useRef } from "react"
import { useRouter } from "next/router"
import { logoutUser } from "../public/apiCalls/logout"
import { loadProfilePage } from "../public/apiCalls/loadProfile"
import { sendFriendReq } from "../public/apiCalls/sendFriendRequest"
import { acceptReq } from "../public/apiCalls/acceptRequest"
import { declineReq } from "../public/apiCalls/declineRequest"
import { userPostRequest } from "../public/apiCalls/userPostRequest"
import { likeRequest } from "../public/apiCalls/likeRequest"
import { userPostCommentRequest } from "../public/apiCalls/postCommentsRequest"
import { commentHeartRequest } from "../public/apiCalls/commentHeartRequest"
import { editProfile } from "../public/apiCalls/editProfile"
import { getAllUsers } from "../public/apiCalls/getAllUsers"
import { getAllFollowers } from "../public/apiCalls/getAllFllowers"
import LeftSidebar from "../components/LeftSideBar"
import MainContent from "../components/MainContent"
import RightSidebar from "../components/RightSideBar"
import EditProfile from "../components/EditProfile"
import IndexPage from "../components/index"

export default function Profile() {
  const [user, setUser] = useState(null)
  const [friendRequests, setFriendRequests] = useState([])
  const [loading, setLoading] = useState(true)
  const [authenticated, setAuthenticated] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [post, setPost] = useState("")
  const [userPosts, setUserPosts] = useState([])
  const [likedPosts, setLikedPosts] = useState({})
  const [comment, setComment] = useState("")
  const [likedComments, setLikedComments] = useState({})
  const [randomUsers, setRandomUsers] = useState([])
  const [allUsers, setAllUsers] = useState([])
  const [searchOpen, setSearchOpen] = useState(false)
  const [panelOpen, setPanelOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [isEditingProfile, setIsEditingProfile] = useState(false)
  const [isIndexOpen, setIsIndexOpen] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    bio: "",
    password: "",
  })
  const [followedUsers, setFollowedUsers] = useState([])
  const [isUserLoading, setIsUserLoading] = useState(true)
  const [isRandomUsersLoading, setIsRandomUsersLoading] = useState(true)
  const [isFollowedUsersLoading, setIsFollowedUsersLoading] = useState(true)
  const [userProfilePicture, setUserProfileImage] = useState(null)
  const [activeComponent, setActiveComponent] = useState("home")
  const router = useRouter()
  const panelRef = useRef(null)

  useEffect(() => {
    const authenticate = async () => {
      try {
        const result = await loadProfilePage()
        console.log("Profile data:", result)
        if (result.success) {
          const userData = result.user
          setUser(userData.user.user)
          setFriendRequests(userData.friendRequests || [])
          setUserPosts(userData.posts || [])
          if (userData && userData.user) {
            setUserProfileImage(userData.user.user.profilePicture || null)
          } else {
            console.error("Error: userData.user is undefined")
          }

          setAuthenticated(true)

          const likedPosts = {}
          const likedComments = {}

          userData.posts?.forEach((post) => {
            post.likes?.forEach((like) => {
              if (like?.userId === userData.user?.id) {
                likedPosts[post.id] = true
              }
            })

            post.comments?.forEach((comment) => {
              comment.likes?.forEach((like) => {
                if (like?.userId === userData.user?.id) {
                  likedComments[comment.id] = true
                }
              })
            })
          })

          setLikedPosts(likedPosts)
          setLikedComments(likedComments)
        } else {
          router.push("/index")
        }
      } catch (error) {
        console.error("Error loading profile:", error)
      } finally {
        setIsUserLoading(false)
      }
    }

    const fetchRandomUsers = async () => {
      try {
        const data = await getAllUsers()
        if (data.success) {
          const shuffledUsers = data.users.data.sort(() => 0.5 - Math.random())
          const selectedUsers = shuffledUsers.slice(0, 4)

          setAllUsers(data.users)
          setRandomUsers(selectedUsers)
        } else {
          console.error("Failed to fetch random users:", data.message)
        }
      } catch (error) {
        console.error("Error fetching random users:", error)
      } finally {
        setIsRandomUsersLoading(false)
      }
    }

    const fetchAllFollowers = async () => {
      try {
        const followers = await getAllFollowers()

        if (followers.success) {
          const followed = {}
          followers.followers.data.forEach((request) => {
            followed[request.receiver.username] = true
          })

          setFollowedUsers(followed)
        } else {
          console.error("Failed to fetch followers:", followers.message)
        }
      } catch (error) {
        console.error("Error fetching followers:", error)
      } finally {
        setIsFollowedUsersLoading(false)
      }
    }
    setLoading(true)
    authenticate()
    fetchRandomUsers()
    fetchAllFollowers()
  }, [router])

  useEffect(() => {
    if (!isUserLoading && !isRandomUsersLoading && !isFollowedUsersLoading) {
      setLoading(false)
    }
  }, [isUserLoading, isRandomUsersLoading, isFollowedUsersLoading])

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick)
    return () => {
      document.removeEventListener("click", handleOutsideClick)
    }
  }, [panelOpen, searchOpen])

  const handleLogout = async () => {
    try {
      const result = await logoutUser()
      if (result.success) {
        window.location.href = "/index"
      } else {
        console.error("Error:", result.message)
      }
    } catch (error) {
      console.error("Error logging out:", error)
    }
  }

  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
  }

  const handleSearchClick = (e) => {
    e.stopPropagation()
    setSearchOpen(true)
  }

  const handleSearchSubmit = async (e) => {
    e.preventDefault()
    try {
      const searchResult = await sendFriendReq(searchQuery)
      if (searchResult.success) {
      } else {
        console.error("Error sending friend request")
      }
    } catch (error) {
      console.error("Error during search:", error)
    } finally {
      setSearchOpen(false)
      setSearchQuery("")
    }
  }

  const handlePostChange = (e) => {
    setPost(e.target.value)
  }

  const handleUserPostSubmit = async (e) => {
    e.preventDefault()
    try {
      const searchResult = await userPostRequest(post)
      if (searchResult.success) {
        setUserPosts((prevPosts) => [searchResult.post, ...prevPosts])
      } else {
        console.error("Error submitting post:", searchResult.message)
      }
    } catch (error) {
      console.error("Error during post submission:", error)
    } finally {
      setPost("")
    }
  }

  const handleOutsideClick = (e) => {
    if (searchOpen) {
      setSearchOpen(false)
      setSearchQuery("")
    }
    if (panelOpen && panelRef.current && !panelRef.current.contains(e.target)) {
      setPanelOpen(false)
    }
  }

  const togglePanel = (e) => {
    e.stopPropagation()
    setPanelOpen(!panelOpen)
  }

  const handleAcceptRequest = async (requestId) => {
    const result = await acceptReq(requestId)
    if (result.success) {
      setFriendRequests(
        friendRequests.filter((request) => request.id !== requestId)
      )
    } else {
      console.error("Error accepting request:", result.message)
    }
  }

  const handleDeclineRequest = async (requestId) => {
    const result = await declineReq(requestId)
    if (result.success) {
      setFriendRequests(
        friendRequests.filter((request) => request.id !== requestId)
      )
    } else {
      console.error("Error declining request:", result.message)
    }
  }

  const handleCommentLikeClick = async (commentId) => {
    const result = await commentHeartRequest(commentId)
    if (result.success) {
      setLikedComments((prev) => ({
        ...prev,
        [commentId]: !prev[commentId],
      }))
    } else {
      console.error("Error liking comment:", result.message)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="loader ease-linear rounded-full border-8 border-t-8 border-blue-500 h-32 w-32"></div>
      </div>
    )
  }

  if (!authenticated) {
    return null
  }

  const handleLikeClick = async (postId) => {
    const result = await likeRequest(postId)
    if (result.success && result.post) {
      const { action, userId } = result.post
      setUserPosts((prevPosts) => {
        const updatedPosts = prevPosts.map((post) =>
          post.id === postId
            ? {
                ...post,
                likes:
                  action === "like_added"
                    ? [...post.likes, userId]
                    : post.likes.filter((id) => id !== userId),
              }
            : post
        )
        return updatedPosts
      })
    } else {
      console.error("Error liking post:", result.message)
    }
  }

  const handleCommentSubmit = async (e, postId) => {
    e.preventDefault()
    const result = await userPostCommentRequest(postId, comment)
    if (result.success) {
      setUserPosts((prev) =>
        prev.map((post) =>
          post.id === postId
            ? { ...post, comments: [...post.comments, result.comment] }
            : post
        )
      )
    } else {
      console.error("Error commenting on post:", result.message)
    }
    setComment("")
  }

  const handleSaveProfile = async () => {
    try {
      const result = await editProfile(formData)
      if (result.success) {
        setUser(result.post.user)
        setIsEditingProfile(false)

        handleHomeClick()
      } else {
        console.error("Error saving profile:", result.message)
      }
    } catch (error) {
      console.error("Error saving profile:", error)
    }
  }

  const handleFollowRequest = async (username) => {
    try {
      const result = await sendFriendReq(username)
      if (result.success) {
        setFollowedUsers((prev) => ({
          ...prev,
          [username]: true,
        }))
      } else {
        console.error("Error sending follow request:", result.message)
      }
    } catch (error) {
      console.error("Error sending follow request:", error)
    }
  }

  const handleHomeClick = () => {
    setActiveComponent("home")
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Left Sidebar */}
      <LeftSidebar
        user={user}
        friendRequests={friendRequests}
        handleAcceptRequest={handleAcceptRequest}
        handleDeclineRequest={handleDeclineRequest}
        toggleMenu={toggleMenu}
        menuOpen={menuOpen}
        handleLogout={handleLogout}
        searchOpen={searchOpen}
        handleSearchClick={handleSearchClick}
        handleSearchSubmit={handleSearchSubmit}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        panelOpen={panelOpen}
        togglePanel={togglePanel}
        panelRef={panelRef}
        userProfilePicture={userProfilePicture}
        handleEditProfileClick={() => setActiveComponent("editProfile")}
        handleIndexClick={() => setActiveComponent("index")}
        handleHomeClick={() => setActiveComponent("home")}
      />

      {/* Middle Content Area */}
      <div className="flex-1 h-full overflow-y-auto pb-4">
        {activeComponent === "editProfile" && (
          <EditProfile
            formData={formData}
            setFormData={setFormData}
            handleSaveProfile={handleSaveProfile}
            handleCancelEdit={() => setActiveComponent("home")}
          />
        )}
        {activeComponent === "index" && (
          <IndexPage
            allUsers={allUsers}
            handleFollowRequest={handleFollowRequest}
            setIsIndexOpen={setIsIndexOpen}
            followedUsers={followedUsers}
          />
        )}
        {activeComponent === "home" && (
          <MainContent
            post={post}
            handlePostChange={handlePostChange}
            handleUserPostSubmit={handleUserPostSubmit}
            userPosts={userPosts}
            likedPosts={likedPosts}
            handleLikeClick={handleLikeClick}
            comment={comment}
            setComment={setComment}
            handleCommentSubmit={handleCommentSubmit}
            likedComments={likedComments}
            handleCommentLikeClick={handleCommentLikeClick}
            userProfilePicture={userProfilePicture}
          />
        )}
      </div>

      {/* Right Sidebar */}
      <RightSidebar
        randomUsers={randomUsers}
        handleFollowRequest={handleFollowRequest}
        followedUsers={followedUsers}
      />
    </div>
  )
}
