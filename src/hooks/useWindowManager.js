import { useState, useCallback } from 'react'
import { appConfigs, windowDefaults } from '../data/apps'

const useWindowManager = () => {
  const [openWindows, setOpenWindows] = useState([])
  const [activeWindowId, setActiveWindowId] = useState(null)
  const [minimizedWindows, setMinimizedWindows] = useState(new Set())

  // Generate unique window position
  const generateWindowPosition = useCallback(
    (appId) => {
      const existingWindows = openWindows.filter((w) => w.id !== appId)
      const baseOffset = existingWindows.length * 30

      return {
        x: windowDefaults.defaultPosition.x + baseOffset,
        y: windowDefaults.defaultPosition.y + baseOffset,
      }
    },
    [openWindows]
  )

  // Open a new window
  const openWindow = useCallback(
    (app) => {
      const existingWindow = openWindows.find((w) => w.id === app.id)

      if (existingWindow) {
        // Window already exists, just focus it
        focusWindow(app.id)
        // If minimized, restore it
        if (minimizedWindows.has(app.id)) {
          setMinimizedWindows((prev) => {
            const newSet = new Set(prev)
            newSet.delete(app.id)
            return newSet
          })
        }
        return
      }

      const config = appConfigs[app.id] || {}
      const position = generateWindowPosition(app.id)

      const newWindow = {
        id: app.id,
        title: config.title || app.title,
        width: config.width || windowDefaults.width,
        height: config.height || windowDefaults.height,
        x: position.x,
        y: position.y,
        zIndex: Date.now(),
        resizable: config.resizable !== false,
        app: app,
      }

      setOpenWindows((prev) => [...prev, newWindow])
      setActiveWindowId(app.id)
    },
    [openWindows, minimizedWindows, generateWindowPosition]
  )

  // Close a window
  const closeWindow = useCallback(
    (windowId) => {
      setOpenWindows((prev) => prev.filter((w) => w.id !== windowId))
      setMinimizedWindows((prev) => {
        const newSet = new Set(prev)
        newSet.delete(windowId)
        return newSet
      })

      // If we're closing the active window, focus the next one
      if (activeWindowId === windowId) {
        const remainingWindows = openWindows.filter((w) => w.id !== windowId)
        if (remainingWindows.length > 0) {
          const nextWindow = remainingWindows.reduce((prev, current) =>
            current.zIndex > prev.zIndex ? current : prev
          )
          setActiveWindowId(nextWindow.id)
        } else {
          setActiveWindowId(null)
        }
      }
    },
    [openWindows, activeWindowId]
  )

  // Focus a window (bring to front)
  const focusWindow = useCallback(
    (windowId) => {
      const newZIndex = Date.now()

      setOpenWindows((prev) =>
        prev.map((window) =>
          window.id === windowId ? { ...window, zIndex: newZIndex } : window
        )
      )

      setActiveWindowId(windowId)

      // If window is minimized, restore it
      if (minimizedWindows.has(windowId)) {
        setMinimizedWindows((prev) => {
          const newSet = new Set(prev)
          newSet.delete(windowId)
          return newSet
        })
      }
    },
    [minimizedWindows]
  )

  // Minimize/restore a window
  const toggleMinimizeWindow = useCallback(
    (windowId) => {
      setMinimizedWindows((prev) => {
        const newSet = new Set(prev)
        if (newSet.has(windowId)) {
          newSet.delete(windowId)
          // When restoring, focus the window
          focusWindow(windowId)
        } else {
          newSet.add(windowId)
          // When minimizing, focus the next window
          const otherWindows = openWindows.filter(
            (w) => w.id !== windowId && !newSet.has(w.id)
          )
          if (otherWindows.length > 0) {
            const nextWindow = otherWindows.reduce((prev, current) =>
              current.zIndex > prev.zIndex ? current : prev
            )
            setActiveWindowId(nextWindow.id)
          } else {
            setActiveWindowId(null)
          }
        }
        return newSet
      })
    },
    [openWindows, focusWindow]
  )

  // Update window position
  const updateWindowPosition = useCallback((windowId, position) => {
    setOpenWindows((prev) =>
      prev.map((window) =>
        window.id === windowId
          ? { ...window, x: position.x, y: position.y }
          : window
      )
    )
  }, [])

  // Update window size
  const updateWindowSize = useCallback((windowId, size) => {
    setOpenWindows((prev) =>
      prev.map((window) =>
        window.id === windowId
          ? {
              ...window,
              width: Math.max(windowDefaults.minWidth, size.width),
              height: Math.max(windowDefaults.minHeight, size.height),
            }
          : window
      )
    )
  }, [])

  // Close all windows
  const closeAllWindows = useCallback(() => {
    setOpenWindows([])
    setMinimizedWindows(new Set())
    setActiveWindowId(null)
  }, [])

  // Get window by ID
  const getWindow = useCallback(
    (windowId) => {
      return openWindows.find((w) => w.id === windowId)
    },
    [openWindows]
  )

  // Check if window is minimized
  const isWindowMinimized = useCallback(
    (windowId) => {
      return minimizedWindows.has(windowId)
    },
    [minimizedWindows]
  )

  // Get visible windows (not minimized)
  const visibleWindows = openWindows.filter((w) => !minimizedWindows.has(w.id))

  // Get windows sorted by z-index (top to bottom)
  const windowsByZIndex = [...openWindows].sort((a, b) => b.zIndex - a.zIndex)

  return {
    // State
    openWindows,
    visibleWindows,
    windowsByZIndex,
    activeWindowId,
    minimizedWindows,

    // Actions
    openWindow,
    closeWindow,
    focusWindow,
    toggleMinimizeWindow,
    updateWindowPosition,
    updateWindowSize,
    closeAllWindows,

    // Utilities
    getWindow,
    isWindowMinimized,
  }
}

export default useWindowManager
