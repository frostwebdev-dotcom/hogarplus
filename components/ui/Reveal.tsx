'use client';

import { motion, useReducedMotion, type Variants } from 'framer-motion';
import type { ElementType, ReactNode } from 'react';

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Seconds of delay — used to stagger siblings without a parent orchestrator. */
  delay?: number;
  /** Distance travelled on entry, in pixels. */
  distance?: number;
  as?: ElementType;
};

/**
 * Scroll-triggered entrance animation.
 *
 * Deliberately restrained: a short fade with a small upward drift, played once.
 * When the user prefers reduced motion the element renders in its final state
 * immediately — no transform, no opacity transition.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  distance = 20,
  as = 'div'
}: RevealProps) {
  const shouldReduceMotion = useReducedMotion();
  const MotionTag = motion[as as keyof typeof motion] as typeof motion.div;

  const variants: Variants = {
    hidden: shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: distance },
    visible: {
      opacity: 1,
      y: 0,
      transition: shouldReduceMotion
        ? { duration: 0 }
        : { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }
    }
  };

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.25, margin: '0px 0px -80px 0px' }}
      variants={variants}
    >
      {children}
    </MotionTag>
  );
}

/**
 * Parent wrapper that staggers `RevealItem` children.
 * Use for grids where a per-child `delay` prop would be noisy.
 */
export function RevealGroup({
  children,
  className,
  stagger = 0.08,
  as = 'div'
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
  as?: ElementType;
}) {
  const shouldReduceMotion = useReducedMotion();
  const MotionTag = motion[as as keyof typeof motion] as typeof motion.div;

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15, margin: '0px 0px -60px 0px' }}
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: shouldReduceMotion ? 0 : stagger }
        }
      }}
    >
      {children}
    </MotionTag>
  );
}

export const revealItemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } }
};

export const revealItemVariantsReduced: Variants = {
  hidden: { opacity: 1, y: 0 },
  visible: { opacity: 1, y: 0, transition: { duration: 0 } }
};
