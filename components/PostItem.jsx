import React from "react"
import CommentBox from "./CommentBox"

const PostItem = ({
  post,
  profilePicture,
  likedPosts,
  handleLikeClick,
  comment,
  setComment,
  handleCommentSubmit,
  likedComments,
  handleCommentLikeClick,
}) => {
  return (
    <div className="post-item border-b border-gray-300 py-4 mb-4">
      <div className="flex items-center mb-2">
        <img
          src={profilePicture || "https://via.placeholder.com/40"}
          alt={`${post.user?.username}'s profile`}
          className="w-10 h-10 rounded-full mr-3"
        />
        <div>
          <p className="text-gray-700 font-bold">{post.user?.username}</p>
          <p className="text-gray-500 text-sm">
            {new Date(post.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>

      <div className="mb-2">
        {/* Post content */}
        <p className="text-gray-700">{post.content}</p>
      </div>

      <div className="flex items-center space-x-4">
        {/* Like Button */}
        <div className="flex items-center space-x-1">
          <button
            onClick={() => handleLikeClick(post.id)}
            className={`p-2 border-2 rounded-full transition-all duration-300 ease-in-out ${
              likedPosts[post.id]
                ? "bg-blue-600 border-blue-600"
                : "border-blue-500"
            } hover:border-blue-700 hover:bg-blue-700`}
          >
            <img
              src="/images/like.svg"
              alt="Like"
              className={`w-4 h-4 ${
                likedPosts[post.id]
                  ? "fill-current text-blue-600"
                  : "text-gray-500"
              }`}
            />
          </button>
          <span className="text-gray-700">{post.likes.length}</span>
        </div>
      </div>

      {/* Comment Box */}
      <CommentBox
        post={post}
        profilePicture={profilePicture}
        comment={comment}
        setComment={setComment}
        handleCommentSubmit={handleCommentSubmit}
        likedComments={likedComments}
        handleCommentLikeClick={handleCommentLikeClick}
      />
    </div>
  )
}

export default PostItem
