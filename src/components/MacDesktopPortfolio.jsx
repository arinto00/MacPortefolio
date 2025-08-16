import React, { useState, useEffect } from 'react'
import Desktop from './Desktop/Desktop'
import useWindowManager from '../hooks/useWindowManager'

// Boot Screen Component
const BootScreen = () => {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 2
      })
    }, 30)

    return () => clearInterval(interval)
  }, [])

  const bootStyle = {
    height: '100vh',
    width: '100vw',
    background: '#000',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
  }

  const contentStyle = {
    textAlign: 'center',
    maxWidth: '400px',
  }

  const logoStyle = {
    width: '80px',
    height: '80px',
    margin: '0 auto 24px',
    background: '#f3f4f6',
    borderRadius: '16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '32px',
  }

  const titleStyle = {
    fontSize: '28px',
    fontWeight: '300',
    marginBottom: '8px',
    color: '#ffffff',
  }

  const subtitleStyle = {
    fontSize: '16px',
    color: '#9ca3af',
    marginBottom: '32px',
  }

  const progressBarStyle = {
    width: '100%',
    height: '4px',
    background: '#374151',
    borderRadius: '2px',
    overflow: 'hidden',
    marginTop: '24px',
  }

  const progressFillStyle = {
    height: '100%',
    background: 'linear-gradient(90deg, #3b82f6, #8b5cf6)',
    borderRadius: '2px',
    width: `${progress}%`,
    transition: 'width 0.3s ease',
  }

  return (
    <div style={bootStyle}>
      <div style={contentStyle}>
        <div style={logoStyle}>💻</div>
        <h1 style={titleStyle}>Miguel Gonçalves</h1>
        <p style={subtitleStyle}>Software Developer & Product Manager</p>
        <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '16px' }}>
          Initializing portfolio system...
        </p>
        <div style={progressBarStyle}>
          <div style={progressFillStyle} />
        </div>
        <p style={{ fontSize: '12px', color: '#4b5563', marginTop: '8px' }}>
          {progress < 100 ? `Loading ${progress}%` : 'Welcome!'}
        </p>
      </div>
    </div>
  )
}

const MacDesktopPortfolio = () => {
  const [isBooted, setIsBooted] = useState(false)
  const [isLayoutReady, setIsLayoutReady] = useState(false)

  const {
    openWindows,
    visibleWindows,
    activeWindowId,
    openWindow,
    closeWindow,
    focusWindow,
    toggleMinimizeWindow,
  } = useWindowManager()

  useEffect(() => {
    // Ensure layout is ready first
    const layoutTimer = setTimeout(() => {
      setIsLayoutReady(true)
    }, 100)

    // Then show boot screen
    const bootTimer = setTimeout(() => {
      setIsBooted(true)
      // Add loaded class for smooth transitions
      document.body.classList.add('loaded')
    }, 3000)

    return () => {
      clearTimeout(layoutTimer)
      clearTimeout(bootTimer)
    }
  }, [])

  // Don't render anything until layout is ready
  if (!isLayoutReady || !isBooted) {
    return <BootScreen />
  }

  return (
    <Desktop
      openWindows={visibleWindows}
      activeWindowId={activeWindowId}
      onOpenApp={openWindow}
      onCloseWindow={closeWindow}
      onFocusWindow={focusWindow}
      onMinimizeWindow={toggleMinimizeWindow}
    />
  )
}

export default MacDesktopPortfolio
