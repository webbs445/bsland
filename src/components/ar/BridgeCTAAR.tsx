export default function BridgeCTAAR() {
  const items = Array(8).fill('Best Solution®');

  return (
    <div className="relative py-6 bg-white overflow-hidden" dir="ltr">
      {/* Center copper glow bloom */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-16 rounded-full bg-brand-copper/[0.06] blur-3xl pointer-events-none" />

      {/* Scrolling watermark - We keep dir="ltr" for the scrolling text to maintain continuity if brand is English */}
      <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]">
        <div
          className="flex items-center gap-10 w-max"
          style={{ animation: 'fz-scroll 60s linear infinite' }}
        >
          {[...Array(2)].map((_, setIndex) =>
            items.map((text, i) => (
              <span
                key={`${setIndex}-${i}`}
                className="text-[clamp(2rem,5vw,3.5rem)] font-black uppercase tracking-[0.25em] whitespace-nowrap select-none leading-none bg-gradient-to-r from-brand-navy/[0.08] via-brand-copper/[0.12] to-brand-navy/[0.08] bg-clip-text text-transparent"
              >
                {text}
              </span>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
