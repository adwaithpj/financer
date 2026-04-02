import type { HTMLAttributes, ReactNode } from 'react';

function cn(...parts: (string | undefined | false)[]) {
  return parts.filter(Boolean).join(' ');
}

const shell =
  'rounded-none border border-zinc-800 bg-white text-black shadow-none transition-colors dark:border-zinc-700 dark:bg-zinc-950 dark:text-white';

export type CardProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
};

export function Card({ children, className, ...props }: CardProps) {
  return (
    <div className={cn(shell, className)} {...props}>
      {children}
    </div>
  );
}

export type CardSectionProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
};

export function CardHeader({
  children,
  className,
  ...props
}: CardSectionProps) {
  return (
    <div
      className={cn(
        'border-b border-zinc-200 px-4 py-3 dark:border-zinc-800',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardContent({
  children,
  className,
  ...props
}: CardSectionProps) {
  return (
    <div className={cn('px-4 py-4', className)} {...props}>
      {children}
    </div>
  );
}

export function CardFooter({
  children,
  className,
  ...props
}: CardSectionProps) {
  return (
    <div
      className={cn(
        'border-t border-zinc-200 px-4 py-3 dark:border-zinc-800',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export type CardTitleProps = HTMLAttributes<HTMLHeadingElement> & {
  children: ReactNode;
};

export function CardTitle({ children, className, ...props }: CardTitleProps) {
  return (
    <h3
      className={cn('text-lg font-bold tracking-tight', className)}
      {...props}
    >
      {children}
    </h3>
  );
}

export type CardDescriptionProps = HTMLAttributes<HTMLParagraphElement> & {
  children: ReactNode;
};

export function CardDescription({
  children,
  className,
  ...props
}: CardDescriptionProps) {
  return (
    <p
      className={cn('mt-1 text-sm text-zinc-500 dark:text-zinc-400', className)}
      {...props}
    >
      {children}
    </p>
  );
}
