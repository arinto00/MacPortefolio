import React from 'react'

// Individual window control button
const ControlButton = ({ type, onClick, disabled = false }) => {
  const styles = {
    close: {
      backgroundColor: disabled ? '#ccc' : '#ff5f57',
      hover: '#ff4541',
    },
    minimize: {
      backgroundColor: disabled ? '#ccc' : '#ffbd2e',
      hover: '#ffab00',
    },
    maximize: {
      backgroundColor: disabled ? '#ccc' : '#28ca42',
      hover: '#1fb336',
    },
  }

  const buttonStyle = {
    width: '12px',
    height: '12px',
    borderRadius: '50%',
    border: 'none',
    cursor: disabled ? 'default' : 'pointer',
    backgroundColor: styles[type].backgroundColor,
    transition: 'all 0.2s ease',
    outline: 'none',
  }

  return (
    <button
      style={buttonStyle}
      onClick={disabled ? undefined : onClick}
      onMouseEnter={(e) => {
        if (!disabled) {
          e.target.style.backgroundColor = styles[type].hover
        }
      }}
      onMouseLeave={(e) => {
        if (!disabled) {
          e.target.style.backgroundColor = styles[type].backgroundColor
        }
      }}
      title={
        type === 'close'
          ? 'Close'
          : type === 'minimize'
          ? 'Minimize'
          : type === 'maximize'
          ? 'Maximize'
          : ''
      }
    />
  )
}

// Window controls container
const WindowControls = ({
  onClose,
  onMinimize,
  onMaximize,
  canMinimize = true,
  canMaximize = true,
  showControls = true,
}) => {
  if (!showControls) {
    return <div style={{ width: '60px' }} /> // Spacer
  }

  const containerStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '0 4px',
  }

  return (
    <div style={containerStyle}>
      <ControlButton type="close" onClick={onClose} />
      <ControlButton
        type="minimize"
        onClick={onMinimize}
        disabled={!canMinimize}
      />
      <ControlButton
        type="maximize"
        onClick={onMaximize}
        disabled={!canMaximize}
      />
    </div>
  )
}

export default WindowControls
