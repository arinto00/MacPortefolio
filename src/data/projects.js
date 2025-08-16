// Portfolio projects data
export const projects = [
  {
    id: 1,
    title: 'Restaurant Booking System',
    type: 'E-commerce + Booking',
    description:
      'Complete solution with online menu, table reservations, and order management. Built custom dashboard for restaurant staff to manage bookings, menu items, and customer orders in real-time.',
    technologies: [
      'Shopify',
      'OpenTable Integration',
      'Custom CSS',
      'JavaScript',
    ],
    features: [
      'Online table reservation system',
      'Digital menu with pricing',
      'Order management dashboard',
      'Customer notification system',
      'Payment processing integration',
    ],
    result: '40% increase in bookings',
    metrics: {
      bookingIncrease: '40%',
      timeReduction: '60%',
      customerSatisfaction: '95%',
    },
    duration: '6 weeks',
    client: 'Restaurant O Cantinho (Felgueiras)',
    status: 'completed',
    year: 2024,
  },
  {
    id: 2,
    title: 'Boutique Online Store',
    type: 'E-commerce',
    description:
      'Fashion retail website with inventory management and social media integration. Complete e-commerce solution with automated inventory tracking and Instagram feed integration.',
    technologies: [
      'WooCommerce',
      'Instagram API',
      'Payment Gateway',
      'WordPress',
    ],
    features: [
      'Product catalog management',
      'Inventory tracking system',
      'Social media integration',
      'Customer accounts & wishlists',
      'Analytics dashboard',
    ],
    result: '€15K monthly sales',
    metrics: {
      monthlyRevenue: '€15,000',
      conversionRate: '3.2%',
      avgOrderValue: '€85',
    },
    duration: '4 weeks',
    client: 'Moda Elegante (Porto)',
    status: 'completed',
    year: 2024,
  },
  {
    id: 3,
    title: 'Fitness Studio Platform',
    type: 'Booking System',
    description:
      'Class scheduling, member management, and automated email confirmations. Comprehensive fitness studio management system with member portal and instructor dashboard.',
    technologies: [
      'Calendly Integration',
      'Mailchimp',
      'Custom Dashboard',
      'React',
    ],
    features: [
      'Class scheduling system',
      'Member management portal',
      'Automated email notifications',
      'Payment processing',
      'Instructor dashboard',
    ],
    result: '60% reduction in admin time',
    metrics: {
      adminTimeReduction: '60%',
      memberRetention: '85%',
      classUtilization: '92%',
    },
    duration: '5 weeks',
    client: 'FitZone Gym (Felgueiras)',
    status: 'completed',
    year: 2023,
  },
  {
    id: 4,
    title: 'Local Bakery E-commerce',
    type: 'E-commerce + Delivery',
    description:
      'Online ordering system for local bakery with delivery scheduling and loyalty program. Custom solution for daily fresh products with time-slot delivery management.',
    technologies: [
      'Shopify',
      'Delivery API',
      'Loyalty System',
      'WhatsApp Integration',
    ],
    features: [
      'Daily product management',
      'Delivery time slots',
      'Loyalty points system',
      'WhatsApp order notifications',
      'Recurring order scheduling',
    ],
    result: '200% increase in online orders',
    metrics: {
      onlineOrderIncrease: '200%',
      customerRetention: '70%',
      avgOrderValue: '€25',
    },
    duration: '3 weeks',
    client: 'Padaria São João (Felgueiras)',
    status: 'completed',
    year: 2023,
  },
]

// Service packages offered
export const services = [
  {
    id: 'basic-website',
    name: 'Basic Website',
    description: '1-5 page website with contact form and basic SEO',
    features: [
      'Up to 5 pages',
      'Contact form',
      'Mobile responsive',
      'Basic SEO setup',
      '1 round of revisions',
    ],
    price: {
      setup: '€500-1,200',
      monthly: '€25-35',
    },
    timeline: '1-2 weeks',
    ideal: 'Small businesses, professionals, services',
  },
  {
    id: 'ecommerce-store',
    name: 'E-commerce Store',
    description:
      'Full online store with payment processing and inventory management',
    features: [
      'Product catalog (up to 100 items)',
      'Payment integration',
      'Inventory management',
      'Order processing',
      'Customer accounts',
      'Basic analytics',
    ],
    price: {
      setup: '€1,200-2,500',
      monthly: '€35-50',
    },
    timeline: '3-4 weeks',
    ideal: 'Retail stores, boutiques, product sellers',
  },
  {
    id: 'booking-system',
    name: 'Booking System',
    description: 'Appointment scheduling with automated confirmations',
    features: [
      'Calendar integration',
      'Automated confirmations',
      'Customer management',
      'Payment processing',
      'Staff dashboard',
    ],
    price: {
      setup: '€800-1,800',
      monthly: '€30-45',
    },
    timeline: '2-3 weeks',
    ideal: 'Restaurants, salons, fitness studios, consultants',
  },
]

// Testimonials from clients
export const testimonials = [
  {
    id: 1,
    client: 'Maria Silva',
    business: 'Restaurant O Cantinho',
    text: 'The booking system completely transformed our restaurant operations. We went from manual reservations to a professional system that our customers love.',
    rating: 5,
    project: 'Restaurant Booking System',
  },
  {
    id: 2,
    client: 'João Santos',
    business: 'Moda Elegante',
    text: 'Amazing work! Our online sales increased dramatically and the Instagram integration brings in new customers daily.',
    rating: 5,
    project: 'Boutique Online Store',
  },
  {
    id: 3,
    client: 'Ana Costa',
    business: 'FitZone Gym',
    text: 'The booking platform saved us hours of admin work every week. Members love being able to book classes online.',
    rating: 5,
    project: 'Fitness Studio Platform',
  },
]

export default {
  projects,
  services,
  testimonials,
}
