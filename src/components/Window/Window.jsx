import React, { useState, useRef, useEffect } from 'react'
import WindowControls from './WindowControls'

const Window = ({
  window,
  onClose,
  onFocus,
  onMinimize,
  children,
  isActive = false,
}) => {
  const [position, setPosition] = useState({
    x: window.x || 100,
    y: window.y || 100,
  })
  const [isDragging, setIsDragging] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const windowRef = useRef(null)

  // Handle mouse down on window header (start dragging)
  const handleMouseDown = (e) => {
    // Only allow dragging from the header, not the controls
    if (e.target.closest('.window-controls')) return

    e.preventDefault()
    e.stopPropagation()

    setIsDragging(true)
    onFocus() // Focus this window

    const rect = windowRef.current.getBoundingClientRect()
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })

    // Change cursor globally
    document.body.style.cursor = 'grabbing'
    document.body.style.userSelect = 'none'
  }

  // Handle mouse move (dragging)
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isDragging) return

      const newX = e.clientX - dragOffset.x
      const newY = Math.max(28, e.clientY - dragOffset.y) // Don't go above menu bar

      // Keep window within screen bounds
      const maxX = window.innerWidth - (window.width || 400)
      const maxY = window.innerHeight - (window.height || 300)

      setPosition({
        x: Math.max(0, Math.min(maxX, newX)),
        y: Math.max(28, Math.min(maxY, newY)),
      })
    }

    const handleMouseUp = () => {
      setIsDragging(false)
      // Reset cursor
      document.body.style.cursor = ''
      document.body.style.userSelect = ''
    }

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
      document.addEventListener('mouseleave', handleMouseUp) // Stop dragging if mouse leaves window
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
      document.removeEventListener('mouseleave', handleMouseUp)
    }
  }, [isDragging, dragOffset, window.width, window.height])

  // Handle minimize
  const handleMinimize = () => {
    setIsMinimized(!isMinimized)
  }

  // Handle maximize (toggle fullscreen)
  const handleMaximize = () => {
    if (position.x === 0 && position.y === 28) {
      // Restore to original position
      setPosition({ x: 100, y: 100 })
    } else {
      // Maximize
      setPosition({ x: 0, y: 28 })
    }
  }

  const windowStyle = {
    position: 'fixed',
    left: position.x,
    top: position.y,
    width: window.width || 800,
    height: isMinimized ? 40 : window.height || 600,
    backgroundColor: 'white',
    borderRadius: isMinimized ? '8px 8px 0 0' : '12px',
    boxShadow: isActive
      ? '0 20px 40px rgba(0, 0, 0, 0.3)'
      : '0 10px 20px rgba(0, 0, 0, 0.2)',
    overflow: 'hidden',
    zIndex: window.zIndex || 10,
    transition: isMinimized
      ? 'height 0.3s ease'
      : isDragging
      ? 'none'
      : 'box-shadow 0.2s ease',
    cursor: isDragging ? 'grabbing' : 'default',
    userSelect: 'none',
    border: isActive
      ? '1px solid rgba(59, 130, 246, 0.3)'
      : '1px solid rgba(0, 0, 0, 0.1)',
  }

  const headerStyle = {
    height: '40px',
    backgroundColor: isActive ? '#f5f5f5' : '#e8e8e8',
    borderBottom: isMinimized ? 'none' : '1px solid #e0e0e0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 16px',
    cursor: isDragging ? 'grabbing' : 'grab',
    transition: 'background-color 0.2s ease',
    position: 'relative',
    // Add these for better dragging
    WebkitUserSelect: 'none',
    MozUserSelect: 'none',
    msUserSelect: 'none',
    userSelect: 'none',
  }

  const titleStyle = {
    fontSize: '14px',
    fontWeight: '500',
    color: isActive ? '#374151' : '#6b7280',
    textAlign: 'center',
    flex: 1,
    margin: '0 20px',
  }

  const contentStyle = {
    height: 'calc(100% - 40px)',
    overflow: 'auto',
    display: isMinimized ? 'none' : 'block',
  }

  return (
    <div ref={windowRef} style={windowStyle} onClick={onFocus}>
      {/* Window Header */}
      <div style={headerStyle} onMouseDown={handleMouseDown}>
        <div className="window-controls">
          <WindowControls
            onClose={onClose}
            onMinimize={handleMinimize}
            onMaximize={handleMaximize}
            canMinimize={window.resizable !== false}
            canMaximize={window.resizable !== false}
          />
        </div>

        <h3 style={titleStyle}>{window.title}</h3>

        {/* Drag indicator dots (like real macOS) */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '2px',
            opacity: 0.3,
          }}
        >
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              style={{
                width: '2px',
                height: '2px',
                borderRadius: '50%',
                backgroundColor: '#666',
                margin: '0 1px',
              }}
            />
          ))}
        </div>
      </div>

      {/* Window Content */}
      <div style={contentStyle}>{children}</div>
    </div>
  )
}

export default Window
