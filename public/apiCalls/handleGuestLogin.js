const API_URL = process.env.NEXT_PUBLIC_API_URL

async function guestLogin() {
  try {
    const response = await fetch(`${API_URL}/guestLogin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })

    const contentType = response.headers.get("content-type")
    if (contentType && contentType.indexOf("application/json") !== -1) {
      const data = await response.json()
      return { success: true, user: data }
    } else {
      const text = await response.text()
      return { success: false, message: text }
    }
  } catch (error) {
    console.error("Error:", error)
    return { success: false, message: "An error occurred. Please try again." }
  }
}

export { guestLogin }
