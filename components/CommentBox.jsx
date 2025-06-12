import React from "react"

const CommentBox = ({
  post,
  profilePicture,
  comment,
  setComment,
  handleCommentSubmit,
  likedComments,
  handleCommentLikeClick,
}) => {
  return (
    <div>
      <form onSubmit={(e) => handleCommentSubmit(e, post.id)} className="mt-4">
        <textarea
          className="w-full p-2 border border-gray-300 rounded resize-none"
          rows="2"
          placeholder="Add a comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        ></textarea>
        <button
          type="submit"
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Comment
        </button>
      </form>
      <div className="mt-4 space-y-4">
        {post.comments.map((comment, index) => (
          <div
            key={index}
            className="flex items-start space-x-3 bg-gray-100 p-3 rounded-lg"
          >
            <img
              src={
                comment.user?.profilePicture || "https://via.placeholder.com/40"
              }
              alt={`${comment.user?.username}'s profile`}
              className="w-8 h-8 rounded-full"
            />
            <div className="flex-1">
              <p className="text-gray-700">{comment.content}</p>
              <div className="flex items-center space-x-2 mt-1">
                <button
                  onClick={() => handleCommentLikeClick(comment.id)}
                  className="p-1 transition-all duration-300 ease-in-out"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24px"
                    viewBox="0 -960 960 960"
                    width="24px"
                    fill={likedComments[comment.id] ? "red" : "none"}
                    stroke="blue"
                    strokeWidth="2"
                    className="w-4 h-4"
                  >
                    <path d="m480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Zm0-108q96-86 158-147.5t98-107q36-45.5 50-81t14-70.5q0-60-40-100t-100-40q-47 0-87 26.5T518-680h-76q-15-41-55-67.5T300-774q-60 0-100 40t-40 100q0 35 14 70.5t50 81q36 45.5 98 107T480-228Zm0-273Z" />
                  </svg>
                </button>
                <span className="text-gray-700">{comment.likes.length}</span>
                <p className="text-gray-500 text-sm">
                  {new Date(comment.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CommentBox
