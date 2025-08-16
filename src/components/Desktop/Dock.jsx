import React, { useState } from 'react'
import Icon from '../UI/Icon'
import { dockApps } from '../../data/apps'

const Dock = ({ onOpenApp, openWindows = [], onMinimizeApp }) => {
  const [hoveredApp, setHoveredApp] = useState(null)

  const dockStyle = {
    position: 'fixed',
    bottom: '16px',
    left: '50%',
    transform: 'translateX(-50%)',
    background: 'rgba(255, 255, 255, 0.15)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    borderRadius: '20px',
    padding: '8px 12px',
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    zIndex: 100,
    border: '1px solid rgba(255, 255, 255, 0.1)',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
  }

  const getDockIconStyle = (app, isHovered, isOpen) => {
    const baseSize = 56
    const hoverScale = isHovered ? 1.2 : 1
    const adjacentScale = 1.1

    return {
      width: `${baseSize * hoverScale}px`,
      height: `${baseSize * hoverScale}px`,
      borderRadius: '12px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      position: 'relative',
      background: app.color,
      color: 'white',
      margin: '0 2px',
      transform: isHovered ? 'translateY(-8px)' : 'translateY(0)',
      boxShadow: isHovered
        ? '0 8px 20px rgba(0, 0, 0, 0.3)'
        : '0 2px 8px rgba(0, 0, 0, 0.2)',
    }
  }

  const tooltipStyle = (appTitle) => ({
    position: 'absolute',
    bottom: '100%',
    left: '50%',
    transform: 'translateX(-50%)',
    background: 'rgba(0, 0, 0, 0.8)',
    color: 'white',
    padding: '4px 8px',
    borderRadius: '4px',
    fontSize: '12px',
    whiteSpace: 'nowrap',
    marginBottom: '8px',
    opacity: hoveredApp === appTitle ? 1 : 0,
    transition: 'opacity 0.2s ease',
    pointerEvents: 'none',
    zIndex: 101,
  })

  const openIndicatorStyle = {
    position: 'absolute',
    bottom: '-6px',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '4px',
    height: '4px',
    background: 'rgba(255, 255, 255, 0.8)',
    borderRadius: '50%',
    transition: 'all 0.2s ease',
  }

  const handleAppClick = (app) => {
    const openWindow = openWindows.find((w) => w.id === app.id)

    if (openWindow) {
      // If app is already open, minimize/restore it
      if (onMinimizeApp) {
        onMinimizeApp(app.id)
      }
    } else {
      // Open new app
      onOpenApp(app)
    }
  }

  const handleTrashClick = () => {
    // Special handling for trash
    const trashContent =
      openWindows.length > 0
        ? `${openWindows.length} open window(s)`
        : 'Trash is empty'

    alert(`🗑️ ${trashContent}\n\nTrash functionality coming soon!`)
  }

  return (
    <div style={dockStyle}>
      {dockApps.map((app, index) => {
        const isOpen = openWindows.some((w) => w.id === app.id)
        const isHovered = hoveredApp === app.id

        return (
          <div
            key={app.id}
            style={getDockIconStyle(app, isHovered, isOpen)}
            onClick={() => {
              if (app.id === 'trash') {
                handleTrashClick()
              } else {
                handleAppClick(app)
              }
            }}
            onMouseEnter={() => setHoveredApp(app.id)}
            onMouseLeave={() => setHoveredApp(null)}
          >
            {/* Tooltip */}
            <div style={tooltipStyle(app.id)}>{app.title}</div>

            {/* App Icon */}
            <Icon name={app.icon} size={isHovered ? 36 : 32} color="white" />

            {/* Open Indicator */}
            {isOpen && <div style={openIndicatorStyle} />}

            {/* Bounce effect for newly opened apps */}
            <style jsx>{`
              @keyframes bounce {
                0%,
                20%,
                53%,
                80%,
                100% {
                  transform: translate3d(0, 0, 0);
                }
                40%,
                43% {
                  transform: translate3d(0, -8px, 0);
                }
                70% {
                  transform: translate3d(0, -4px, 0);
                }
                90% {
                  transform: translate3d(0, -2px, 0);
                }
              }
            `}</style>
          </div>
        )
      })}

      {/* Dock separator before trash (optional) */}
      <div
        style={{
          width: '1px',
          height: '40px',
          background: 'rgba(255, 255, 255, 0.2)',
          margin: '0 8px',
        }}
      />

      {/* Additional dock info (optional) */}
      <style jsx>{`
        .dock-magnification {
          transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .dock-item:hover ~ .dock-item,
        .dock-item:has(~ .dock-item:hover) {
          transform: scale(1.1);
        }
      `}</style>
    </div>
  )
}

export default Dock
