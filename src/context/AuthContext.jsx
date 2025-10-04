import React, { createContext, useContext, useEffect, useState } from 'react'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const raw = localStorage.getItem('hfl_auth_user')
    if (raw) setUser(JSON.parse(raw))
    setLoading(false)
  }, [])

  const signup = async (email, password) => {
    // TODO: Replace with Supabase auth
    // Example:
    // const { data, error } = await supabase.auth.signUp({
    //   email,
    //   password,
    // })
    // if (error) throw error
    // return data.user

    // Temporary mock:
    await new Promise(r => setTimeout(r, 1000))
    const fake = { id: `user_${Math.random().toString(36).substr(2, 9)}`, email }
    setUser(fake)
    localStorage.setItem('hfl_auth_user', JSON.stringify(fake))
    return fake
  }

  const login = async (email, password) => {
    // TODO: Replace with Supabase auth (email/password, OTP, OAuth, etc.)
    // Example:
    // const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    // if (error) throw error
    // setUser(data.user)
    // return data.user

    // Temporary mock:
    await new Promise(r => setTimeout(r, 700))
    const fake = { id: 'demo', email }
    setUser(fake)
    localStorage.setItem('hfl_auth_user', JSON.stringify(fake))
    return fake
  }

  const logout = async () => {
    // TODO: supabase.auth.signOut()
    setUser(null)
    localStorage.removeItem('hfl_auth_user')
  }

  const value = { user, loading, login, logout, signup }
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}