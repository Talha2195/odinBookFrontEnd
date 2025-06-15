const API_URL = import.meta.env.VITE_API_URL

export async function userPostRequest(postContent) {
  try {
    const response = await fetch(`${API_URL}/userPost`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        post: postContent,
      }),
      credentials: "include",
    })

    const data = await response.json()
    if (response.ok && data.success) {
      return { success: true, post: data.post }
    } else {
      return { success: false, message: data.message || "Something went wrong" }
    }
  } catch (error) {
    console.error("Error:", error)
    return { success: false, message: "An error occurred. Please try again." }
  }
}
