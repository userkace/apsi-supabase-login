import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import GlassCard from '../components/GlassCard'
import Button from '../components/Button'

export default function Signup() {
  const { signup } = useAuth()
  const nav = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const onSubmit = async (e) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      return setError("Passwords don't match")
    }

    setLoading(true)
    setError('')
    try {
      await signup(email, password)
      nav('/app')
    } catch (err) {
      setError(err.message || 'Failed to create an account')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="mx-auto max-w-md px-4 py-16">
      <GlassCard className="p-8">
        <h2 className="text-2xl font-bold text-center">Create an account</h2>
        <p className="text-white/70 mt-1 text-center">Join us today</p>

        <form className="mt-6 space-y-4" onSubmit={onSubmit}>
          <div>
            <label className="block text-sm mb-2 text-white/80">Email</label>
            <input
              className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/60 
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-brand-400 transition-all duration-200
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900 focus-visible:ring-brand-400"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm mb-2 text-white/80">Password</label>
            <input
              className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/60 
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-brand-400 transition-all duration-200
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900 focus-visible:ring-brand-400"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              minLength={6}
            />
          </div>

          <div>
            <label className="block text-sm mb-2 text-white/80">Confirm Password</label>
            <input
              className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/60 
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-brand-400 transition-all duration-200
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900 focus-visible:ring-brand-400"
              type="password"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              required
              minLength={6}
            />
          </div>

          {error && <p className="text-red-300 text-sm">{error}</p>}

          <Button
            type="submit"
            variant="ghost"
            className="w-full justify-center mt-4 py-4"
            loading={loading}
            disabled={loading}
            iconRight
          >
            Sign Up
          </Button>
        </form>

        <p className="text-center text-sm text-white/70 mt-6">
          Already have an account?{' '}
          <Link to="/login" className="text-brand-300 hover:text-brand-200 font-medium">
            Sign in
          </Link>
        </p>
      </GlassCard>
    </main>
  )
}
