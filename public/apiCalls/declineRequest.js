const API_URL = process.env.NEXT_PUBLIC_API_URL

async function declineReq(requestId) {
  try {
    const response = await fetch(`${API_URL}/declineReq`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        requestId: requestId,
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

export { declineReq }
