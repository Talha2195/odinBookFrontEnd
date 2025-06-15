import { useState } from "react"
import { guestLogin } from "../apiCalls/handleGuestLogin"

export default function LoginPage() {
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)

  const handleGuestLogin = async (event) => {
    event.preventDefault()
    const result = await guestLogin()
    if (result.success) {
      setSuccess("Guest login successful! Redirecting...")
      setError(null)

      setTimeout(() => {
        window.location.href = "/profile"
      }, 2000)
    } else {
      setError(result.message)
      setSuccess(null)
    }
  }

  const handleGitHubAuth = async () => {
    setSuccess("Redirecting to GitHub login...")
    setTimeout(() => {
      window.location.href = "http://localhost:5000/auth/github"
    }, 2000)
  }

  return (
    <div className="flex h-screen bg-gray-200">
      <div className="w-1/2 h-screen bg-white p-8 shadow-lg rounded-none flex flex-col justify-center">
        <h1 className="text-2xl mb-6 text-center font-bold">Please log in</h1>
        <div className="space-y-4">
          <button
            onClick={handleGuestLogin}
            className="w-full p-4 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center justify-center"
          >
            <img
              src="/images/guestLogin.svg"
              alt="Guest"
              className="w-5 h-5 mr-2"
            />
            Login as Guest
          </button>
          <button
            onClick={handleGitHubAuth}
            className="w-full p-4 bg-gray-800 text-white rounded hover:bg-gray-900 flex items-center justify-center"
          >
            <img
              src="/images/githubIcon.svg"
              alt="GitHub"
              className="w-5 h-5 mr-2"
            />
            Login with GitHub
          </button>
        </div>
        {error && <p className="text-red-500 text-center mt-4">{error}</p>}
        {success && (
          <p className="text-green-500 text-center mt-4">{success}</p>
        )}
      </div>
      <div className="w-1/2 h-screen bg-blue-500 text-white flex items-center justify-center shadow-lg rounded-none">
        <h1 className="text-4xl font-bold">Welcome to OdinBook</h1>
      </div>
    </div>
  )
}
