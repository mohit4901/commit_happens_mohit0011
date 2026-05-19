import React from 'react';

const RiskBadge = ({ level, className = '' }) => {
  const colors = {
    CRITICAL: 'bg-risk-critical text-white',
    HIGH: 'bg-risk-high text-white',
    MEDIUM: 'bg-risk-medium text-black',
    LOW: 'bg-risk-low text-white',
    SAFE: 'bg-risk-safe text-white'
  };

  const style = colors[level] || colors.SAFE;

  return (
    <span className={`px-2 py-1 rounded text-xs font-bold tracking-wide ${style} ${className}`}>
      {level}
    </span>
  );
};

export default RiskBadge;
