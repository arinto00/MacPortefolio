import React, { useState, useEffect } from 'react'

// Simple icons as SVG components
const UserIcon = () => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </svg>
)

const FolderIcon = () => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
  </svg>
)

const FileIcon = () => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
    <polyline points="14,2 14,8 20,8"></polyline>
  </svg>
)

const MailIcon = () => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
    <polyline points="22,6 12,13 2,6"></polyline>
  </svg>
)

const CalculatorIcon = () => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <rect x="4" y="2" width="16" height="20" rx="2"></rect>
    <line x1="8" y1="6" x2="16" y2="6"></line>
    <line x1="8" y1="10" x2="16" y2="10"></line>
    <line x1="8" y1="14" x2="16" y2="14"></line>
    <line x1="8" y1="18" x2="16" y2="18"></line>
  </svg>
)

const TrashIcon = () => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <polyline points="3,6 5,6 21,6"></polyline>
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
  </svg>
)

// CSS styles as JS object
const styles = {
  desktop: {
    height: '100vh',
    width: '100vw',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    position: 'relative',
    overflow: 'hidden',
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
  },
  wallpaper: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
    backgroundSize: '60px 60px',
    backgroundPosition: 'center',
    backgroundRepeat: 'repeat',
  },
  menubar: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    height: '28px',
    background: 'rgba(0, 0, 0, 0.2)',
    backdropFilter: 'blur(10px)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 16px',
    color: 'white',
    fontSize: '14px',
    fontWeight: '500',
    zIndex: 1000,
  },
  dock: {
    position: 'fixed',
    bottom: '16px',
    left: '50%',
    transform: 'translateX(-50%)',
    background: 'rgba(255, 255, 255, 0.2)',
    backdropFilter: 'blur(10px)',
    borderRadius: '16px',
    padding: '8px',
    display: 'flex',
    gap: '8px',
    zIndex: 100,
  },
  dockIcon: {
    width: '56px',
    height: '56px',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    color: 'white',
    position: 'relative',
  },
  window: {
    position: 'fixed',
    width: '800px',
    height: '600px',
    background: 'white',
    borderRadius: '12px',
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
    overflow: 'hidden',
    zIndex: 10,
  },
  windowHeader: {
    height: '40px',
    background: '#f5f5f5',
    borderBottom: '1px solid #e0e0e0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 16px',
    cursor: 'move',
  },
  windowControls: {
    display: 'flex',
    gap: '8px',
  },
  windowControl: {
    width: '12px',
    height: '12px',
    borderRadius: '50%',
    border: 'none',
    cursor: 'pointer',
  },
  windowContent: {
    height: 'calc(100% - 40px)',
    overflow: 'auto',
    padding: '32px',
  },
  desktopItem: {
    position: 'absolute',
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '8px',
    borderRadius: '8px',
    transition: 'background-color 0.2s',
  },
  desktopItemIcon: {
    width: '48px',
    height: '48px',
    background: 'rgba(255, 255, 255, 0.8)',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '4px',
    color: '#2563eb',
  },
  desktopItemName: {
    color: 'white',
    fontSize: '12px',
    textAlign: 'center',
    maxWidth: '64px',
    wordWrap: 'break-word',
  },
}

