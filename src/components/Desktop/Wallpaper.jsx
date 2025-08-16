import React, { useState, useEffect } from 'react'

const Wallpaper = ({ type = 'gradient', variant = 'default' }) => {
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 60000) // Update every minute for time-based wallpapers

    return () => clearInterval(timer)
  }, [])

  // Different wallpaper configurations
  const wallpapers = {
    gradient: {
      default: {
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        pattern: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.08'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      },
      blue: {
        background: 'linear-gradient(135deg, #4f46e5 0%, #06b6d4 100%)',
        pattern: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M20 20c0 11.046-8.954 20-20 20s-20-8.954-20-20 8.954-20 20-20 20 8.954 20 20zm0 0c0-11.046 8.954-20 20-20s20 8.954 20 20-8.954 20-20 20-20-8.954-20-20z'/%3E%3C/g%3E%3C/svg%3E")`,
      },
      purple: {
        background: 'linear-gradient(135deg, #7c3aed 0%, #ec4899 100%)',
        pattern: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpolygon points='10,0 20,10 10,20 0,10'/%3E%3C/g%3E%3C/svg%3E")`,
      },
    },
    solid: {
      dark: {
        background: '#1a1a1a',
        pattern: null,
      },
      black: {
        background: '#000000',
        pattern: null,
      },
      blue: {
        background: '#1e40af',
        pattern: null,
      },
    },
    dynamic: {
      timeOfDay: {
        background: getTimeBasedGradient(currentTime),
        pattern: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M0 0h80v80H0V0zm20 20v40h40V20H20zm20 35a15 15 0 1 1 0-30 15 15 0 0 1 0 30z' fill-rule='evenodd'/%3E%3C/g%3E%3C/svg%3E")`,
      },
    },
  }

  function getTimeBasedGradient(time) {
    const hour = time.getHours()

    if (hour >= 6 && hour < 12) {
      // Morning - warm sunrise colors
      return 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 50%, #fecfef 100%)'
    } else if (hour >= 12 && hour < 17) {
      // Afternoon - bright blue sky
      return 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)'
    } else if (hour >= 17 && hour < 20) {
      // Evening - sunset colors
      return 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)'
    } else {
      // Night - dark purple/blue
      return 'linear-gradient(135deg, #2c3e50 0%, #34495e 100%)'
    }
  }

  const selectedWallpaper =
    wallpapers[type]?.[variant] || wallpapers.gradient.default

  const wallpaperStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: selectedWallpaper.background,
    backgroundImage: selectedWallpaper.pattern,
    backgroundSize: selectedWallpaper.pattern ? '60px 60px' : 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'repeat',
    transition: 'all 0.5s ease-in-out',
    zIndex: -1,
  }

  // Add subtle animation for dynamic wallpapers
  const animatedOverlayStyle =
    type === 'dynamic'
      ? {
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `radial-gradient(circle at ${
            Math.sin(Date.now() / 10000) * 20 + 50
          }% ${
            Math.cos(Date.now() / 8000) * 20 + 50
          }%, rgba(255,255,255,0.1) 0%, transparent 50%)`,
          animation: 'wallpaperFloat 20s ease-in-out infinite',
          pointerEvents: 'none',
        }
      : null

  return (
    <>
      <div style={wallpaperStyle} />
      {animatedOverlayStyle && <div style={animatedOverlayStyle} />}

      {/* CSS animations */}
      <style>
        {`
          @keyframes wallpaperFloat {
            0%, 100% {
              opacity: 0.1;
            }
            50% {
              opacity: 0.3;
            }
          }

          @keyframes patternShift {
            0% {
              background-position: 0 0;
            }
            100% {
              background-position: 60px 60px;
            }
          }
        `}
      </style>
    </>
  )
}

// Wallpaper preset selector component
export const WallpaperSelector = ({
  currentType,
  currentVariant,
  onWallpaperChange,
}) => {
  const wallpaperOptions = [
    {
      type: 'gradient',
      variant: 'default',
      name: 'Default Purple',
      preview: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    },
    {
      type: 'gradient',
      variant: 'blue',
      name: 'Ocean Blue',
      preview: 'linear-gradient(135deg, #4f46e5 0%, #06b6d4 100%)',
    },
    {
      type: 'gradient',
      variant: 'purple',
      name: 'Purple Pink',
      preview: 'linear-gradient(135deg, #7c3aed 0%, #ec4899 100%)',
    },
    { type: 'solid', variant: 'dark', name: 'Dark Gray', preview: '#1a1a1a' },
    { type: 'solid', variant: 'black', name: 'Pure Black', preview: '#000000' },
    {
      type: 'dynamic',
      variant: 'timeOfDay',
      name: 'Time of Day',
      preview: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
    },
  ]

  const selectorStyle = {
    position: 'fixed',
    top: '50px',
    right: '20px',
    background: 'rgba(255, 255, 255, 0.9)',
    backdropFilter: 'blur(10px)',
    borderRadius: '12px',
    padding: '16px',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
    zIndex: 1001,
  }

  const optionStyle = (isSelected) => ({
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '8px',
    borderRadius: '8px',
    cursor: 'pointer',
    background: isSelected ? 'rgba(59, 130, 246, 0.1)' : 'transparent',
    border: isSelected ? '1px solid #3b82f6' : '1px solid transparent',
    marginBottom: '4px',
    transition: 'all 0.2s ease',
  })

  const previewStyle = (background) => ({
    width: '24px',
    height: '24px',
    borderRadius: '4px',
    background: background,
    border: '1px solid rgba(0, 0, 0, 0.1)',
  })

  return (
    <div style={selectorStyle}>
      <h3
        style={{
          fontSize: '14px',
          fontWeight: '600',
          marginBottom: '12px',
          color: '#374151',
        }}
      >
        Wallpaper
      </h3>
      {wallpaperOptions.map((option) => (
        <div
          key={`${option.type}-${option.variant}`}
          style={optionStyle(
            currentType === option.type && currentVariant === option.variant
          )}
          onClick={() => onWallpaperChange(option.type, option.variant)}
        >
          <div style={previewStyle(option.preview)} />
          <span style={{ fontSize: '13px', color: '#374151' }}>
            {option.name}
          </span>
        </div>
      ))}
    </div>
  )
}

export default Wallpaper
