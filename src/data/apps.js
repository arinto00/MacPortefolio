// App configurations for dock and desktop
export const dockApps = [
  {
    id: 'about',
    title: 'About Me',
    icon: 'user',
    color: '#3b82f6',
    category: 'app',
  },
  {
    id: 'projects',
    title: 'Projects',
    icon: 'folder',
    color: '#8b5cf6',
    category: 'app',
  },
  {
    id: 'questionnaire',
    title: 'Questionnaire',
    icon: 'file',
    color: '#10b981',
    category: 'app',
  },
  {
    id: 'contact',
    title: 'Contact',
    icon: 'mail',
    color: '#ef4444',
    category: 'app',
  },
  {
    id: 'calculator',
    title: 'Calculator',
    icon: 'calculator',
    color: '#6b7280',
    category: 'utility',
  },
  {
    id: 'trash',
    title: 'Trash',
    icon: 'trash',
    color: '#9ca3af',
    category: 'system',
  },
]

// Desktop items (files and folders on desktop)
export const desktopItems = [
  {
    id: 'projects-folder',
    name: 'My Projects',
    type: 'folder',
    icon: 'folder',
    position: { top: 120, left: 50 },
    action: 'open-projects',
  },
  {
    id: 'resume',
    name: 'Resume.pdf',
    type: 'file',
    icon: 'file',
    position: { top: 220, left: 50 },
    action: 'download-resume',
  },
  {
    id: 'services',
    name: 'Services.pages',
    type: 'file',
    icon: 'file',
    position: { top: 320, left: 50 },
    action: 'open-about',
  },
]

// Window default configurations
export const windowDefaults = {
  width: 800,
  height: 600,
  minWidth: 400,
  minHeight: 300,
  defaultPosition: {
    x: 100,
    y: 100,
  },
}

// App window configurations (specific sizes for each app)
export const appConfigs = {
  about: {
    title: 'About Me',
    width: 700,
    height: 550,
    resizable: true,
  },
  projects: {
    title: 'My Projects',
    width: 900,
    height: 650,
    resizable: true,
  },
  questionnaire: {
    title: 'Client Questionnaire',
    width: 850,
    height: 600,
    resizable: true,
  },
  contact: {
    title: 'Contact Me',
    width: 500,
    height: 600,
    resizable: false,
  },
  calculator: {
    title: 'Calculator',
    width: 350,
    height: 500,
    resizable: false,
  },
}

export default {
  dockApps,
  desktopItems,
  windowDefaults,
  appConfigs,
}
