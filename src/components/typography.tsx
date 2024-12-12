import { cn } from '@/lib/utils'

interface IProps extends React.PropsWithChildren {
  className?: string
}

export const Typography = {
  H1: ({ children, className }: IProps): React.ReactNode => {
    return (
      <h1
        className={cn(
          'scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl',
          className,
        )}
      >
        {children}
      </h1>
    )
  },
  H2: ({ children, className }: IProps): React.ReactNode => {
    return (
      <h2
        className={cn(
          'scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0',
          className,
        )}
      >
        {children}
      </h2>
    )
  },
  H3: ({ children, className }: IProps): React.ReactNode => {
    return (
      <h3
        className={cn(
          'scroll-m-20 text-2xl font-semibold tracking-tight',
          className,
        )}
      >
        {children}
      </h3>
    )
  },
  H4: ({ children, className }: IProps): React.ReactNode => {
    return (
      <h4
        className={cn(
          'scroll-m-20 text-xl font-semibold tracking-tight',
          className,
        )}
      >
        {children}
      </h4>
    )
  },
  P: ({ children, className }: IProps): React.ReactNode => {
    return <p className={cn('leading-7', className)}>{children}</p>
  },
  Blockquote: ({ children, className }: IProps): React.ReactNode => {
    return (
      <blockquote className={cn('mt-6 bo  rder-l-2 pl-6 italic', className)}>
        {children}
      </blockquote>
    )
  },
  Code: ({ children, className }: IProps): React.ReactNode => {
    return (
      <code
        className={cn(
          'relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-[0.9em]',
          className,
        )}
      >
        {children}
      </code>
    )
  },
  Lead: ({ children, className }: IProps): React.ReactNode => {
    return (
      <p className={cn('text-xl text-muted-foreground', className)}>
        {children}
      </p>
    )
  },
  Large: ({ children, className }: IProps): React.ReactNode => {
    return <p className={cn('text-lg font-semibold', className)}>{children}</p>
  },
  Small: ({ children, className }: IProps): React.ReactNode => {
    return (
      <p className={cn('text-sm font-medium leading-none', className)}>
        {children}
      </p>
    )
  },
  Muted: ({ children, className }: IProps): React.ReactNode => {
    return (
      <p className={cn('text-sm text-muted-foreground', className)}>
        {children}
      </p>
    )
  },
}
