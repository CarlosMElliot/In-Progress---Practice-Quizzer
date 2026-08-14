import React from 'react';

interface TimelineBarProps {
  progress: number; // 0 to 100
  variant?: 'teal' | 'amber' | 'royal';
  height?: number; // default 8px
  className?: string;
  showMarkerDot?: boolean;
}

export const TimelineBar: React.FC<TimelineBarProps> = ({
  progress,
  variant = 'royal',
  height = 8,
  className = '',
  showMarkerDot = true,
}) => {
  const clampedProgress = Math.min(100, Math.max(0, progress));

  let fillColor = '#4C6FFF'; // royal
  let glowShadow = '0 0 10px rgba(76, 111, 255, 0.6)';

  if (variant === 'amber') {
    fillColor = '#F5C247';
    glowShadow = '0 0 10px rgba(245, 194, 71, 0.6)';
  } else if (variant === 'teal') {
    fillColor = '#3DDC97';
    glowShadow = '0 0 10px rgba(61, 220, 151, 0.6)';
  }

  const trackBg = '#202949';

  return (
    <div className={`relative w-full select-none ${className}`} style={{ height: `${height}px` }}>
      {/* Background timeline track */}
      <div
        className="w-full h-full rounded-full overflow-hidden"
        style={{ backgroundColor: trackBg }}
      >
        {/* Filled timeline progress segment */}
        <div
          className="h-full transition-all duration-300 ease-out rounded-full"
          style={{
            width: `${clampedProgress}%`,
            backgroundColor: fillColor,
            boxShadow: glowShadow,
          }}
        />
      </div>

      {/* Signature Timeline Circular Marker Dot */}
      {showMarkerDot && clampedProgress > 0 && clampedProgress <= 100 && (
        <div
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 rounded-full transition-all duration-300 ease-out border-2"
          style={{
            left: `${clampedProgress}%`,
            width: `${height + 8}px`,
            height: `${height + 8}px`,
            backgroundColor: fillColor,
            borderColor: '#161C36',
            boxShadow: glowShadow,
          }}
        />
      )}
    </div>
  );
};
