import React from "react"
import UserPostForm from "./UserPostForm"
import PostItem from "./PostItem"

const MainContent = ({
  userPosts,
  post,
  handlePostChange,
  handleUserPostSubmit,
  likedPosts,
  dislikedPosts,
  handleLikeClick,
  handleDislikeClick,
  comment,
  setComment,
  handleCommentSubmit,
  likedComments,
  handleCommentLikeClick,
  userProfilePicture,
}) => {
  return (
    <div className="relative w-4/4 flex-grow bg-white p-4 shadow-lg mt-4 mb-4 ml-4 mr-4 rounded-lg">
      <UserPostForm
        post={post}
        handlePostChange={handlePostChange}
        handleUserPostSubmit={handleUserPostSubmit}
      />
      <div className="bg-white p-4 shadow-lg rounded-lg flex-1 overflow-y-auto">
        {userPosts.length > 0 ? (
          userPosts.map((post, index) => (
            <PostItem
              key={index}
              post={post}
              profilePicture={
                post.user?.profilePicture || "https://via.placeholder.com/40"
              }
              likedPosts={likedPosts}
              handleLikeClick={handleLikeClick}
              comment={comment}
              setComment={setComment}
              handleCommentSubmit={handleCommentSubmit}
              likedComments={likedComments}
              handleCommentLikeClick={handleCommentLikeClick}
              userPosts={userPosts}
            />
          ))
        ) : (
          <p>No posts available.</p>
        )}
      </div>
    </div>
  )
}

export default MainContent
