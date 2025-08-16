import React, { useState } from 'react'
import MenuBar from './MenuBar'
import Dock from './Dock'
import Wallpaper, { WallpaperSelector } from './Wallpaper'
import Window from '../Window/Window'
import Icon from '../UI/Icon'
import { desktopItems } from '../../data/apps'
import { getAppComponent } from '../Apps'

const Desktop = ({
  openWindows,
  activeWindowId,
  onOpenApp,
  onCloseWindow,
  onFocusWindow,
  onMinimizeWindow,
}) => {
  const [wallpaperType, setWallpaperType] = useState('gradient')
  const [wallpaperVariant, setWallpaperVariant] = useState('default')
  const [showWallpaperSelector, setShowWallpaperSelector] = useState(false)

  const desktopStyle = {
    height: '100vh',
    width: '100vw',
    position: 'relative',
    overflow: 'hidden',
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
    userSelect: 'none',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    backgroundAttachment: 'fixed',
  }

  const desktopItemsContainerStyle = {
    position: 'absolute',
    top: '28px', // Below menu bar
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
  }

  const handleDesktopClick = (e) => {
    // Click on empty desktop area
    if (e.target === e.currentTarget) {
      // Clear window focus if clicking on empty space
      // Could add desktop context menu here
    }
  }

  const handleDesktopItemDoubleClick = (item) => {
    switch (item.action) {
      case 'open-projects':
        onOpenApp({ id: 'projects', title: 'Projects', icon: 'folder' })
        break
      case 'open-about':
        onOpenApp({ id: 'about', title: 'About Me', icon: 'user' })
        break
      case 'download-resume':
        // Create a mock resume download
        const resumeContent = `
RESUME - Your Name
Digital Solutions Developer

CONTACT:
Email: your.email@example.com
Phone: +351 XXX XXX XXX
Location: Felgueiras, Porto, Portugal

EXPERIENCE:
- 5+ years in small business digital solutions
- Successfully delivered 20+ projects
- Specialized in e-commerce and booking systems

SKILLS:
- Website Development (React, WordPress)
- E-commerce Platforms (Shopify, WooCommerce)
- Booking Systems & Integrations
- Digital Marketing & SEO

RECENT PROJECTS:
- Restaurant Booking System (40% booking increase)
- Boutique E-commerce Store (€15K monthly sales)
- Fitness Studio Platform (60% admin time reduction)
        `.trim()

        const blob = new Blob([resumeContent], { type: 'text/plain' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = 'Resume-Your-Name.txt'
        a.click()
        URL.revokeObjectURL(url)
        break
      default:
        console.log(`Action not implemented: ${item.action}`)
    }
  }

  const handleWallpaperChange = (type, variant) => {
    setWallpaperType(type)
    setWallpaperVariant(variant)
    setShowWallpaperSelector(false)
  }

  const DesktopItem = ({ item }) => {
    const itemStyle = {
      position: 'absolute',
      top: item.position.top,
      left: item.position.left,
      cursor: 'pointer',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '8px',
      borderRadius: '8px',
      transition: 'background-color 0.2s ease',
      maxWidth: '80px',
    }

    const iconContainerStyle = {
      width: '48px',
      height: '48px',
      background: 'rgba(255, 255, 255, 0.9)',
      borderRadius: '8px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: '4px',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    }

    const labelStyle = {
      color: 'white',
      fontSize: '12px',
      fontWeight: '500',
      textAlign: 'center',
      textShadow: '1px 1px 2px rgba(0, 0, 0, 0.7)',
      lineHeight: '1.2',
      wordWrap: 'break-word',
      maxWidth: '100%',
    }

    return (
      <div
        style={itemStyle}
        onDoubleClick={() => handleDesktopItemDoubleClick(item)}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'transparent'
        }}
      >
        <div style={iconContainerStyle}>
          <Icon name={item.icon} size={32} color="#2563eb" />
        </div>
        <span style={labelStyle}>{item.name}</span>
      </div>
    )
  }

  // Get the active app name for menu bar
  const activeWindow = openWindows.find((w) => w.id === activeWindowId)
  const activeAppName = activeWindow ? activeWindow.title : 'Portfolio'

  return (
    <div style={desktopStyle} onClick={handleDesktopClick}>
      {/* Wallpaper */}
      <Wallpaper type={wallpaperType} variant={wallpaperVariant} />

      {/* Menu Bar */}
      <MenuBar activeApp={activeAppName} />

      {/* Desktop Items */}
      <div style={desktopItemsContainerStyle}>
        {desktopItems.map((item) => (
          <DesktopItem key={item.id} item={item} />
        ))}
      </div>

      {/* Windows */}
      {openWindows.map((window) => {
        const AppComponent = getAppComponent(window.id)

        if (!AppComponent) {
          return null
        }

        return (
          <Window
            key={window.id}
            window={window}
            isActive={window.id === activeWindowId}
            onClose={() => onCloseWindow(window.id)}
            onFocus={() => onFocusWindow(window.id)}
            onMinimize={() => onMinimizeWindow(window.id)}
          >
            <AppComponent />
          </Window>
        )
      })}

      {/* Dock */}
      <Dock
        onOpenApp={onOpenApp}
        openWindows={openWindows}
        onMinimizeApp={onMinimizeWindow}
      />

      {/* Wallpaper Selector (if enabled) */}
      {showWallpaperSelector && (
        <WallpaperSelector
          currentType={wallpaperType}
          currentVariant={wallpaperVariant}
          onWallpaperChange={handleWallpaperChange}
        />
      )}

      {/* Right-click context menu (could be added here) */}
      {/* Keyboard shortcuts handler (could be added here) */}
    </div>
  )
}

export default Desktop
