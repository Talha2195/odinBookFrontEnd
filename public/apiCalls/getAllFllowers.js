const API_URL = import.meta.env.VITE_API_URL

async function getAllFollowers() {
  try {
    const response = await fetch(`${API_URL}/allFollowers`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })

    const contentType = response.headers.get("content-type")
    if (contentType && contentType.indexOf("application/json") !== -1) {
      const data = await response.json()
      return { success: true, followers: data }
    } else {
      const text = await response.text()
      return { success: false, message: text }
    }
  } catch (error) {
    console.error("Error:", error)
    return { success: false, message: "An error occurred. Please try again." }
  }
}

export { getAllFollowers }
