import React from 'react'
import Icon from '../UI/Icon'

const AboutApp = () => {
  const containerStyle = {
    padding: '32px',
    maxWidth: '600px',
    margin: '0 auto',
    lineHeight: '1.6',
    color: '#374151',
  }

  const headerStyle = {
    textAlign: 'center',
    marginBottom: '32px',
  }

  const avatarStyle = {
    width: '128px',
    height: '128px',
    background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
    borderRadius: '50%',
    margin: '0 auto 16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '48px',
  }

  const nameStyle = {
    fontSize: '32px',
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: '8px',
  }

  const titleStyle = {
    fontSize: '18px',
    color: '#6b7280',
    marginBottom: '24px',
  }

  const sectionStyle = {
    marginBottom: '32px',
  }

  const sectionTitleStyle = {
    fontSize: '20px',
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: '12px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  }

  const listStyle = {
    paddingLeft: '20px',
    marginBottom: '16px',
  }

  const listItemStyle = {
    marginBottom: '8px',
    fontSize: '15px',
  }

  const skillsGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '16px',
    marginTop: '16px',
  }

  const skillCategoryStyle = {
    background: '#f9fafb',
    padding: '16px',
    borderRadius: '8px',
    border: '1px solid #e5e7eb',
  }

  const skillCategoryTitleStyle = {
    fontSize: '16px',
    fontWeight: '600',
    color: '#374151',
    marginBottom: '8px',
  }

  const contactInfoStyle = {
    background: '#f0f9ff',
    padding: '20px',
    borderRadius: '12px',
    border: '1px solid #bae6fd',
    textAlign: 'center',
  }

  const contactItemStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    marginBottom: '8px',
    fontSize: '15px',
  }

  return (
    <div style={containerStyle}>
      {/* Header Section */}
      <div style={headerStyle}>
        <div style={avatarStyle}>👨‍💻</div>
        <h1 style={nameStyle}>Your Name</h1>
        <p style={titleStyle}>Small Business Digital Solutions Developer</p>
        <p style={{ color: '#6b7280', fontSize: '14px' }}>
          📍 Felgueiras, Porto, Portugal
        </p>
      </div>

      {/* About Me Section */}
      <div style={sectionStyle}>
        <h2 style={sectionTitleStyle}>
          <Icon name="user" size={20} color="#3b82f6" />
          About Me
        </h2>
        <p style={{ marginBottom: '16px' }}>
          I help small businesses transform their operations through custom
          digital solutions. With 5+ years of experience, I specialize in
          creating websites, e-commerce platforms, and booking systems that
          drive real results for local businesses in Portugal.
        </p>
        <p>
          My approach combines technical expertise with business understanding
          to deliver solutions that not only look professional but actually
          increase revenue and streamline operations for my clients.
        </p>
      </div>

      {/* Services Section */}
      <div style={sectionStyle}>
        <h2 style={sectionTitleStyle}>
          <Icon name="folder" size={20} color="#10b981" />
          Services Offered
        </h2>
        <ul style={listStyle}>
          <li style={listItemStyle}>
            <strong>Website Development</strong> - From simple 1-page sites to
            complex multi-page platforms
          </li>
          <li style={listItemStyle}>
            <strong>E-commerce Solutions</strong> - Complete online stores with
            payment processing
          </li>
          <li style={listItemStyle}>
            <strong>Booking Systems</strong> - Appointment scheduling and
            reservation platforms
          </li>
          <li style={listItemStyle}>
            <strong>Digital Asset Creation</strong> - Logos, professional
            photography, copywriting
          </li>
          <li style={listItemStyle}>
            <strong>Ongoing Management</strong> - Monthly maintenance and
            updates (€25-50/month)
          </li>
        </ul>
      </div>

      {/* Technical Skills */}
      <div style={sectionStyle}>
        <h2 style={sectionTitleStyle}>
          <Icon name="calculator" size={20} color="#8b5cf6" />
          Technical Skills
        </h2>
        <div style={skillsGridStyle}>
          <div style={skillCategoryStyle}>
            <h3 style={skillCategoryTitleStyle}>Platforms</h3>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li>• Shopify</li>
              <li>• WordPress / WooCommerce</li>
              <li>• Wix / Squarespace</li>
              <li>• React / Vue.js</li>
            </ul>
          </div>
          <div style={skillCategoryStyle}>
            <h3 style={skillCategoryTitleStyle}>Integration</h3>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li>• Payment Gateways</li>
              <li>• Booking Systems</li>
              <li>• Email Marketing</li>
              <li>• Social Media APIs</li>
            </ul>
          </div>
          <div style={skillCategoryStyle}>
            <h3 style={skillCategoryTitleStyle}>Design</h3>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li>• UI/UX Design</li>
              <li>• Logo Creation</li>
              <li>• Photo Editing</li>
              <li>• Brand Development</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Experience & Results */}
      <div style={sectionStyle}>
        <h2 style={sectionTitleStyle}>
          <Icon name="file" size={20} color="#f59e0b" />
          Experience & Results
        </h2>
        <div style={skillsGridStyle}>
          <div style={skillCategoryStyle}>
            <h3 style={skillCategoryTitleStyle}>📈 Revenue Growth</h3>
            <p style={{ fontSize: '14px', margin: 0 }}>
              Helped clients achieve 40-200% increases in online sales and
              bookings
            </p>
          </div>
          <div style={skillCategoryStyle}>
            <h3 style={skillCategoryTitleStyle}>⏱️ Time Savings</h3>
            <p style={{ fontSize: '14px', margin: 0 }}>
              Automated processes saving clients 60%+ of their admin time
            </p>
          </div>
          <div style={skillCategoryStyle}>
            <h3 style={skillCategoryTitleStyle}>😊 Client Satisfaction</h3>
            <p style={{ fontSize: '14px', margin: 0 }}>
              95% client satisfaction with 100% project completion rate
            </p>
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div style={contactInfoStyle}>
        <h3
          style={{
            ...sectionTitleStyle,
            justifyContent: 'center',
            marginBottom: '16px',
          }}
        >
          <Icon name="mail" size={20} color="#3b82f6" />
          Ready to Start Your Project?
        </h3>
        <div style={contactItemStyle}>
          <span>📧</span>
          <span>your.email@example.com</span>
        </div>
        <div style={contactItemStyle}>
          <span>📱</span>
          <span>+351 XXX XXX XXX</span>
        </div>
        <div style={contactItemStyle}>
          <span>🌐</span>
          <span>Available for projects across Portugal</span>
        </div>
        <p style={{ marginTop: '12px', fontSize: '14px', color: '#6b7280' }}>
          Free consultation • Competitive pricing • Ongoing support
        </p>
      </div>
    </div>
  )
}

export default AboutApp
