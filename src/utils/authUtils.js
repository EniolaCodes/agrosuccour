"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

/**
 * A hook to protect routes that require authentication
 * @returns Object containing authentication state and loading state
 */
export function useAuth() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState(null)

  useEffect(() => {
    // Check for authentication token
    const token = localStorage.getItem("token")

    if (!token) {
      setIsAuthenticated(false)
      setIsLoading(false)
      return
    }

    // Here you could validate the token with your backend
    // For now, we'll just consider having a token as being authenticated
    setIsAuthenticated(true)

    // You could also fetch user data here if needed
    // const userData = fetchUserData(token);
    // setUser(userData);

    setIsLoading(false)
  }, [])

  const logout = () => {
    localStorage.removeItem("token")
    setIsAuthenticated(false)
    setUser(null)
    router.push("/login")
  }

  return {
    isAuthenticated,
    isLoading,
    user,
    logout,
  }
}

/**
 * A hook to protect routes that require authentication
 * Will automatically redirect to login if not authenticated
 */
export function useProtectedRoute(redirectTo = "/checkout") {
  const router = useRouter()
  const { isAuthenticated, isLoading, user, logout } = useAuth()

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push(redirectTo)
    }
  }, [isAuthenticated, isLoading, redirectTo, router])

  return { isAuthenticated, isLoading, user, logout }
}
