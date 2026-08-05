import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

const TONE_CLASS = {
  blue: 'from-brand-blue/90 via-brand-blue/70 to-navy',
  purple: 'from-brand-purple/90 via-brand-purple/70 to-navy',
  orchid: 'from-brand-orchid/90 via-brand-purple/70 to-navy',
  navy: 'from-navy-600 via-navy-800 to-navy-950'
} as const;

export type PanelTone = keyof typeof TONE_CLASS;

/**
 * Branded gradient surface used wherever real photography is not yet available
 * (about panel, gallery placeholders, booking panel). Keeps the demo looking
 * finished instead of showing broken-image frames.
 */
export function GradientPanel({
  tone = 'blue',
  className,
  children
}: {
  tone?: PanelTone;
  className?: string;
  children?: ReactNode;
}) {
  return (
    <div
      className={cn(
        'relative isolate overflow-hidden bg-gradient-to-br',
        TONE_CLASS[tone],
        className
      )}
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -right-10 -top-10 h-48 w-48 rounded-full bg-white/15 blur-2xl" />
        <div className="absolute -bottom-16 -left-10 h-56 w-56 rounded-full bg-brand-orchid/25 blur-3xl" />
        <div className="absolute inset-0 grain opacity-70" />
      </div>
      {children}
    </div>
  );
}
