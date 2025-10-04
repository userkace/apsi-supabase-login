import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Button from './Button'

export default function Navbar() {
  const { user, logout } = useAuth()
  const nav = useNavigate()
  const loc = useLocation()

  return (
    <header className="sticky top-0 z-50">
      <div className="mx-auto w-full max-w-6xl rounded-xl flex items-center justify-between pt-4">
        <div className="glass-soft pl-4 pr-4 py-3 flex items-center space-x-1">
          <Link to="/" className="font-bold tracking-wide text-lg">TrueVoice</Link>
          <div className="h-6 w-px bg-white/20 mx-1"></div>
          <a href="https://github.com/userkace/true-voice" target="_blank" rel="noopener noreferrer"
            className="p-2 text-white/70 hover:text-white transition-colors" aria-label="GitHub">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" clipRule="evenodd"
                d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.59-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
          </a>
        </div>
        <div className="glass-soft p-3">
          <nav className="flex items-center space-x-2">
                        {user ? (
              <>
                {loc.pathname !== '/app' && (
                  <Button as={Link} to="/app" variant="ghost">
                    Dashboard
                  </Button>
                )}
                <Button variant="ghost" onClick={async ()=> { await logout(); nav('/'); }}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                {loc.pathname === '/' && (
                  <Button
                    as="a"
                    href="#features"
                    variant="ghost"
                    className="hidden sm:inline-flex"
                    onClick={(e)=> {
                      e.preventDefault();
                      document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    Features
                  </Button>
                )}
                <Button as={Link} to="/login" variant="ghost">
                  Login
                </Button>
                <Button as={Link} to="/signup" variant="primary" className="hidden sm:inline-flex">
                  Get Started
                </Button>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  )
}