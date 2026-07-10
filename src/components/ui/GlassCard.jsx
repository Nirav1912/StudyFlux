export default function GlassCard({ children, className = "" }) {
  return (
    <div
      className={`
        backdrop-blur-xl
        bg-white/5
        border
        border-white/10
        rounded-3xl
        shadow-2xl
        ${className}
      `}
    >
      {children}
    </div>
  );
}