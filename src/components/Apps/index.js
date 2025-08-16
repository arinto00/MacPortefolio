// Export all app components
export { default as AboutApp } from './AboutApp'
export { default as ProjectsApp } from './ProjectsApp'
export { default as QuestionnaireApp } from './QuestionnaireApp'
export { default as ContactApp } from './ContactApp'
export { default as CalculatorApp } from './CalculatorApp'

// App component mapping for dynamic rendering
import AboutApp from './AboutApp'
import ProjectsApp from './ProjectsApp'
import QuestionnaireApp from './QuestionnaireApp'
import ContactApp from './ContactApp'
import CalculatorApp from './CalculatorApp'

export const appComponents = {
  about: AboutApp,
  projects: ProjectsApp,
  questionnaire: QuestionnaireApp,
  contact: ContactApp,
  calculator: CalculatorApp,
}

// Get app component by ID
export const getAppComponent = (appId) => {
  return appComponents[appId] || null
}
