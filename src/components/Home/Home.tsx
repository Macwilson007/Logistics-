'use client';

import { useState } from 'react';
import './Home.css';

/* ---- Icon Components ---- */
const TrackIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><polyline points="12,6 12,12 16,14" />
  </svg>
);

const QuoteIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14,2 14,8 20,8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" />
  </svg>
);

const BusinessIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" /><line x1="12" y1="12" x2="12" y2="12.01" />
  </svg>
);

const PlaneIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z" />
  </svg>
);

const ShipIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 21c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1 .6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" /><path d="M19.38 20A11.6 11.6 0 0 0 21 14l-9-4-9 4c0 2.9.94 5.34 2.81 7.76" /><path d="M19 13V7a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v6" /><path d="M12 1v4" />
  </svg>
);

const TruckIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <rect x="1" y="3" width="15" height="13" rx="1" /><polygon points="16,8 22,11 22,16 16,16" /><circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" />
  </svg>
);

const WarehouseIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 8.35V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8.35A2 2 0 0 1 3.26 6.5l8-3.2a2 2 0 0 1 1.48 0l8 3.2A2 2 0 0 1 22 8.35Z" /><path d="M6 18h12" /><path d="M6 14h12" /><rect x="9" y="18" width="6" height="4" />
  </svg>
);

const ArrowRight = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12,5 19,12 12,19" />
  </svg>
);

const StarIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="none">
    <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
  </svg>
);

const CheckIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20,6 9,17 4,12" />
  </svg>
);

const SearchIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
  </svg>
);

/* ---- Services Data ---- */
const services = [
  {
    icon: <PlaneIcon />,
    title: 'Air Freight',
    desc: 'Fast, reliable air cargo services worldwide. Express and standard options for time-critical shipments.',
    color: '#D40511',
  },
  {
    icon: <ShipIcon />,
    title: 'Ocean Freight',
    desc: 'Cost-effective sea freight for large shipments. FCL and LCL options with full customs clearance.',
    color: '#0066CC',
  },
  {
    icon: <TruckIcon />,
    title: 'Road Freight',
    desc: 'Dedicated road transport solutions. Standard, express, and groupage services across the network.',
    color: '#00A651',
  },
  {
    icon: <WarehouseIcon />,
    title: 'Warehousing',
    desc: 'Strategic warehouse locations with inventory management, pick & pack, and distribution services.',
    color: '#FF9900',
  },
];

/* ---- Quick Actions Data ---- */
const quickActions = [
  {
    icon: <TrackIcon />,
    title: 'Ship Now',
    desc: 'Find the right service',
    href: '/book',
  },
  {
    icon: <QuoteIcon />,
    title: 'Get a Quote',
    desc: 'Estimate cost to share and compare',
    href: '/quote',
  },
  {
    icon: <BusinessIcon />,
    title: 'For Business',
    desc: 'Request a business account and profit from exclusive benefits',
    href: '/business',
  },
];

/* ---- Testimonials ---- */
const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'Supply Chain Director, TechCorp',
    text: 'Switching to this logistics platform reduced our shipping costs by 23% and improved delivery times significantly. The real-time tracking is exceptional.',
    rating: 5,
  },
  {
    name: 'Michael Chen',
    role: 'CEO, Global Imports Ltd',
    text: 'The customs clearance support alone made this worth it. Our international shipments arrive faster and with zero documentation headaches.',
    rating: 5,
  },
  {
    name: 'Amara Okafor',
    role: 'Operations Manager, AfriTrade',
    text: 'Outstanding service across Nigeria and West Africa. The warehouse-to-door solution is seamless and the customer support is truly world-class.',
    rating: 5,
  },
];

/* ---- Stats ---- */
const stats = [
  { value: '220+', label: 'Countries Served' },
  { value: '100K+', label: 'Shipments Daily' },
  { value: '99.2%', label: 'On-Time Delivery' },
  { value: '24/7', label: 'Customer Support' },
];

