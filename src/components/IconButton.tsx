import React from 'react';
import '../css/components/IconButton.css';
type IconButtonProps = 
{
  name: string;             
  size?: number;           
  onClick?: () => void;      
  className?: string;     
}

export default function IconButton({
  name,
  size = 24,
  onClick,
  className = ''
}: IconButtonProps) {
  const iconSrc = `/src/assets/icons/${name}.svg`;

  return (
    <button
      onClick={onClick}
      className={`icon-button ${className}`}
      style={{ width: size, height: size }}
    >
      <img src={iconSrc} alt={name} style={{ width: '100%', height: '100%' }} />
    </button>
  );
}