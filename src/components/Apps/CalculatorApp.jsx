import React, { useState } from 'react'

const CalculatorApp = () => {
  const [display, setDisplay] = useState('0')
  const [operation, setOperation] = useState(null)
  const [waiting, setWaiting] = useState(false)
  const [previous, setPrevious] = useState(null)

  const inputNumber = (num) => {
    if (waiting) {
      setDisplay(String(num))
      setWaiting(false)
    } else {
      setDisplay(display === '0' ? String(num) : display + num)
    }
  }

  const inputDecimal = () => {
    if (waiting) {
      setDisplay('0.')
      setWaiting(false)
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.')
    }
  }

  const calculate = () => {
    const current = parseFloat(display)
    const prev = parseFloat(previous)

    if (previous === null || operation === null || waiting) return

    let result
    switch (operation) {
      case '+':
        result = prev + current
        break
      case '-':
        result = prev - current
        break
      case '×':
        result = prev * current
        break
      case '÷':
        result = current !== 0 ? prev / current : 0
        break
      default:
        return
    }

    setDisplay(String(result))
    setPrevious(null)
    setOperation(null)
    setWaiting(true)
  }

  const handleOperation = (op) => {
    const current = parseFloat(display)

    if (previous === null) {
      setPrevious(display)
    } else if (operation && !waiting) {
      calculate()
      setPrevious(display)
    }

    setOperation(op)
    setWaiting(true)
  }

  const clear = () => {
    setDisplay('0')
    setPrevious(null)
    setOperation(null)
    setWaiting(false)
  }

  const clearEntry = () => {
    setDisplay('0')
  }

  const percentage = () => {
    const current = parseFloat(display)
    setDisplay(String(current / 100))
  }

  const toggleSign = () => {
    const current = parseFloat(display)
    setDisplay(String(-current))
  }

  const containerStyle = {
    padding: '20px',
    maxWidth: '320px',
    margin: '0 auto',
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
  }

  const displayStyle = {
    background: '#000',
    color: '#fff',
    padding: '20px',
    borderRadius: '12px',
    marginBottom: '20px',
    textAlign: 'right',
    fontSize: '32px',
    fontWeight: '300',
    minHeight: '80px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    wordBreak: 'break-all',
    overflow: 'hidden',
  }

  const buttonGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '12px',
  }

  const buttonStyle = (type = 'number') => {
    const baseStyle = {
      height: '64px',
      border: 'none',
      borderRadius: '32px',
      fontSize: '24px',
      fontWeight: '400',
      cursor: 'pointer',
      transition: 'all 0.1s ease',
      outline: 'none',
      userSelect: 'none',
    }

    const styles = {
      number: {
        ...baseStyle,
        backgroundColor: '#333',
        color: '#fff',
      },
      operator: {
        ...baseStyle,
        backgroundColor: '#ff9f0a',
        color: '#fff',
        fontWeight: '500',
      },
      function: {
        ...baseStyle,
        backgroundColor: '#a5a5a5',
        color: '#000',
        fontWeight: '500',
      },
      zero: {
        ...baseStyle,
        backgroundColor: '#333',
        color: '#fff',
        gridColumn: 'span 2',
        textAlign: 'left',
        paddingLeft: '32px',
      },
    }

    return styles[type] || styles.number
  }

  const Button = ({ children, onClick, type = 'number', disabled = false }) => (
    <button
      style={{
        ...buttonStyle(type),
        opacity: disabled ? 0.5 : 1,
        cursor: disabled ? 'not-allowed' : 'pointer',
      }}
      onClick={disabled ? undefined : onClick}
      onMouseDown={(e) => {
        if (!disabled) {
          e.target.style.transform = 'scale(0.95)'
        }
      }}
      onMouseUp={(e) => {
        if (!disabled) {
          e.target.style.transform = 'scale(1)'
        }
      }}
      onMouseLeave={(e) => {
        if (!disabled) {
          e.target.style.transform = 'scale(1)'
        }
      }}
    >
      {children}
    </button>
  )

  const formatDisplay = (value) => {
    const num = parseFloat(value)
    if (isNaN(num)) return '0'

    // Handle very large or very small numbers
    if (Math.abs(num) > 999999999) {
      return num.toExponential(5)
    }

    // Remove unnecessary decimal places
    const formatted = num.toString()
    if (formatted.length > 9) {
      return num.toPrecision(9)
    }

    return formatted
  }

  return (
    <div style={containerStyle}>
      {/* Display */}
      <div style={displayStyle}>{formatDisplay(display)}</div>

      {/* Button Grid */}
      <div style={buttonGridStyle}>
        {/* Row 1 */}
        <Button type="function" onClick={clear}>
          C
        </Button>
        <Button type="function" onClick={toggleSign}>
          ±
        </Button>
        <Button type="function" onClick={percentage}>
          %
        </Button>
        <Button type="operator" onClick={() => handleOperation('÷')}>
          ÷
        </Button>

        {/* Row 2 */}
        <Button onClick={() => inputNumber(7)}>7</Button>
        <Button onClick={() => inputNumber(8)}>8</Button>
        <Button onClick={() => inputNumber(9)}>9</Button>
        <Button type="operator" onClick={() => handleOperation('×')}>
          ×
        </Button>

        {/* Row 3 */}
        <Button onClick={() => inputNumber(4)}>4</Button>
        <Button onClick={() => inputNumber(5)}>5</Button>
        <Button onClick={() => inputNumber(6)}>6</Button>
        <Button type="operator" onClick={() => handleOperation('-')}>
          −
        </Button>

        {/* Row 4 */}
        <Button onClick={() => inputNumber(1)}>1</Button>
        <Button onClick={() => inputNumber(2)}>2</Button>
        <Button onClick={() => inputNumber(3)}>3</Button>
        <Button type="operator" onClick={() => handleOperation('+')}>
          +
        </Button>

        {/* Row 5 */}
        <Button type="zero" onClick={() => inputNumber(0)}>
          0
        </Button>
        <Button onClick={inputDecimal}>.</Button>
        <Button type="operator" onClick={calculate}>
          =
        </Button>
      </div>

      {/* Calculator Info */}
      <div
        style={{
          textAlign: 'center',
          marginTop: '20px',
          fontSize: '12px',
          color: '#666',
          fontWeight: '400',
        }}
      >
        <p>macOS Calculator Clone</p>
        <p style={{ marginTop: '4px' }}>
          Build pricing estimates for your projects
        </p>
      </div>
    </div>
  )
}

export default CalculatorApp
