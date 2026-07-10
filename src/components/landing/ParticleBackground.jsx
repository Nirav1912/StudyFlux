export default function ParticleBackground() {
  return (
    <>
      <div className="fixed inset-0 -z-20 bg-slate-950" />

      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute w-[500px] h-[500px] rounded-full bg-blue-600/20 blur-[120px] -top-32 -left-32 animate-pulse"></div>

        <div className="absolute w-[500px] h-[500px] rounded-full bg-purple-600/20 blur-[120px] bottom-0 right-0 animate-pulse"></div>

        <div className="absolute w-[300px] h-[300px] rounded-full bg-cyan-500/10 blur-[100px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
      </div>
    </>
  );
}