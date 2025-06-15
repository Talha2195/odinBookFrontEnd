const API_URL = import.meta.env.VITE_API_URL

export async function commentHeartRequest(commentId, userId) {
  try {
    const response = await fetch(`${API_URL}/commentHeartRequest`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        commentId: commentId,
        userId: userId,
      }),
      credentials: "include",
    })

    const data = await response.json()
    if (response.ok && data.success) {
      return { success: true }
    } else {
      return { success: false, message: data.message || "Something went wrong" }
    }
  } catch (error) {
    console.error("Error:", error)
    return { success: false, message: "An error occurred. Please try again." }
  }
}