// Main component
const MacDesktopPortfolio = () => {
  const [openWindows, setOpenWindows] = useState([])
  const [time, setTime] = useState(new Date())
  const [isBooted, setIsBooted] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000)
    const bootTimer = setTimeout(() => setIsBooted(true), 1500)

    return () => {
      clearInterval(timer)
      clearTimeout(bootTimer)
    }
  }, [])

  const dockApps = [
    { id: 'about', title: 'About Me', icon: UserIcon, color: '#3b82f6' },
    { id: 'projects', title: 'Projects', icon: FolderIcon, color: '#8b5cf6' },
    {
      id: 'questionnaire',
      title: 'Questionnaire',
      icon: FileIcon,
      color: '#10b981',
    },
    { id: 'contact', title: 'Contact', icon: MailIcon, color: '#ef4444' },
    {
      id: 'calculator',
      title: 'Calculator',
      icon: CalculatorIcon,
      color: '#6b7280',
    },
    { id: 'trash', title: 'Trash', icon: TrashIcon, color: '#9ca3af' },
  ]

  const desktopItems = [
    {
      id: 'projects-folder',
      name: 'My Projects',
      type: 'folder',
      icon: FolderIcon,
      position: { top: 120, left: 50 },
    },
    {
      id: 'resume',
      name: 'Resume.pdf',
      type: 'file',
      icon: FileIcon,
      position: { top: 220, left: 50 },
    },
  ]

  const openWindow = (app) => {
    if (!openWindows.find((w) => w.id === app.id)) {
      const newWindow = {
        ...app,
        x: Math.random() * 200 + 100,
        y: Math.random() * 100 + 100,
        zIndex: Date.now(),
      }
      setOpenWindows([...openWindows, newWindow])
    }
  }

  const closeWindow = (id) => {
    setOpenWindows(openWindows.filter((w) => w.id !== id))
  }

  const formatTime = (date) => {
    return date.toLocaleTimeString([], {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  if (!isBooted) {
    return (
      <div
        style={{
          height: '100vh',
          width: '100vw',
          background: '#000',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          textAlign: 'center',
        }}
      >
        <div>
          <div
            style={{
              width: '80px',
              height: '80px',
              margin: '0 auto 16px',
              background: '#f3f4f6',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#000',
            }}
          >
            💻
          </div>
          <h1
            style={{ fontSize: '32px', fontWeight: '300', marginBottom: '8px' }}
          >
            Your Name
          </h1>
          <p style={{ color: '#9ca3af' }}>Digital Solutions Developer</p>
          <div
            style={{
              width: '200px',
              height: '4px',
              background: '#374151',
              borderRadius: '2px',
              margin: '24px auto',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                height: '100%',
                background: 'white',
                borderRadius: '2px',
                animation: 'loading 1.5s ease-out forwards',
              }}
            />
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      <style>
        {`
          @keyframes loading {
            from { width: 0% }
            to { width: 100% }
          }
          
          .dock-icon:hover {
            transform: translateY(-8px) scale(1.1);
          }
          
          .desktop-item:hover {
            background-color: rgba(255, 255, 255, 0.2);
          }
        `}
      </style>

      <div style={styles.desktop}>
        <div style={styles.wallpaper} />

        {/* Menu Bar */}
        <div style={styles.menubar}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <span style={{ fontWeight: 'bold' }}>🍎</span>
            <span>Portfolio</span>
            <span>File</span>
            <span>Edit</span>
            <span>View</span>
            <span>Window</span>
            <span>Help</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>🔋</span>
            <span>📶</span>
            <span>🔍</span>
            <span>{formatTime(time)}</span>
          </div>
        </div>

        {/* Desktop Items */}
        {desktopItems.map((item) => {
          const IconComponent = item.icon
          return (
            <div
              key={item.id}
              className="desktop-item"
              style={{
                ...styles.desktopItem,
                top: item.position.top,
                left: item.position.left,
              }}
              onDoubleClick={() => openWindow(item)}
            >
              <div style={styles.desktopItemIcon}>
                <IconComponent />
              </div>
              <span style={styles.desktopItemName}>{item.name}</span>
            </div>
          )
        })}

        {/* Windows */}
        {openWindows.map((window) => (
          <div
            key={window.id}
            style={{
              ...styles.window,
              left: window.x,
              top: window.y,
              zIndex: window.zIndex,
            }}
          >
            <div style={styles.windowHeader}>
              <div style={styles.windowControls}>
                <button
                  style={{ ...styles.windowControl, background: '#ff5f57' }}
                  onClick={() => closeWindow(window.id)}
                />
                <button
                  style={{ ...styles.windowControl, background: '#ffbd2e' }}
                />
                <button
                  style={{ ...styles.windowControl, background: '#28ca42' }}
                />
              </div>

              <h3
                style={{
                  fontSize: '14px',
                  fontWeight: '500',
                  color: '#374151',
                }}
              >
                {window.title}
              </h3>

              <div style={{ width: '60px' }} />
            </div>

            <div style={styles.windowContent}>
              {window.id === 'about' && <AboutApp />}
              {window.id === 'projects' && <ProjectsApp />}
              {window.id === 'questionnaire' && <QuestionnaireApp />}
              {window.id === 'contact' && <ContactApp />}
              {window.id === 'calculator' && <CalculatorApp />}
            </div>
          </div>
        ))}

        {/* Dock */}
        <div style={styles.dock}>
          {dockApps.map((app) => {
            const IconComponent = app.icon
            const isOpen = openWindows.find((w) => w.id === app.id)

            return (
              <div
                key={app.id}
                className="dock-icon"
                style={{
                  ...styles.dockIcon,
                  background: app.color,
                }}
                onClick={() => openWindow(app)}
                title={app.title}
              >
                <IconComponent />
                {isOpen && (
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '-4px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: '4px',
                      height: '4px',
                      background: 'white',
                      borderRadius: '50%',
                    }}
                  />
                )}
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}

// App components
const AboutApp = () => (
  <div style={{ maxWidth: '600px', margin: '0 auto' }}>
    <div style={{ textAlign: 'center', marginBottom: '32px' }}>
      <div
        style={{
          width: '128px',
          height: '128px',
          background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
          borderRadius: '50%',
          margin: '0 auto 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '48px',
        }}
      >
        👨‍💻
      </div>
      <h1
        style={{
          fontSize: '32px',
          fontWeight: 'bold',
          color: '#1f2937',
          marginBottom: '8px',
        }}
      >
        Your Name
      </h1>
      <p style={{ fontSize: '18px', color: '#6b7280' }}>
        Small Business Digital Solutions Developer
      </p>
    </div>

    <div style={{ lineHeight: '1.6', color: '#374151' }}>
      <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '12px' }}>
        About Me
      </h2>
      <p style={{ marginBottom: '24px' }}>
        I help small businesses transform their operations through custom
        digital solutions. Specializing in websites, e-commerce platforms, and
        booking systems that drive real results.
      </p>

      <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '12px' }}>
        Services
      </h2>
      <ul style={{ marginBottom: '24px', paddingLeft: '20px' }}>
        <li>Website Development (1-page to multi-page)</li>
        <li>E-commerce Solutions</li>
        <li>Booking & Reservation Systems</li>
        <li>Digital Asset Creation</li>
        <li>Ongoing Platform Management</li>
      </ul>

      <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '12px' }}>
        Experience
      </h2>
      <p>
        5+ years helping local businesses in Portugal establish their digital
        presence. Proven track record of increasing customer engagement and
        revenue.
      </p>
    </div>
  </div>
)

