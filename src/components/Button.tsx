import React from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  isLoading?: boolean
  children: React.ReactNode
}

const COLORS = {
  primary: {
    bg: 'bg-emerald-700 hover:bg-emerald-800',
    text: 'text-white',
  },
  secondary: {
    bg: 'bg-amber-600 hover:bg-amber-700',
    text: 'text-white',
  },
  outline: {
    bg: 'border-2 border-emerald-700 hover:bg-emerald-50',
    text: 'text-emerald-700',
  },
  danger: {
    bg: 'bg-red-600 hover:bg-red-700',
    text: 'text-white',
  },
}

const SIZES = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg',
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled,
  children,
  className,
  ...props
}) => {
  const color = COLORS[variant]
  const sizeClass = SIZES[size]

  return (
    <button
      disabled={disabled || isLoading}
      className={`
        font-semibold rounded-lg transition-all duration-200 ease-in-out
        ${color.bg} ${color.text} ${sizeClass}
        disabled:opacity-50 disabled:cursor-not-allowed
        ${className || ''}
      `}
      {...props}
    >
      {isLoading ? (
        <span className="flex items-center gap-2">
          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.2" />
            <path
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          Loading...
        </span>
      ) : (
        children
      )}
    </button>
  )
}

export default Button
