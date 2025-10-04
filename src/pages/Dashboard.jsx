import GlassCard from '../components/GlassCard'
import { useAuth } from '../context/AuthContext'

export default function Dashboard() {
  const { user } = useAuth()

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <h2 className="text-3xl font-bold">Dashboard</h2>
      <p className="text-white/70 mt-1">You're signed in as <span className="font-semibold">{user?.email}</span></p>

      <section className="mt-8 grid md:grid-cols-3 gap-6">
        {["Usage","Projects","Activity"].map((t,i) => (
          <GlassCard key={i} className="p-6">
            <h3 className="font-semibold text-lg">{t}</h3>
            <p className="mt-2 text-white/80">Sample content. Replace with real data from Supabase.</p>
          </GlassCard>
        ))}
      </section>
    </main>
  )
}