import React from 'react';

interface ChakraLogoProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  animated?: boolean;
  showStatusDot?: boolean;
  className?: string;
}

export const ChakraLogo: React.FC<ChakraLogoProps> = ({
  size = 'md',
  animated = true,
  className = '',
}) => {
  // Dimensions mapping
  const sizeMap = {
    xs: { outer: 'w-6 h-6', svg: 'w-4 h-4' },
    sm: { outer: 'w-8 h-8', svg: 'w-6 h-6' },
    md: { outer: 'w-10 h-10', svg: 'w-7 h-7' },
    lg: { outer: 'w-14 h-14', svg: 'w-10 h-10' },
    xl: { outer: 'w-20 h-20', svg: 'w-14 h-14' },
  };

  const current = sizeMap[size];

  return (
    <div
      className={`relative inline-flex items-center justify-center shrink-0 rounded-full bg-surface-container shadow-inner ${current.outer} ${className}`}
    >
      <svg
        className={`${current.svg} text-primary ${animated ? 'animate-spin' : ''}`}
        fill="none"
        style={{ animationDuration: '24s' }}
        viewBox="0 0 100 100"
        aria-hidden="true"
      >
        {/* Outer dashed orbital track */}
        <circle
          cx="50"
          cy="50"
          r="42"
          stroke="#c2c6d7"
          strokeDasharray="6 6"
          strokeLinecap="round"
          strokeWidth="4"
        />
        {/* Active primary cobalt arc */}
        <path
          d="M 50 14 A 36 36 0 1 0 86 50"
          stroke="#0054ca"
          strokeLinecap="round"
          strokeWidth="7"
        />
        {/* Inner purple orbit boundary */}
        <circle
          cx="50"
          cy="50"
          fill="#f1f3ff"
          r="22"
          stroke="#9485ff"
          strokeWidth="5"
        />
        {/* Concentric core node */}
        <circle cx="50" cy="50" fill="#0054ca" r="7" />
      </svg>
    </div>
  );
};
