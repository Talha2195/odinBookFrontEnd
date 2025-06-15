const API_URL = import.meta.env.VITE_API_URL

async function logoutUser() {
  try {
    const response = await fetch(`${API_URL}/logout`, {
      method: "POST",
      credentials: "include",
    })

    const contentType = response.headers.get("content-type")
    if (contentType && contentType.indexOf("application/json") !== -1) {
      const data = await response.json()
      return { success: true, message: data.message }
    } else {
      const text = await response.text()
      return { success: false, message: text }
    }
  } catch (error) {
    console.error("Error:", error)
    return { success: false, message: "An error occurred. Please try again." }
  }
}

export { logoutUser }
