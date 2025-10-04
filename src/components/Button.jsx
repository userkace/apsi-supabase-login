import React from 'react';
import { Link } from 'react-router-dom';
import { FaSpinner, FaArrowRight, FaSignInAlt } from 'react-icons/fa';

const Button = ({
  children,
  variant = 'primary',
  to,
  className = '',
  disabled = false,
  loading = false,
  icon: Icon,
  iconRight = false,
  iconOnly = false,
  onClick,
  ...props
}) => {
  // Base button classes
  const baseClasses = 'px-4 py-2 rounded-xl font-medium transition-transform duration-200 active:scale-95';

  // Variant classes
  const variants = {
    primary: [
      'cursor-pointer',
      'bg-gradient-to-r from-blue-500 to-blue-600',
      'hover:from-blue-600 hover:to-blue-700',
      'active:from-blue-700 active:to-blue-800',
      'text-white font-semibold',
      'shadow-lg',
      'shadow-blue-500/30 hover:shadow-blue-500/40',
      'ring-2 ring-blue-400/50',
      'transition-all duration-200',
    ].join(' '),
    ghost: [
      'cursor-pointer',
      'bg-white/10',
      'hover:bg-white/20',
      'text-white',
    ].join(' '),
  };

  const buttonClasses = [
    baseClasses,
    variants[variant] || variants.primary,
    disabled ? 'opacity-50 cursor-not-allowed' : '',
    'relative overflow-hidden',
    'inline-flex items-center justify-center gap-2',
    iconOnly ? 'p-2' : '',
    className
  ].filter(Boolean).join(' ');

  // Default icons based on context
  const getDefaultIcon = () => {
    if (to === '/login') return <FaSignInAlt />;
    return null;
  };

  const renderContent = () => (
    <>
      {loading ? (
        <FaSpinner className="animate-spin" />
      ) : (
        <>
          {!iconRight && (Icon || getDefaultIcon())}
          {!iconOnly && <span>{children}</span>}
          {iconRight && (Icon || getDefaultIcon())}
        </>
      )}
    </>
  );

  // If there's a 'to' prop, render as a Link, otherwise as a button
  if (to) {
    return (
      <Link 
        to={to} 
        className={buttonClasses} 
        onClick={onClick}
        disabled={disabled || loading}
        {...props}
      >
        {renderContent()}
      </Link>
    );
  }

  return (
    <button
      className={buttonClasses}
      disabled={disabled || loading}
      onClick={onClick}
      {...props}
    >
      {renderContent()}
    </button>
  );
};

export default Button;
