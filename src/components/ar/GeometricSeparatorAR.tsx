'use client';

export default function GeometricSeparatorAR() {
  return (
    <div className="relative py-16 overflow-hidden bg-white">
      {/* Dot grid pattern */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className="w-full max-w-5xl h-16 opacity-[0.15]"
          style={{
            backgroundImage: `radial-gradient(circle, #0B1E3D 1px, transparent 1px)`,
            backgroundSize: '24px 24px',
          }}
        />
      </div>

      {/* Center accent line with diamond */}
      <div className="relative flex items-center justify-center gap-4">
        <div className="h-px w-24 sm:w-40 bg-gradient-to-r from-transparent to-[#0B1E3D]/20" />
        <div className="relative flex items-center gap-3">
          <div className="w-1.5 h-1.5 rotate-45 bg-[#C17F3E]" />
          <div className="w-2.5 h-2.5 rotate-45 border-2 border-[#C17F3E] bg-white" />
          <div className="w-1.5 h-1.5 rotate-45 bg-[#C17F3E]" />
        </div>
        <div className="h-px w-24 sm:w-40 bg-gradient-to-l from-transparent to-[#0B1E3D]/20" />
      </div>
    </div>
  );
}
