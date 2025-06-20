const API_URL = process.env.NEXT_PUBLIC_API_URL

export async function userPostCommentRequest(postId, comment) {
  try {
    const response = await fetch(`${API_URL}/comment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        postId: postId,
        comment: comment,
      }),
      credentials: "include",
    })

    const contentType = response.headers.get("content-type")
    if (contentType && contentType.indexOf("application/json") !== -1) {
      const data = await response.json()
      return { success: true, post: data }
    } else {
      const text = await response.text()
      return { success: false, message: text }
    }
  } catch (error) {
    console.error("Error:", error)
    return { success: false, message: "An error occurred. Please try again." }
  }
}