const ProjectsApp = () => (
  <div>
    <h1
      style={{
        fontSize: '32px',
        fontWeight: 'bold',
        color: '#1f2937',
        marginBottom: '24px',
      }}
    >
      My Projects
    </h1>

    <div style={{ display: 'grid', gap: '24px' }}>
      {[
        {
          title: 'Restaurant Booking System',
          type: 'E-commerce + Booking',
          description:
            'Complete solution with online menu, table reservations, and order management.',
          result: '40% increase in bookings',
        },
        {
          title: 'Boutique Online Store',
          type: 'E-commerce',
          description:
            'Fashion retail website with inventory management and social media integration.',
          result: '€15K monthly sales',
        },
        {
          title: 'Fitness Studio Platform',
          type: 'Booking System',
          description:
            'Class scheduling, member management, and automated email confirmations.',
          result: '60% reduction in admin time',
        },
      ].map((project, index) => (
        <div
          key={index}
          style={{
            background: '#f9fafb',
            padding: '24px',
            borderRadius: '8px',
            border: '1px solid #e5e7eb',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              marginBottom: '12px',
            }}
          >
            <h3
              style={{ fontSize: '20px', fontWeight: '600', color: '#1f2937' }}
            >
              {project.title}
            </h3>
            <span
              style={{
                background: '#dbeafe',
                color: '#1d4ed8',
                padding: '4px 12px',
                borderRadius: '16px',
                fontSize: '12px',
              }}
            >
              {project.type}
            </span>
          </div>
          <p style={{ color: '#6b7280', marginBottom: '16px' }}>
            {project.description}
          </p>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              color: '#059669',
              fontWeight: '500',
            }}
          >
            <span style={{ marginRight: '8px' }}>✅</span>
            {project.result}
          </div>
        </div>
      ))}
    </div>
  </div>
)

