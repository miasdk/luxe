import { useState } from "react"
import { Mail } from "lucide-react"
import newsletterService from "../services/newsletterService"

const NewsletterForm = () => {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState("idle") // idle, loading, success, error
  const [error, setError] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus("loading")
    setError("")

    // Basic email validation
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address")
      setStatus("error")
      return
    }

    try {
      await newsletterService.subscribe(email)
      setStatus("success")
      setEmail("")
    } catch (err) {
      setError(err.message || "Failed to subscribe. Please try again.")
      setStatus("error")
    }
  }

  return (
    <div className="max-w-xl mx-auto">
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Mail size={20} className="text-gray-400" />
          </div>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className={`w-full pl-12 pr-4 py-4 bg-white/10 border ${
              status === "error" ? "border-red-500" : "border-white/20"
            } rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all`}
            disabled={status === "loading"}
          />
          {error && (
            <p className="mt-2 text-sm text-red-400">{error}</p>
          )}
        </div>
        <button
          type="submit"
          disabled={status === "loading"}
          className={`px-8 py-4 bg-white text-gray-900 rounded-lg font-medium transition-all ${
            status === "loading"
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-gray-100"
          }`}
        >
          {status === "loading" ? (
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 border-2 border-gray-900 border-t-transparent rounded-full animate-spin" />
              <span>Subscribing...</span>
            </div>
          ) : status === "success" ? (
            "Subscribed!"
          ) : (
            "Subscribe"
          )}
        </button>
      </form>
      {status === "success" && (
        <p className="mt-4 text-sm text-green-400 text-center">
          Thank you for subscribing! We'll keep you updated with our latest collections and offers.
        </p>
      )}
    </div>
  )
}

export default NewsletterForm 