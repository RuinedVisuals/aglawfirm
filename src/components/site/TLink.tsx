'use client';

import Link from 'next/link';
import { forwardRef, type AnchorHTMLAttributes } from 'react';
import { useSite } from './SiteProvider';

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

// Internal link that runs the column-curtain transition.
export const TLink = forwardRef<HTMLAnchorElement, Props>(function TLink({ href, onClick, children, ...rest }, ref) {
  const { navigate } = useSite();
  return (
    <Link
      ref={ref}
      href={href}
      {...rest}
      onClick={(e) => {
        onClick?.(e);
        if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
        e.preventDefault();
        navigate(href);
      }}
    >
      {children}
    </Link>
  );
});
