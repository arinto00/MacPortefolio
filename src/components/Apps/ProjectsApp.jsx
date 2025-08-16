import React, { useState } from 'react'
import { projects, services } from '../../data/projects'
import Icon from '../UI/Icon'

const ProjectsApp = () => {
  const [activeTab, setActiveTab] = useState('projects')
  const [selectedProject, setSelectedProject] = useState(null)

  const containerStyle = {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  }

  const tabsStyle = {
    display: 'flex',
    borderBottom: '1px solid #e5e7eb',
    backgroundColor: '#f9fafb',
  }

  const tabStyle = (isActive) => ({
    padding: '12px 24px',
    border: 'none',
    background: isActive ? 'white' : 'transparent',
    color: isActive ? '#1f2937' : '#6b7280',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
    borderBottom: isActive ? '2px solid #3b82f6' : '2px solid transparent',
    transition: 'all 0.2s ease',
  })

  const contentStyle = {
    flex: 1,
    overflow: 'auto',
    padding: '32px',
  }

  const projectGridStyle = {
    display: 'grid',
    gap: '24px',
    gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
  }

  const projectCardStyle = {
    background: '#ffffff',
    border: '1px solid #e5e7eb',
    borderRadius: '12px',
    padding: '24px',
    transition: 'all 0.2s ease',
    cursor: 'pointer',
  }

  const projectHeaderStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '16px',
  }

  const projectTitleStyle = {
    fontSize: '18px',
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: '4px',
  }

  const projectTypeStyle = {
    background: '#dbeafe',
    color: '#1d4ed8',
    padding: '4px 12px',
    borderRadius: '16px',
    fontSize: '12px',
    fontWeight: '500',
  }

  const projectDescStyle = {
    color: '#6b7280',
    fontSize: '14px',
    lineHeight: '1.5',
    marginBottom: '16px',
  }

  const techStackStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '6px',
    marginBottom: '16px',
  }

  const techTagStyle = {
    background: '#f3f4f6',
    color: '#374151',
    padding: '2px 8px',
    borderRadius: '12px',
    fontSize: '11px',
  }

  const resultStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    color: '#059669',
    fontWeight: '600',
    fontSize: '14px',
  }

  const serviceCardStyle = {
    background: '#ffffff',
    border: '1px solid #e5e7eb',
    borderRadius: '12px',
    padding: '24px',
    marginBottom: '24px',
  }

  const modalStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  }

  const modalContentStyle = {
    background: 'white',
    borderRadius: '12px',
    padding: '32px',
    maxWidth: '600px',
    maxHeight: '80vh',
    overflow: 'auto',
    margin: '20px',
  }

  const ProjectModal = ({ project, onClose }) => (
    <div style={modalStyle} onClick={onClose}>
      <div style={modalContentStyle} onClick={(e) => e.stopPropagation()}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginBottom: '20px',
          }}
        >
          <h2
            style={{ fontSize: '24px', fontWeight: 'bold', color: '#1f2937' }}
          >
            {project.title}
          </h2>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '24px',
              cursor: 'pointer',
              color: '#6b7280',
            }}
          >
            ×
          </button>
        </div>

        <div style={{ marginBottom: '16px' }}>
          <span style={projectTypeStyle}>{project.type}</span>
        </div>

        <p
          style={{ color: '#374151', lineHeight: '1.6', marginBottom: '20px' }}
        >
          {project.description}
        </p>

        <div style={{ marginBottom: '20px' }}>
          <h3
            style={{ fontSize: '16px', fontWeight: '600', marginBottom: '8px' }}
          >
            Features Implemented:
          </h3>
          <ul style={{ paddingLeft: '20px' }}>
            {project.features?.map((feature, index) => (
              <li key={index} style={{ marginBottom: '4px', color: '#374151' }}>
                {feature}
              </li>
            ))}
          </ul>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <h3
            style={{ fontSize: '16px', fontWeight: '600', marginBottom: '8px' }}
          >
            Technologies Used:
          </h3>
          <div style={techStackStyle}>
            {project.technologies?.map((tech) => (
              <span key={tech} style={techTagStyle}>
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <h3
            style={{ fontSize: '16px', fontWeight: '600', marginBottom: '8px' }}
          >
            Key Metrics:
          </h3>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
              gap: '12px',
            }}
          >
            {Object.entries(project.metrics || {}).map(([key, value]) => (
              <div
                key={key}
                style={{
                  background: '#f9fafb',
                  padding: '12px',
                  borderRadius: '8px',
                  textAlign: 'center',
                }}
              >
                <div
                  style={{
                    fontSize: '18px',
                    fontWeight: 'bold',
                    color: '#059669',
                  }}
                >
                  {value}
                </div>
                <div
                  style={{
                    fontSize: '12px',
                    color: '#6b7280',
                    textTransform: 'capitalize',
                  }}
                >
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingTop: '16px',
            borderTop: '1px solid #e5e7eb',
          }}
        >
          <div>
            <strong>Duration:</strong> {project.duration} |{' '}
            <strong>Client:</strong> {project.client}
          </div>
          <div style={resultStyle}>
            <span>✅</span>
            {project.result}
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div style={containerStyle}>
      {/* Tabs */}
      <div style={tabsStyle}>
        <button
          style={tabStyle(activeTab === 'projects')}
          onClick={() => setActiveTab('projects')}
        >
          <Icon name="folder" size={16} /> Portfolio Projects
        </button>
        <button
          style={tabStyle(activeTab === 'services')}
          onClick={() => setActiveTab('services')}
        >
          <Icon name="file" size={16} /> Services Offered
        </button>
      </div>

      {/* Content */}
      <div style={contentStyle}>
        {activeTab === 'projects' && (
          <>
            <div style={{ marginBottom: '32px' }}>
              <h1
                style={{
                  fontSize: '28px',
                  fontWeight: 'bold',
                  color: '#1f2937',
                  marginBottom: '8px',
                }}
              >
                My Projects
              </h1>
              <p style={{ color: '#6b7280', fontSize: '16px' }}>
                Real results for local businesses across Portugal. Click any
                project for detailed information.
              </p>
            </div>

            <div style={projectGridStyle}>
              {projects.map((project) => (
                <div
                  key={project.id}
                  style={projectCardStyle}
                  onClick={() => setSelectedProject(project)}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow =
                      '0 4px 12px rgba(0, 0, 0, 0.1)'
                    e.currentTarget.style.transform = 'translateY(-2px)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = 'none'
                    e.currentTarget.style.transform = 'translateY(0)'
                  }}
                >
                  <div style={projectHeaderStyle}>
                    <div>
                      <h3 style={projectTitleStyle}>{project.title}</h3>
                      <p style={{ color: '#6b7280', fontSize: '13px' }}>
                        {project.client} • {project.year}
                      </p>
                    </div>
                    <span style={projectTypeStyle}>{project.type}</span>
                  </div>

                  <p style={projectDescStyle}>{project.description}</p>

                  <div style={techStackStyle}>
                    {project.technologies?.slice(0, 3).map((tech) => (
                      <span key={tech} style={techTagStyle}>
                        {tech}
                      </span>
                    ))}
                    {project.technologies?.length > 3 && (
                      <span style={techTagStyle}>
                        +{project.technologies.length - 3} more
                      </span>
                    )}
                  </div>

                  <div style={resultStyle}>
                    <span>✅</span>
                    {project.result}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {activeTab === 'services' && (
          <>
            <div style={{ marginBottom: '32px' }}>
              <h1
                style={{
                  fontSize: '28px',
                  fontWeight: 'bold',
                  color: '#1f2937',
                  marginBottom: '8px',
                }}
              >
                Services & Packages
              </h1>
              <p style={{ color: '#6b7280', fontSize: '16px' }}>
                Professional digital solutions tailored for small businesses.
                All packages include ongoing support options.
              </p>
            </div>

            {services.map((service) => (
              <div key={service.id} style={serviceCardStyle}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: '16px',
                  }}
                >
                  <div>
                    <h3
                      style={{
                        fontSize: '20px',
                        fontWeight: '600',
                        color: '#1f2937',
                        marginBottom: '4px',
                      }}
                    >
                      {service.name}
                    </h3>
                    <p style={{ color: '#6b7280', fontSize: '14px' }}>
                      {service.description}
                    </p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div
                      style={{
                        fontSize: '18px',
                        fontWeight: 'bold',
                        color: '#059669',
                      }}
                    >
                      {service.price.setup}
                    </div>
                    <div style={{ fontSize: '12px', color: '#6b7280' }}>
                      {service.price.monthly}/month support
                    </div>
                  </div>
                </div>

                <div style={{ marginBottom: '16px' }}>
                  <h4
                    style={{
                      fontSize: '14px',
                      fontWeight: '600',
                      marginBottom: '8px',
                      color: '#374151',
                    }}
                  >
                    Included Features:
                  </h4>
                  <ul
                    style={{
                      paddingLeft: '20px',
                      color: '#6b7280',
                      fontSize: '14px',
                    }}
                  >
                    {service.features.map((feature, index) => (
                      <li key={index} style={{ marginBottom: '4px' }}>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingTop: '12px',
                    borderTop: '1px solid #f3f4f6',
                  }}
                >
                  <div style={{ fontSize: '12px', color: '#6b7280' }}>
                    <strong>Timeline:</strong> {service.timeline} |{' '}
                    <strong>Ideal for:</strong> {service.ideal}
                  </div>
                </div>
              </div>
            ))}
          </>
        )}
      </div>

      {/* Project Detail Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </div>
  )
}

export default ProjectsApp
