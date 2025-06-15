const API_URL = import.meta.env.VITE_API_URL

async function loadProfilePage() {
  try {
    const response = await fetch(`${API_URL}/profile`, {
      method: "GET",
      credentials: "include",
    })
    const data = await response.json()
    if (response.ok && data.success) {
      return { success: true, user: data.user }
    } else {
      return { success: false, message: data.message || "Unauthorized" }
    }
  } catch (error) {
    console.error("Error fetching profile:", error)
    return { success: false, message: "An error occurred. Please try again." }
  }
}

export { loadProfilePage }
