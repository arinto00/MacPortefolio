import React, { useState } from 'react'
import Icon from '../UI/Icon'

const ContactApp = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    projectType: '',
    budget: '',
    timeline: '',
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleInputChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // Create mailto link with form data
    const subject = encodeURIComponent(
      formData.subject || 'New Project Inquiry'
    )
    const body = encodeURIComponent(`
Name: ${formData.name}
Email: ${formData.email}
Project Type: ${formData.projectType}
Budget Range: ${formData.budget}
Timeline: ${formData.timeline}

Message:
${formData.message}

---
Sent from Mac Desktop Portfolio
    `)

    window.location.href = `mailto:your.email@example.com?subject=${subject}&body=${body}`
    setIsSubmitted(true)

    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
        projectType: '',
        budget: '',
        timeline: '',
      })
    }, 3000)
  }

  const containerStyle = {
    padding: '32px',
    maxWidth: '500px',
    margin: '0 auto',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  }

  const headerStyle = {
    textAlign: 'center',
    marginBottom: '32px',
  }

  const titleStyle = {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: '8px',
  }

  const subtitleStyle = {
    color: '#6b7280',
    fontSize: '16px',
    lineHeight: '1.5',
  }

  const contactInfoStyle = {
    background: '#f0f9ff',
    borderRadius: '12px',
    padding: '20px',
    marginBottom: '32px',
    border: '1px solid #bae6fd',
  }

  const contactItemStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '12px',
    fontSize: '15px',
    color: '#374151',
  }

  const formStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  }

  const formGroupStyle = {
    marginBottom: '20px',
  }

  const labelStyle = {
    display: 'block',
    fontSize: '14px',
    fontWeight: '500',
    color: '#374151',
    marginBottom: '6px',
  }

  const inputStyle = {
    width: '100%',
    padding: '12px',
    border: '1px solid #d1d5db',
    borderRadius: '8px',
    fontSize: '14px',
    transition: 'border-color 0.2s ease',
    fontFamily: 'inherit',
  }

  const textareaStyle = {
    ...inputStyle,
    minHeight: '120px',
    resize: 'vertical',
  }

  const selectStyle = {
    ...inputStyle,
    cursor: 'pointer',
  }

  const buttonStyle = {
    width: '100%',
    padding: '12px 24px',
    background: '#3b82f6',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    marginTop: 'auto',
  }

  const successStyle = {
    background: '#d1fae5',
    color: '#065f46',
    padding: '16px',
    borderRadius: '8px',
    textAlign: 'center',
    border: '1px solid #a7f3d0',
    marginTop: '20px',
  }

  if (isSubmitted) {
    return (
      <div style={containerStyle}>
        <div style={successStyle}>
          <h3 style={{ marginBottom: '8px', fontSize: '18px' }}>
            Message Sent! ✅
          </h3>
          <p>
            Your email client should have opened. If not, you can reach me
            directly at:
          </p>
          <p style={{ fontWeight: 'bold', marginTop: '8px' }}>
            your.email@example.com
          </p>
        </div>
      </div>
    )
  }

  return (
    <div style={containerStyle}>
      {/* Header */}
      <div style={headerStyle}>
        <h1 style={titleStyle}>Get In Touch</h1>
        <p style={subtitleStyle}>
          Ready to transform your business with digital solutions? Let's discuss
          your project!
        </p>
      </div>

      {/* Contact Information */}
      <div style={contactInfoStyle}>
        <div style={contactItemStyle}>
          <Icon name="mail" size={18} color="#3b82f6" />
          <span>your.email@example.com</span>
        </div>
        <div style={contactItemStyle}>
          <span style={{ fontSize: '18px' }}>📱</span>
          <span>+351 XXX XXX XXX</span>
        </div>
        <div style={contactItemStyle}>
          <span style={{ fontSize: '18px' }}>📍</span>
          <span>Felgueiras, Porto, Portugal</span>
        </div>
        <div style={contactItemStyle}>
          <span style={{ fontSize: '18px' }}>🕒</span>
          <span>Mon-Fri: 9:00-18:00 | Weekend: By appointment</span>
        </div>
      </div>

      {/* Contact Form */}
      <div style={formStyle}>
        <div style={{ marginBottom: '24px' }}>
          <h3
            style={{
              fontSize: '18px',
              fontWeight: '600',
              color: '#374151',
              marginBottom: '8px',
            }}
          >
            Quick Contact Form
          </h3>
          <p style={{ fontSize: '14px', color: '#6b7280' }}>
            Fill out the form below and I'll get back to you within 24 hours.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '16px',
            marginBottom: '20px',
          }}
        >
          <div>
            <label style={labelStyle}>Name *</label>
            <input
              type="text"
              style={inputStyle}
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              placeholder="Your full name"
              required
            />
          </div>
          <div>
            <label style={labelStyle}>Email *</label>
            <input
              type="email"
              style={inputStyle}
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              placeholder="your@email.com"
              required
            />
          </div>
        </div>

        <div style={formGroupStyle}>
          <label style={labelStyle}>Project Type</label>
          <select
            style={selectStyle}
            value={formData.projectType}
            onChange={(e) => handleInputChange('projectType', e.target.value)}
          >
            <option value="">Select project type</option>
            <option value="website">Website Development</option>
            <option value="ecommerce">E-commerce Store</option>
            <option value="booking">Booking System</option>
            <option value="redesign">Website Redesign</option>
            <option value="maintenance">Ongoing Maintenance</option>
            <option value="consultation">Consultation Only</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '16px',
            marginBottom: '20px',
          }}
        >
          <div>
            <label style={labelStyle}>Budget Range</label>
            <select
              style={selectStyle}
              value={formData.budget}
              onChange={(e) => handleInputChange('budget', e.target.value)}
            >
              <option value="">Select budget</option>
              <option value="500-1000">€500 - €1,000</option>
              <option value="1000-2500">€1,000 - €2,500</option>
              <option value="2500-5000">€2,500 - €5,000</option>
              <option value="5000+">€5,000+</option>
              <option value="discuss">Let's discuss</option>
            </select>
          </div>
          <div>
            <label style={labelStyle}>Timeline</label>
            <select
              style={selectStyle}
              value={formData.timeline}
              onChange={(e) => handleInputChange('timeline', e.target.value)}
            >
              <option value="">Select timeline</option>
              <option value="asap">ASAP</option>
              <option value="1-2weeks">1-2 weeks</option>
              <option value="1month">Within 1 month</option>
              <option value="2-3months">2-3 months</option>
              <option value="flexible">Flexible</option>
            </select>
          </div>
        </div>

        <div style={formGroupStyle}>
          <label style={labelStyle}>Subject</label>
          <input
            type="text"
            style={inputStyle}
            value={formData.subject}
            onChange={(e) => handleInputChange('subject', e.target.value)}
            placeholder="Brief description of your project"
          />
        </div>

        <div style={formGroupStyle}>
          <label style={labelStyle}>Message *</label>
          <textarea
            style={textareaStyle}
            value={formData.message}
            onChange={(e) => handleInputChange('message', e.target.value)}
            placeholder="Tell me about your business and what you're looking to achieve. The more details you provide, the better I can help you."
            required
          />
        </div>

        <button
          style={buttonStyle}
          onClick={handleSubmit}
          onMouseEnter={(e) => (e.target.style.background = '#2563eb')}
          onMouseLeave={(e) => (e.target.style.background = '#3b82f6')}
          disabled={!formData.name || !formData.email || !formData.message}
        >
          Send Message 📧
        </button>

        <p
          style={{
            fontSize: '12px',
            color: '#6b7280',
            textAlign: 'center',
            marginTop: '16px',
            lineHeight: '1.4',
          }}
        >
          🔒 Your information is secure and will only be used to respond to your
          inquiry.
          <br />
          💬 Prefer WhatsApp? Send me a message at +351 XXX XXX XXX
        </p>
      </div>
    </div>
  )
}

export default ContactApp
