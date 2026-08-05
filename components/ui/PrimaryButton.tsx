import type { ComponentProps, ReactNode } from 'react';
import { ArrowRight } from 'lucide-react';

import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/utils';

type Variant = 'primary' | 'secondary' | 'ghostLight';
type Size = 'md' | 'sm';

const VARIANT_CLASS: Record<Variant, string> = {
  primary: 'btn-primary',
  secondary: 'btn-secondary',
  ghostLight: 'btn-ghost-light'
};

type BaseProps = {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  /** Shows a trailing arrow that nudges right on hover. */
  withArrow?: boolean;
  icon?: ReactNode;
};

type LinkProps = BaseProps & {
  /** Internal route (locale is added automatically) or an absolute/tel/mailto URL. */
  href: ComponentProps<typeof Link>['href'] | string;
  external?: boolean;
};

/**
 * The single button/CTA primitive.
 *
 * It always renders a real `<a>` — these are navigations, not actions. For
 * genuine actions (submitting, opening a dialog) use a `<button>` with the
 * `.btn .btn-primary` classes directly, so semantics stay honest.
 */
export function PrimaryButton({
  children,
  href,
  external,
  variant = 'primary',
  size = 'md',
  className,
  withArrow = false,
  icon
}: LinkProps) {
  const classes = cn(VARIANT_CLASS[variant], size === 'sm' && 'btn-sm', 'group', className);

  const content = (
    <>
      {icon}
      <span>{children}</span>
      {withArrow ? (
        <ArrowRight
          aria-hidden="true"
          className="h-4 w-4 shrink-0 transition-transform duration-300 ease-brand group-hover:translate-x-1 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0"
        />
      ) : null}
    </>
  );

  const isAbsolute =
    typeof href === 'string' &&
    (href.startsWith('http') || href.startsWith('tel:') || href.startsWith('mailto:') || href.startsWith('#'));

  if (external || isAbsolute) {
    const isHttp = typeof href === 'string' && href.startsWith('http');
    return (
      <a
        href={href as string}
        className={classes}
        {...(isHttp ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={href as ComponentProps<typeof Link>['href']} className={classes}>
      {content}
    </Link>
  );
}
