import React from "react"

const UserPostForm = ({ post, handlePostChange, handleUserPostSubmit }) => {
  return (
    <div className="bg-white p-4 shadow-lg rounded-lg mb-6">
      <form onSubmit={handleUserPostSubmit}>
        <textarea
          className="w-full p-2 border border-gray-300 rounded resize-none"
          rows="4"
          placeholder="What's on your mind?"
          value={post}
          onChange={handlePostChange}
        ></textarea>
        <button
          type="submit"
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Post
        </button>
      </form>
    </div>
  )
}

export default UserPostForm