const QuestionnaireApp = () => {
  const [formData, setFormData] = useState({})

  const exportToText = () => {
    let output = 'CLIENT QUESTIONNAIRE RESULTS\n'
    output += '========================================\n\n'
    output += `Date: ${new Date().toLocaleDateString()}\n\n`

    Object.entries(formData).forEach(([key, value]) => {
      output += `${key}: ${value}\n`
    })

    const blob = new Blob([output], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `questionnaire-${Date.now()}.txt`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div>
      <h1
        style={{
          fontSize: '24px',
          fontWeight: 'bold',
          color: '#1f2937',
          marginBottom: '24px',
        }}
      >
        Client Questionnaire
      </h1>

      <div style={{ display: 'grid', gap: '16px', marginBottom: '24px' }}>
        <div>
          <label
            style={{
              display: 'block',
              fontWeight: '500',
              color: '#374151',
              marginBottom: '4px',
            }}
          >
            Client Name *
          </label>
          <input
            type="text"
            style={{
              width: '100%',
              padding: '8px 12px',
              border: '1px solid #d1d5db',
              borderRadius: '6px',
              fontSize: '14px',
            }}
            onChange={(e) =>
              setFormData({ ...formData, clientName: e.target.value })
            }
          />
        </div>

        <div>
          <label
            style={{
              display: 'block',
              fontWeight: '500',
              color: '#374151',
              marginBottom: '4px',
            }}
          >
            Business Name *
          </label>
          <input
            type="text"
            style={{
              width: '100%',
              padding: '8px 12px',
              border: '1px solid #d1d5db',
              borderRadius: '6px',
              fontSize: '14px',
            }}
            onChange={(e) =>
              setFormData({ ...formData, businessName: e.target.value })
            }
          />
        </div>

        <div>
          <label
            style={{
              display: 'block',
              fontWeight: '500',
              color: '#374151',
              marginBottom: '4px',
            }}
          >
            Business Type
          </label>
          <select
            style={{
              width: '100%',
              padding: '8px 12px',
              border: '1px solid #d1d5db',
              borderRadius: '6px',
              fontSize: '14px',
            }}
            onChange={(e) =>
              setFormData({ ...formData, businessType: e.target.value })
            }
          >
            <option value="">Select business type</option>
            <option value="restaurant">Restaurant/Café</option>
            <option value="retail">Retail Store</option>
            <option value="services">Professional Services</option>
            <option value="health">Healthcare/Wellness</option>
            <option value="beauty">Beauty/Salon</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <label
            style={{
              display: 'block',
              fontWeight: '500',
              color: '#374151',
              marginBottom: '8px',
            }}
          >
            Project Type (check all that apply):
          </label>
          <div style={{ display: 'grid', gap: '8px' }}>
            {[
              'Website (1-page)',
              'Website (multi-page)',
              'E-commerce store',
              'Booking system',
              'Inventory management',
            ].map((option) => (
              <label
                key={option}
                style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
              >
                <input type="checkbox" />
                <span style={{ fontSize: '14px' }}>{option}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      <button
        onClick={exportToText}
        style={{
          background: '#10b981',
          color: 'white',
          padding: '12px 24px',
          border: 'none',
          borderRadius: '6px',
          fontSize: '14px',
          fontWeight: '500',
          cursor: 'pointer',
        }}
      >
        Export Results
      </button>
    </div>
  )
}

const ContactApp = () => (
  <div style={{ maxWidth: '400px', margin: '0 auto' }}>
    <h1
      style={{
        fontSize: '24px',
        fontWeight: 'bold',
        color: '#1f2937',
        marginBottom: '24px',
      }}
    >
      Get In Touch
    </h1>

    <div style={{ marginBottom: '24px', lineHeight: '1.8' }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          marginBottom: '8px',
        }}
      >
        <span>📧</span>
        <span>your.email@example.com</span>
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          marginBottom: '8px',
        }}
      >
        <span>📱</span>
        <span>+351 XXX XXX XXX</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <span>📍</span>
        <span>Felgueiras, Porto, Portugal</span>
      </div>
    </div>

    <div style={{ display: 'grid', gap: '16px' }}>
      <div>
        <label
          style={{ display: 'block', fontWeight: '500', marginBottom: '4px' }}
        >
          Name
        </label>
        <input
          type="text"
          style={{
            width: '100%',
            padding: '8px 12px',
            border: '1px solid #d1d5db',
            borderRadius: '6px',
          }}
        />
      </div>
      <div>
        <label
          style={{ display: 'block', fontWeight: '500', marginBottom: '4px' }}
        >
          Email
        </label>
        <input
          type="email"
          style={{
            width: '100%',
            padding: '8px 12px',
            border: '1px solid #d1d5db',
            borderRadius: '6px',
          }}
        />
      </div>
      <div>
        <label
          style={{ display: 'block', fontWeight: '500', marginBottom: '4px' }}
        >
          Message
        </label>
        <textarea
          rows="4"
          style={{
            width: '100%',
            padding: '8px 12px',
            border: '1px solid #d1d5db',
            borderRadius: '6px',
            resize: 'vertical',
          }}
        />
      </div>
      <button
        onClick={() => alert('Message sent! (Demo only)')}
        style={{
          background: '#3b82f6',
          color: 'white',
          padding: '12px',
          border: 'none',
          borderRadius: '6px',
          fontSize: '14px',
          fontWeight: '500',
          cursor: 'pointer',
        }}
      >
        Send Message
      </button>
    </div>
  </div>
)

const CalculatorApp = () => {
  const [display, setDisplay] = useState('0')

  const inputNumber = (num) => {
    setDisplay(display === '0' ? String(num) : display + num)
  }

  const clear = () => {
    setDisplay('0')
  }

  return (
    <div style={{ maxWidth: '300px', margin: '0 auto' }}>
      <div
        style={{
          background: '#000',
          color: 'white',
          padding: '16px',
          borderRadius: '8px',
          marginBottom: '16px',
          textAlign: 'right',
          fontSize: '24px',
          minHeight: '60px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
        }}
      >
        {display}
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '8px',
        }}
      >
        {[
          ['C', 'C'],
          ['7', '7'],
          ['8', '8'],
          ['9', '9'],
          ['÷', '÷'],
          ['4', '4'],
          ['5', '5'],
          ['6', '6'],
          ['×', '×'],
          ['1', '1'],
          ['2', '2'],
          ['3', '3'],
          ['+', '+'],
          ['0', '0'],
          ['.', '.'],
          ['=', '='],
          ['-', '-'],
        ].map(([label, value]) => (
          <button
            key={label}
            onClick={() => {
              if (value === 'C') clear()
              else if (!isNaN(value) || value === '.') inputNumber(value)
            }}
            style={{
              height: '48px',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              background: ['+', '-', '×', '÷', '='].includes(value)
                ? '#f97316'
                : value === 'C'
                ? '#6b7280'
                : '#e5e7eb',
              color: ['+', '-', '×', '÷', '=', 'C'].includes(value)
                ? 'white'
                : '#000',
            }}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  )
}

export default MacDesktopPortfolio
