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

  return (
    <div style={containerStyle}>
      {/* Header Section */}
      <div style={headerStyle}>
        <div style={avatarStyle}>👨‍💻</div>
        <h1 style={nameStyle}>Miguel Gonçalves</h1>
        <p style={titleStyle}>Software Developer & Product Manager</p>
        <p style={{ color: '#6b7280', fontSize: '14px' }}>
          📍 Penafiel, Portugal
        </p>
        <p style={{ color: '#374151', fontSize: '14px', fontStyle: 'italic' }}>
          Helping companies build efficient digital solutions through software
          development and product management
        </p>
      </div>

      {/* About Me Section */}
      <div style={sectionStyle}>
        <h2 style={sectionTitleStyle}>
          <Icon name="user" size={20} color="#3b82f6" />
          About Me
        </h2>
        <p>
          I am a 28-year-old software developer and product manager with
          experience in full-stack development, software consulting, and digital
          transformation projects. I specialize in building web platforms, APIs,
          CRM systems, and mobile applications that streamline business
          processes and deliver real results.
        </p>
      </div>

      {/* Experience Section */}
      <div style={sectionStyle}>
        <h2 style={sectionTitleStyle}>
          <Icon name="file" size={20} color="#f59e0b" />
          Experience
        </h2>
        <div style={skillsGridStyle}>
          <div style={skillCategoryStyle}>
            <h3 style={skillCategoryTitleStyle}>SOTKON – Waste Systems</h3>
            <p style={{ margin: 0 }}>
              Software Developer & Product Manager (Oct 2024 – Present, Hybrid)
            </p>
          </div>
          <div style={skillCategoryStyle}>
            <h3 style={skillCategoryTitleStyle}>
              MedicineOne, Life Sciences Computing
            </h3>
            <p style={{ margin: 0 }}>
              Software Developer (Jun 2022 – Oct 2024)
            </p>
          </div>
          <div style={skillCategoryStyle}>
            <h3 style={skillCategoryTitleStyle}>PrimeIT</h3>
            <p style={{ margin: 0 }}>
              Software Development Consultant (Mar 2022 – Jun 2022)
            </p>
          </div>
          <div style={skillCategoryStyle}>
            <h3 style={skillCategoryTitleStyle}>Oryon</h3>
            <p style={{ margin: 0 }}>
              Full-stack Developer (Aug 2021 – Mar 2022)
            </p>
          </div>
        </div>
      </div>

      {/* Education Section */}
      <div style={sectionStyle}>
        <h2 style={sectionTitleStyle}>
          <Icon name="calculator" size={20} color="#8b5cf6" />
          Education & Certifications
        </h2>
        <div style={skillsGridStyle}>
          <div style={skillCategoryStyle}>
            <h3 style={skillCategoryTitleStyle}>
              Instituto Politécnico de Bragança
            </h3>
            <p style={{ margin: 0 }}>
              Degree in Computer Science and Engineering (2017 – 2022)
            </p>
          </div>
          <div style={skillCategoryStyle}>
            <h3 style={skillCategoryTitleStyle}>The App Brewery</h3>
            <p style={{ margin: 0 }}>
              Introduction to Flutter Development Using Dart (Mar – May 2020)
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutApp
