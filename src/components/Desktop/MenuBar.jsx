import React, { useState, useEffect } from 'react'

const MenuBar = ({ activeApp = 'Portfolio' }) => {
  const [time, setTime] = useState(new Date())
  const [batteryLevel, setBatteryLevel] = useState(85)
  const [isWifiConnected, setIsWifiConnected] = useState(true)

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date())
    }, 1000)

    // Simulate battery drain
    const batteryTimer = setInterval(() => {
      setBatteryLevel((prev) => Math.max(10, prev - Math.random() * 0.1))
    }, 30000)

    return () => {
      clearInterval(timer)
      clearInterval(batteryTimer)
    }
  }, [])

  const formatTime = (date) => {
    return date.toLocaleTimeString([], {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const menuBarStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    height: '28px',
    background: 'rgba(0, 0, 0, 0.2)',
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 16px',
    color: 'white',
    fontSize: '14px',
    fontWeight: '500',
    zIndex: 1000,
    userSelect: 'none',
    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
  }

  const leftMenuStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
  }

  const rightMenuStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '13px',
  }

  const menuItemStyle = {
    cursor: 'pointer',
    transition: 'opacity 0.2s ease',
    padding: '2px 6px',
    borderRadius: '4px',
  }

  const appleMenuStyle = {
    ...menuItemStyle,
    fontWeight: 'bold',
    fontSize: '16px',
  }

  const statusIconStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    padding: '2px 4px',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease',
  }

  const BatteryIcon = ({ level }) => {
    const batteryColor =
      level > 20 ? '#10b981' : level > 10 ? '#f59e0b' : '#ef4444'

    return (
      <div style={{ position: 'relative', width: '20px', height: '11px' }}>
        <div
          style={{
            width: '18px',
            height: '9px',
            border: '1px solid white',
            borderRadius: '2px',
            position: 'relative',
          }}
        >
          <div
            style={{
              width: `${level}%`,
              height: '100%',
              background: batteryColor,
              borderRadius: '1px',
              transition: 'all 0.3s ease',
            }}
          />
        </div>
        <div
          style={{
            position: 'absolute',
            right: '-3px',
            top: '3px',
            width: '2px',
            height: '3px',
            background: 'white',
            borderRadius: '0 1px 1px 0',
          }}
        />
      </div>
    )
  }

  const WifiIcon = ({ connected }) => (
    <div
      style={{
        width: '16px',
        height: '12px',
        position: 'relative',
        opacity: connected ? 1 : 0.5,
      }}
    >
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: `radial-gradient(ellipse at bottom, white 0%, white 30%, transparent 40%)`,
          borderRadius: '50% 50% 0 0',
        }}
      />
    </div>
  )

  const handleMenuClick = (item) => {
    switch (item) {
      case 'apple':
        // Show about this Mac or sleep options
        break
      case 'wifi':
        setIsWifiConnected(!isWifiConnected)
        break
      case 'battery':
        // Show battery info
        break
      default:
        break
    }
  }

  return (
    <div style={menuBarStyle}>
      {/* Left side menu */}
      <div style={leftMenuStyle}>
        <div
          style={appleMenuStyle}
          onClick={() => handleMenuClick('apple')}
          onMouseEnter={(e) =>
            (e.target.style.background = 'rgba(255, 255, 255, 0.1)')
          }
          onMouseLeave={(e) => (e.target.style.background = 'transparent')}
        >
          🍎
        </div>

        <div
          style={menuItemStyle}
          onMouseEnter={(e) =>
            (e.target.style.background = 'rgba(255, 255, 255, 0.1)')
          }
          onMouseLeave={(e) => (e.target.style.background = 'transparent')}
        >
          {activeApp}
        </div>

        <div
          style={menuItemStyle}
          onMouseEnter={(e) =>
            (e.target.style.background = 'rgba(255, 255, 255, 0.1)')
          }
          onMouseLeave={(e) => (e.target.style.background = 'transparent')}
        >
          File
        </div>

        <div
          style={menuItemStyle}
          onMouseEnter={(e) =>
            (e.target.style.background = 'rgba(255, 255, 255, 0.1)')
          }
          onMouseLeave={(e) => (e.target.style.background = 'transparent')}
        >
          Edit
        </div>

        <div
          style={menuItemStyle}
          onMouseEnter={(e) =>
            (e.target.style.background = 'rgba(255, 255, 255, 0.1)')
          }
          onMouseLeave={(e) => (e.target.style.background = 'transparent')}
        >
          View
        </div>

        <div
          style={menuItemStyle}
          onMouseEnter={(e) =>
            (e.target.style.background = 'rgba(255, 255, 255, 0.1)')
          }
          onMouseLeave={(e) => (e.target.style.background = 'transparent')}
        >
          Window
        </div>

        <div
          style={menuItemStyle}
          onMouseEnter={(e) =>
            (e.target.style.background = 'rgba(255, 255, 255, 0.1)')
          }
          onMouseLeave={(e) => (e.target.style.background = 'transparent')}
        >
          Help
        </div>
      </div>

      {/* Right side status icons */}
      <div style={rightMenuStyle}>
        <div
          style={statusIconStyle}
          onClick={() => handleMenuClick('battery')}
          onMouseEnter={(e) =>
            (e.target.style.background = 'rgba(255, 255, 255, 0.1)')
          }
          onMouseLeave={(e) => (e.target.style.background = 'transparent')}
          title={`Battery: ${Math.round(batteryLevel)}%`}
        >
          <BatteryIcon level={batteryLevel} />
          <span style={{ fontSize: '11px', marginLeft: '2px' }}>
            {Math.round(batteryLevel)}%
          </span>
        </div>

        <div
          style={statusIconStyle}
          onClick={() => handleMenuClick('wifi')}
          onMouseEnter={(e) =>
            (e.target.style.background = 'rgba(255, 255, 255, 0.1)')
          }
          onMouseLeave={(e) => (e.target.style.background = 'transparent')}
          title={isWifiConnected ? 'WiFi Connected' : 'WiFi Disconnected'}
        >
          <WifiIcon connected={isWifiConnected} />
        </div>

        <div
          style={statusIconStyle}
          onMouseEnter={(e) =>
            (e.target.style.background = 'rgba(255, 255, 255, 0.1)')
          }
          onMouseLeave={(e) => (e.target.style.background = 'transparent')}
        >
          🔍
        </div>

        <div
          style={{
            ...statusIconStyle,
            fontSize: '13px',
            fontWeight: '500',
            minWidth: '120px',
            textAlign: 'right',
          }}
          title={time.toLocaleString()}
        >
          {formatTime(time)}
        </div>
      </div>
    </div>
  )
}

export default MenuBar
