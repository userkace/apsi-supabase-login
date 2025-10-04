export default function GlassCard({ className = '', children }) {
    return (
      <div className={`glass p-6 ${className}`}>
        {children}
      </div>
    )
  }