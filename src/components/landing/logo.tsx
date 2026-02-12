import React from 'react';

interface LogoProps {
  className?: string;
  width?: number;
  height?: number;
}

export const Logo: React.FC<LogoProps> = ({ className = "", width = 24, height = 24 }) => {
  return (
    <svg 
      width={width} 
      height={height} 
      viewBox="0 0 115 156" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect y="39" width="17" height="78" rx="4" fill="currentColor"/>
      <path d="M37 4C37 1.79086 38.7925 -0.0106849 40.9988 0.100732C82.2187 2.18228 115 36.2629 115 78C115 119.737 82.2187 153.818 40.9988 155.899C38.7925 156.011 37 154.209 37 152V4Z" fill="currentColor"/>
    </svg>
  );
};