export default function HomePage() {
  const [trackingNumber, setTrackingNumber] = useState('');

  return (
    <main className="home" id="home-page">
      {/* ===== HERO SECTION ===== */}
      <section className="hero" id="hero-section">
        <div className="hero-bg">
          <div className="hero-gradient" />
          <div className="hero-pattern" />
        </div>
        <div className="container hero-content">
          <div className="hero-text">
            <span className="hero-badge animate-fade-in">🌍 Global Logistics Solutions</span>
            <h1 className="hero-title animate-fade-in-up">
              Delivering <span className="hero-highlight">Excellence</span> Across Every Border
            </h1>
            <p className="hero-subtitle animate-fade-in-up">
              From documents to heavy cargo, we connect businesses worldwide with fast,
              reliable, and transparent shipping solutions.
            </p>
          </div>

          <div className="hero-tracker animate-fade-in-up" id="tracking-widget">
            <div className="tracker-tabs">
              <button className="tracker-tab active">Track Shipment</button>
              <button 
                className="tracker-tab"
                onClick={() => window.location.href = '/book'}
              >
                Schedule Pickup
              </button>
            </div>
            <form 
              className="tracker-input-group" 
              onSubmit={(e) => {
                e.preventDefault();
                if (trackingNumber) window.location.href = `/track?id=${trackingNumber}`;
              }}
            >
              <div className="tracker-input-wrapper">
                <SearchIcon />
                <input
                  type="text"
                  className="tracker-input"
                  placeholder="Enter tracking number or reference"
                  value={trackingNumber}
                  onChange={e => setTrackingNumber(e.target.value)}
                  id="tracking-input"
                />
              </div>
              <button 
                type="submit"
                className="btn btn-primary btn-lg tracker-btn" 
                id="track-btn"
              >
                Track
              </button>
            </form>
            <p className="tracker-hint">
              Track multiple shipments: separate numbers with commas
            </p>
          </div>
        </div>
      </section>

      {/* ===== QUICK ACTIONS ===== */}
      <section className="quick-actions" id="quick-actions">
        <div className="container">
          <div className="quick-actions-grid">
            {quickActions.map((action, i) => (
              <a
                key={action.title}
                href={action.href}
                className="quick-action-card"
                style={{ animationDelay: `${i * 0.1}s` }}
                id={`quick-action-${action.title.toLowerCase().replace(/\s/g, '-')}`}
              >
                <div className="quick-action-icon">{action.icon}</div>
                <div className="quick-action-text">
                  <h3 className="quick-action-title">{action.title}</h3>
                  <p className="quick-action-desc">{action.desc}</p>
                </div>
                <span className="quick-action-arrow"><ArrowRight /></span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SERVICES ===== */}
      <section className="section section-gray" id="services-section">
        <div className="container">
          <div className="text-center" style={{ marginBottom: 'var(--space-12)' }}>
            <h2 className="section-title">Our Services</h2>
            <p className="section-subtitle" style={{ margin: '0 auto', marginTop: 'var(--space-3)' }}>
              Comprehensive logistics solutions tailored to your business needs, operating across land, sea, and air.
            </p>
          </div>
          <div className="services-grid">
            {services.map((service, i) => (
              <div
                key={service.title}
                className="service-card"
                style={{ animationDelay: `${i * 0.1}s` }}
                id={`service-${service.title.toLowerCase().replace(/\s/g, '-')}`}
              >
                <div className="service-icon" style={{ color: service.color, background: `${service.color}12` }}>
                  {service.icon}
                </div>
                <h3 className="service-title">{service.title}</h3>
                <p className="service-desc">{service.desc}</p>
                <a href={`/services/${service.title.toLowerCase().replace(/\s/g, '-')}`} className="service-link">
                  Learn more <ArrowRight />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== STATS BAR ===== */}
      <section className="stats-bar" id="stats-section">
        <div className="container">
          <div className="stats-grid">
            {stats.map((stat) => (
              <div key={stat.label} className="stat-item">
                <span className="stat-value">{stat.value}</span>
                <span className="stat-label">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== WHY CHOOSE US ===== */}
      <section className="section" id="why-choose-us">
        <div className="container">
          <div className="why-layout">
            <div className="why-text">
              <h2 className="section-title">Why Choose Us</h2>
              <p className="section-subtitle" style={{ marginTop: 'var(--space-3)' }}>
                We combine decades of logistics expertise with cutting-edge technology to deliver
                unmatched reliability and transparency.
              </p>
              <ul className="why-list">
                <li className="why-item">
                  <span className="why-check"><CheckIcon /></span>
                  <div>
                    <strong>Real-Time Visibility</strong>
                    <p>Track every shipment with live updates, automated notifications, and detailed handling history.</p>
                  </div>
                </li>
                <li className="why-item">
                  <span className="why-check"><CheckIcon /></span>
                  <div>
                    <strong>Global Network</strong>
                    <p>Operations spanning 220+ countries with dedicated customs clearance and local expertise.</p>
                  </div>
                </li>
                <li className="why-item">
                  <span className="why-check"><CheckIcon /></span>
                  <div>
                    <strong>Dedicated Support</strong>
                    <p>24/7 customer support with AI-assisted live chat and dedicated account managers.</p>
                  </div>
                </li>
                <li className="why-item">
                  <span className="why-check"><CheckIcon /></span>
                  <div>
                    <strong>Enterprise Ready</strong>
                    <p>API integrations, analytics dashboards, and ERP connectivity for business automation.</p>
                  </div>
                </li>
              </ul>
              <a href="/about" className="btn btn-primary btn-lg" style={{ marginTop: 'var(--space-6)' }}>
                Learn More About Us <ArrowRight />
              </a>
            </div>
            <div className="why-visual">
              <div className="why-visual-card">
                <div className="why-visual-top">
                  <span className="why-visual-badge">LIVE TRACKING</span>
                </div>
                <div className="why-visual-progress">
                  <div className="progress-step completed">
                    <div className="progress-dot" />
                    <span>Picked Up</span>
                  </div>
                  <div className="progress-line completed" />
                  <div className="progress-step completed">
                    <div className="progress-dot" />
                    <span>In Transit</span>
                  </div>
                  <div className="progress-line active" />
                  <div className="progress-step active">
                    <div className="progress-dot pulse" />
                    <span>Customs</span>
                  </div>
                  <div className="progress-line" />
                  <div className="progress-step">
                    <div className="progress-dot" />
                    <span>Delivered</span>
                  </div>
                </div>
                <div className="why-visual-details">
                  <div className="detail-row">
                    <span className="detail-label">Tracking ID</span>
                    <span className="detail-value">LG-2026-84729</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Origin</span>
                    <span className="detail-value">Lagos, NG</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Destination</span>
                    <span className="detail-value">London, UK</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">ETA</span>
                    <span className="detail-value highlight">Mar 29, 2026</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="section section-gray" id="testimonials-section">
        <div className="container">
          <div className="text-center" style={{ marginBottom: 'var(--space-12)' }}>
            <h2 className="section-title">Trusted by Businesses Worldwide</h2>
            <p className="section-subtitle" style={{ margin: '0 auto', marginTop: 'var(--space-3)' }}>
              See what our clients say about our logistics solutions.
            </p>
          </div>
          <div className="testimonials-grid">
            {testimonials.map((t, i) => (
              <div
                key={t.name}
                className="testimonial-card"
                style={{ animationDelay: `${i * 0.12}s` }}
                id={`testimonial-${i}`}
              >
                <div className="testimonial-stars">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <span key={j} className="star"><StarIcon /></span>
                  ))}
                </div>
                <p className="testimonial-text">&ldquo;{t.text}&rdquo;</p>
                <div className="testimonial-author">
                  <div className="testimonial-avatar">
                    {t.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <div className="testimonial-name">{t.name}</div>
                    <div className="testimonial-role">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="cta-section" id="cta-section">
        <div className="container">
          <div className="cta-card">
            <div className="cta-content">
              <h2 className="cta-title">Ready to Ship?</h2>
              <p className="cta-text">
                Get started with a free quote. Our experts will help you find the perfect
                shipping solution for your business.
              </p>
            </div>
            <div className="cta-actions">
              <a href="/quote" className="btn btn-yellow btn-lg" id="cta-quote-btn">
                Get a Free Quote
              </a>
              <a href="/contact" className="btn btn-outline btn-lg cta-contact-btn" id="cta-contact-btn">
                Contact Sales
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
