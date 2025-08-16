import React, { useState } from 'react'
import Icon from '../UI/Icon'

const QuestionnaireApp = () => {
  const [formData, setFormData] = useState({})
  const [currentSection, setCurrentSection] = useState(0)
  const [errors, setErrors] = useState({})

  const sections = [
    { id: 'business', title: 'Business Info', icon: 'user' },
    { id: 'project', title: 'Project Type', icon: 'folder' },
    { id: 'content', title: 'Content & Design', icon: 'file' },
    { id: 'management', title: 'Management', icon: 'calculator' },
    { id: 'budget', title: 'Budget & Timeline', icon: 'mail' },
  ]

  const handleInputChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }))
    }
  }

  const handleCheckboxChange = (name, value, checked) => {
    const current = formData[name] || []
    if (checked) {
      setFormData((prev) => ({ ...prev, [name]: [...current, value] }))
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: current.filter((item) => item !== value),
      }))
    }
  }

  const validateSection = (sectionIndex) => {
    const newErrors = {}

    if (sectionIndex === 0) {
      if (!formData.clientName) newErrors.clientName = 'Client name is required'
      if (!formData.businessName)
        newErrors.businessName = 'Business name is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const nextSection = () => {
    if (validateSection(currentSection)) {
      setCurrentSection(Math.min(sections.length - 1, currentSection + 1))
    }
  }

  const prevSection = () => {
    setCurrentSection(Math.max(0, currentSection - 1))
  }

  const exportToText = () => {
    if (!formData.clientName || !formData.businessName) {
      alert(
        'Please fill in at least the client name and business name before exporting.'
      )
      return
    }

    let output = 'CLIENT QUESTIONNAIRE RESULTS\n'
    output += '========================================\n\n'
    output += `Date: ${new Date().toLocaleDateString()}\n`
    output += `Time: ${new Date().toLocaleTimeString()}\n\n`

    // Business Information
    output += '1. BUSINESS INFORMATION\n'
    output += '------------------------\n'
    output += `Client Name: ${formData.clientName || 'Not provided'}\n`
    output += `Business Name: ${formData.businessName || 'Not provided'}\n`
    output += `Business Type: ${formData.businessType || 'Not specified'}\n`
    output += `Number of Employees: ${formData.employees || 'Not specified'}\n`
    output += `Location: ${formData.location || 'Not provided'}\n`
    output += `Current Website/Social: ${formData.currentWebsite || 'None'}\n\n`

    // Project Type
    output += '2. PROJECT TYPE\n'
    output += '---------------\n'
    if (formData.projectType && formData.projectType.length > 0) {
      formData.projectType.forEach((type) => {
        output += `• ${type.replace('-', ' ').toUpperCase()}\n`
      })
    } else {
      output += 'No project types selected\n'
    }
    output += `Other Details: ${formData.projectOtherDetails || 'None'}\n\n`

    // Content & Design
    output += '3. CONTENT & DESIGN\n'
    output += '-------------------\n'
    output += `Current Assets: ${
      formData.currentAssets
        ? formData.currentAssets.join(', ')
        : 'None specified'
    }\n`
    output += `Need Creation: ${
      formData.needCreation
        ? formData.needCreation.join(', ')
        : 'None specified'
    }\n`
    output += `Design Style: ${formData.designStyle || 'Not specified'}\n\n`

    // Management & Training
    output += '4. MANAGEMENT & TRAINING\n'
    output += '------------------------\n'
    output += `Existing Accounts: ${
      formData.existingAccounts ? formData.existingAccounts.join(', ') : 'None'
    }\n`
    output += `Account Handling: ${
      formData.accountHandling || 'Not specified'
    }\n`
    output += `Training Preference: ${
      formData.trainingPreference || 'Not specified'
    }\n`
    output += `Training Method: ${formData.trainingMethod || 'Not specified'}\n`
    output += `Ongoing Maintenance: ${
      formData.ongoingMaintenance || 'Not specified'
    }\n\n`

    // E-commerce Details
    output += '5. E-COMMERCE / BOOKING DETAILS\n'
    output += '-------------------------------\n'
    output += `Products/Services: ${
      formData.productsServices || 'Not specified'
    }\n`
    output += `Number of Products: ${
      formData.numberOfProducts || 'Not specified'
    }\n`
    output += `Online Payments: ${formData.onlinePayments || 'Not specified'}\n`
    output += `Booking Limits: ${formData.bookingLimits || 'Not specified'}\n`
    output += `Delivery Options: ${
      formData.deliveryOptions || 'Not specified'
    }\n\n`

    // Budget & Timeline
    output += '6. BUDGET & TIMELINE\n'
    output += '--------------------\n'
    output += `Budget: ${formData.budget || 'Not specified'}\n`
    output += `Target Date: ${formData.targetDate || 'Not specified'}\n`
    output += `Monthly Service Fee: ${
      formData.monthlyServiceFee || 'Not specified'
    }\n\n`

    // Optional Extras
    output += '7. OPTIONAL EXTRAS\n'
    output += '------------------\n'
    if (formData.optionalExtras && formData.optionalExtras.length > 0) {
      formData.optionalExtras.forEach((extra) => {
        output += `• ${extra.replace('-', ' ').toUpperCase()}\n`
      })
    } else {
      output += 'None selected\n'
    }
    output += '\n'

    // Notes
    output += '8. NOTES / SPECIAL REQUESTS\n'
    output += '---------------------------\n'
    output += formData.clientNotes || 'No additional notes\n'
    output += '\n'

    // Summary
    output += 'NEXT STEPS:\n'
    output += '-----------\n'
    output += '1. Review client requirements\n'
    output += '2. Prepare detailed proposal\n'
    output += '3. Schedule follow-up meeting\n'
    output += '4. Provide pricing estimate\n'

    // Create and download file
    const blob = new Blob([output], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `questionnaire-${formData.businessName || 'client'}-${
      new Date().toISOString().split('T')[0]
    }.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const containerStyle = {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    background: '#ffffff',
  }

  const headerStyle = {
    padding: '24px 32px',
    borderBottom: '1px solid #e5e7eb',
    background: '#f9fafb',
  }

  const progressStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '16px',
  }

  const stepStyle = (index, isActive, isCompleted) => ({
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '8px 16px',
    borderRadius: '8px',
    background: isActive ? '#3b82f6' : isCompleted ? '#10b981' : '#e5e7eb',
    color: isActive || isCompleted ? 'white' : '#6b7280',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  })

  const contentStyle = {
    flex: 1,
    overflow: 'auto',
    padding: '32px',
  }

  const sectionTitleStyle = {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: '8px',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
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
    padding: '10px 12px',
    border: '1px solid #d1d5db',
    borderRadius: '6px',
    fontSize: '14px',
    transition: 'border-color 0.2s ease',
  }

  const inputErrorStyle = {
    ...inputStyle,
    borderColor: '#ef4444',
  }

  const errorStyle = {
    color: '#ef4444',
    fontSize: '12px',
    marginTop: '4px',
  }

  const checkboxGroupStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '12px',
    marginTop: '8px',
  }

  const checkboxItemStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '8px',
    borderRadius: '6px',
    transition: 'background-color 0.2s ease',
  }

  const footerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '24px 32px',
    borderTop: '1px solid #e5e7eb',
    background: '#f9fafb',
  }

  const buttonStyle = (variant = 'primary') => ({
    padding: '10px 20px',
    borderRadius: '6px',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    border: variant === 'primary' ? 'none' : '1px solid #d1d5db',
    background: variant === 'primary' ? '#3b82f6' : 'white',
    color: variant === 'primary' ? 'white' : '#374151',
  })

  const renderBusinessSection = () => (
    <div>
      <h2 style={sectionTitleStyle}>
        <Icon name="user" size={24} color="#3b82f6" />
        Business Information
      </h2>
      <p style={{ color: '#6b7280', marginBottom: '24px' }}>
        Tell us about your business and current situation.
      </p>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '20px',
        }}
      >
        <div style={formGroupStyle}>
          <label style={labelStyle}>Client Name *</label>
          <input
            type="text"
            style={errors.clientName ? inputErrorStyle : inputStyle}
            value={formData.clientName || ''}
            onChange={(e) => handleInputChange('clientName', e.target.value)}
            placeholder="Your full name"
          />
          {errors.clientName && (
            <div style={errorStyle}>{errors.clientName}</div>
          )}
        </div>

        <div style={formGroupStyle}>
          <label style={labelStyle}>Business Name *</label>
          <input
            type="text"
            style={errors.businessName ? inputErrorStyle : inputStyle}
            value={formData.businessName || ''}
            onChange={(e) => handleInputChange('businessName', e.target.value)}
            placeholder="Your business name"
          />
          {errors.businessName && (
            <div style={errorStyle}>{errors.businessName}</div>
          )}
        </div>

        <div style={formGroupStyle}>
          <label style={labelStyle}>Business Type</label>
          <select
            style={inputStyle}
            value={formData.businessType || ''}
            onChange={(e) => handleInputChange('businessType', e.target.value)}
          >
            <option value="">Select business type</option>
            <option value="restaurant">Restaurant/Café</option>
            <option value="retail">Retail Store</option>
            <option value="services">Professional Services</option>
            <option value="health">Healthcare/Wellness</option>
            <option value="beauty">Beauty/Salon</option>
            <option value="fitness">Fitness/Gym</option>
            <option value="automotive">Automotive</option>
            <option value="real-estate">Real Estate</option>
            <option value="education">Education/Training</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div style={formGroupStyle}>
          <label style={labelStyle}>Number of Employees</label>
          <select
            style={inputStyle}
            value={formData.employees || ''}
            onChange={(e) => handleInputChange('employees', e.target.value)}
          >
            <option value="">Select range</option>
            <option value="1">Just me</option>
            <option value="2-5">2-5 employees</option>
            <option value="6-10">6-10 employees</option>
            <option value="11-25">11-25 employees</option>
            <option value="25+">25+ employees</option>
          </select>
        </div>

        <div style={formGroupStyle}>
          <label style={labelStyle}>Business Location</label>
          <input
            type="text"
            style={inputStyle}
            value={formData.location || ''}
            onChange={(e) => handleInputChange('location', e.target.value)}
            placeholder="City, District"
          />
        </div>

        <div style={formGroupStyle}>
          <label style={labelStyle}>Meeting Date</label>
          <input
            type="date"
            style={inputStyle}
            value={formData.meetingDate || ''}
            onChange={(e) => handleInputChange('meetingDate', e.target.value)}
          />
        </div>
      </div>

      <div style={formGroupStyle}>
        <label style={labelStyle}>Current Website / Social Media</label>
        <textarea
          style={inputStyle}
          value={formData.currentWebsite || ''}
          onChange={(e) => handleInputChange('currentWebsite', e.target.value)}
          placeholder="List current website, Facebook, Instagram, etc."
          rows="3"
        />
      </div>
    </div>
  )

  const renderProjectSection = () => (
    <div>
      <h2 style={sectionTitleStyle}>
        <Icon name="folder" size={24} color="#8b5cf6" />
        Project Type
      </h2>
      <p style={{ color: '#6b7280', marginBottom: '24px' }}>
        What type of digital solution do you need? Check all that apply.
      </p>

      <div style={checkboxGroupStyle}>
        {[
          {
            id: 'single-page',
            label: '1-page website (contact info, hours, services)',
          },
          {
            id: 'multi-page',
            label: 'Multi-page website (home, about, services, contact)',
          },
          {
            id: 'ecommerce',
            label: 'Online store / e-commerce (selling products online)',
          },
          { id: 'booking', label: 'Booking / reservation platform' },
          { id: 'inventory', label: 'Inventory / management system' },
          { id: 'other', label: 'Other (specify below)' },
        ].map((option) => (
          <label key={option.id} style={checkboxItemStyle}>
            <input
              type="checkbox"
              checked={(formData.projectType || []).includes(option.id)}
              onChange={(e) =>
                handleCheckboxChange('projectType', option.id, e.target.checked)
              }
            />
            <span style={{ fontSize: '14px' }}>{option.label}</span>
          </label>
        ))}
      </div>

      <div style={{ ...formGroupStyle, marginTop: '24px' }}>
        <label style={labelStyle}>Other project details</label>
        <textarea
          style={inputStyle}
          value={formData.projectOtherDetails || ''}
          onChange={(e) =>
            handleInputChange('projectOtherDetails', e.target.value)
          }
          placeholder="Describe any specific requirements or features you need..."
          rows="3"
        />
      </div>
    </div>
  )

  const renderContentSection = () => (
    <div>
      <h2 style={sectionTitleStyle}>
        <Icon name="file" size={24} color="#10b981" />
        Content & Design
      </h2>
      <p style={{ color: '#6b7280', marginBottom: '24px' }}>
        What assets do you have, and what do you need help creating?
      </p>

      <div style={formGroupStyle}>
        <label style={labelStyle}>Current Assets (check what you have)</label>
        <div style={checkboxGroupStyle}>
          {[
            { id: 'logo', label: 'Logo' },
            { id: 'photos', label: 'Professional Photos' },
            { id: 'text', label: 'Written Content/Copy' },
          ].map((option) => (
            <label key={option.id} style={checkboxItemStyle}>
              <input
                type="checkbox"
                checked={(formData.currentAssets || []).includes(option.id)}
                onChange={(e) =>
                  handleCheckboxChange(
                    'currentAssets',
                    option.id,
                    e.target.checked
                  )
                }
              />
              <span style={{ fontSize: '14px' }}>{option.label}</span>
            </label>
          ))}
        </div>
      </div>

      <div style={formGroupStyle}>
        <label style={labelStyle}>
          Do you want me to create/improve these? (check all that apply)
        </label>
        <div style={checkboxGroupStyle}>
          {[
            { id: 'logo', label: 'Logo / Graphics Design' },
            { id: 'photos', label: 'Professional Photography / Photo Editing' },
            { id: 'copy', label: 'Copywriting / Content Creation' },
          ].map((option) => (
            <label key={option.id} style={checkboxItemStyle}>
              <input
                type="checkbox"
                checked={(formData.needCreation || []).includes(option.id)}
                onChange={(e) =>
                  handleCheckboxChange(
                    'needCreation',
                    option.id,
                    e.target.checked
                  )
                }
              />
              <span style={{ fontSize: '14px' }}>{option.label}</span>
            </label>
          ))}
        </div>
      </div>

      <div style={formGroupStyle}>
        <label style={labelStyle}>Preferred Style / Examples</label>
        <textarea
          style={inputStyle}
          value={formData.designStyle || ''}
          onChange={(e) => handleInputChange('designStyle', e.target.value)}
          placeholder="Describe your preferred style or provide links to websites you like..."
          rows="3"
        />
      </div>
    </div>
  )

  const renderBudgetSection = () => (
    <div>
      <h2 style={sectionTitleStyle}>
        <Icon name="mail" size={24} color="#f59e0b" />
        Budget & Timeline
      </h2>
      <p style={{ color: '#6b7280', marginBottom: '24px' }}>
        Help us understand your budget and timeline expectations.
      </p>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '20px',
        }}
      >
        <div style={formGroupStyle}>
          <label style={labelStyle}>Budget (€)</label>
          <select
            style={inputStyle}
            value={formData.budget || ''}
            onChange={(e) => handleInputChange('budget', e.target.value)}
          >
            <option value="">Select budget range</option>
            <option value="500-1000">€500 - €1,000</option>
            <option value="1000-2000">€1,000 - €2,000</option>
            <option value="2000-3000">€2,000 - €3,000</option>
            <option value="3000-5000">€3,000 - €5,000</option>
            <option value="5000+">€5,000+</option>
            <option value="flexible">Flexible</option>
          </select>
        </div>

        <div style={formGroupStyle}>
          <label style={labelStyle}>Target Completion Date</label>
          <input
            type="date"
            style={inputStyle}
            value={formData.targetDate || ''}
            onChange={(e) => handleInputChange('targetDate', e.target.value)}
          />
        </div>
      </div>

      <div style={formGroupStyle}>
        <label style={labelStyle}>Monthly Service Fee for Maintenance</label>
        <div style={{ marginTop: '8px' }}>
          {[
            { id: 'yes', label: 'Yes, interested in ongoing support' },
            { id: 'no', label: 'No, one-time project only' },
            { id: 'maybe', label: 'Maybe, depends on cost and services' },
          ].map((option) => (
            <label
              key={option.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '8px',
              }}
            >
              <input
                type="radio"
                name="monthlyServiceFee"
                value={option.id}
                checked={formData.monthlyServiceFee === option.id}
                onChange={(e) =>
                  handleInputChange('monthlyServiceFee', e.target.value)
                }
              />
              <span style={{ fontSize: '14px' }}>{option.label}</span>
            </label>
          ))}
        </div>
      </div>

      <div style={formGroupStyle}>
        <label style={labelStyle}>Additional Notes / Special Requests</label>
        <textarea
          style={inputStyle}
          value={formData.clientNotes || ''}
          onChange={(e) => handleInputChange('clientNotes', e.target.value)}
          placeholder="Any additional information, specific requirements, or questions..."
          rows="4"
        />
      </div>
    </div>
  )

  const renderCurrentSection = () => {
    switch (currentSection) {
      case 0:
        return renderBusinessSection()
      case 1:
        return renderProjectSection()
      case 2:
        return renderContentSection()
      case 3:
        return renderBudgetSection()
      case 4:
        return renderBudgetSection() // Using budget section for now
      default:
        return renderBusinessSection()
    }
  }

  return (
    <div style={containerStyle}>
      {/* Header with Progress */}
      <div style={headerStyle}>
        <h1
          style={{
            fontSize: '20px',
            fontWeight: 'bold',
            color: '#1f2937',
            marginBottom: '16px',
          }}
        >
          Client Questionnaire
        </h1>
        <div style={progressStyle}>
          {sections.map((section, index) => (
            <div
              key={section.id}
              style={stepStyle(
                index,
                index === currentSection,
                index < currentSection
              )}
              onClick={() => setCurrentSection(index)}
            >
              <Icon name={section.icon} size={16} />
              <span>{section.title}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Content */}
      <div style={contentStyle}>{renderCurrentSection()}</div>

      {/* Footer with Navigation */}
      <div style={footerStyle}>
        <button
          style={buttonStyle('secondary')}
          onClick={prevSection}
          disabled={currentSection === 0}
        >
          ← Previous
        </button>

        <div style={{ display: 'flex', gap: '12px' }}>
          <button style={buttonStyle('secondary')} onClick={exportToText}>
            📄 Export Results
          </button>

          {currentSection < sections.length - 1 ? (
            <button style={buttonStyle('primary')} onClick={nextSection}>
              Next →
            </button>
          ) : (
            <button style={buttonStyle('primary')} onClick={exportToText}>
              ✅ Complete & Export
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default QuestionnaireApp
