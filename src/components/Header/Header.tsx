'use client';

import { useState, useRef, useEffect } from 'react';
import './Header.css';

/* ---- Icon Components ---- */
const SearchIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
  </svg>
);

const GlobeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" /><path d="M2 12h20" />
  </svg>
);

const ChevronDown = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="m6 9 6 6 6-6" />
  </svg>
);

const ChevronRight = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="m9 18 6-6-6-6" />
  </svg>
);

const ExternalLink = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15,3 21,3 21,9" /><line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);

const UserIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
  </svg>
);

const MenuIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="4" y1="6" x2="20" y2="6" /><line x1="4" y1="12" x2="20" y2="12" /><line x1="4" y1="18" x2="20" y2="18" />
  </svg>
);

const CloseIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

/* ---- Shipping Icon (for megamenu) ---- */
const QuoteIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="3" width="20" height="14" rx="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" />
  </svg>
);

const ShipNowIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="1" y="3" width="15" height="13" rx="1" /><polygon points="16,8 22,11 22,16 16,16" /><circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" />
  </svg>
);

/* ---- Nav Items ---- */
interface NavItem {
  label: string;
  hasMega: boolean;
}

const navItems: NavItem[] = [
  { label: 'Track', hasMega: false },
  { label: 'Ship', hasMega: true },
  { label: 'Customer Service', hasMega: false },
];

export default function Header() {
  const [activeMega, setActiveMega] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const megaRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);

  /* Close megamenu when clicking outside */
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        megaRef.current &&
        !megaRef.current.contains(e.target as Node) &&
        navRef.current &&
        !navRef.current.contains(e.target as Node)
      ) {
        setActiveMega(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleMega = (label: string) => {
    setActiveMega(prev => (prev === label ? null : label));
  };

  return (
    <>
      <header className="header" id="main-header">
        {/* ---- Top Bar ---- */}
        <div className="header-topbar">
          <div className="container header-topbar-inner">
            <a href="/" className="header-logo" aria-label="Logistics Website Home">
              <div className="logo-mark">
                <span className="logo-text">LOGISTICS</span>
                <span className="logo-dot">.</span>
              </div>
            </a>

            <div className="header-topbar-actions">
              <a href="/find-location" className="topbar-link">
                Find a Service Point <ExternalLink />
              </a>
              <button 
                className="topbar-link" 
                aria-label="Search"
                onClick={() => alert('Search feature is coming soon! Try the Megamenu under "Ship" for quick links.')}
              >
                <SearchIcon /> Search
              </button>
              <button 
                className="topbar-link"
                onClick={() => alert('Country selector is coming soon!')}
              >
                <GlobeIcon /> Nigeria
              </button>
            </div>
          </div>
        </div>

        {/* ---- Main Navigation ---- */}
        <nav className="header-nav" ref={navRef} id="main-navigation">
          <div className="container header-nav-inner">
            <ul className="nav-list">
              {navItems.map(item => (
                <li key={item.label} className="nav-item">
                  {item.hasMega ? (
                    <button
                      className={`nav-link ${activeMega === item.label ? 'active' : ''}`}
                      onClick={() => toggleMega(item.label)}
                      aria-expanded={activeMega === item.label}
                      id={`nav-${item.label.toLowerCase().replace(/\s/g, '-')}`}
                    >
                      {item.label}
                      <span className={`nav-chevron ${activeMega === item.label ? 'rotate' : ''}`}>
                        <ChevronDown />
                      </span>
                    </button>
                  ) : (
                    <a
                      href={`/${item.label.toLowerCase().replace(/\s/g, '-')}`}
                      className="nav-link"
                      id={`nav-${item.label.toLowerCase().replace(/\s/g, '-')}`}
                    >
                      {item.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>

            <div className="nav-right">
              <a href="/login" className="nav-portal-btn" id="customer-portal-btn">
                <UserIcon />
                Customer Portal
                <ChevronDown />
              </a>
            </div>

            {/* Mobile hamburger */}
            <button
              className="mobile-menu-btn"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
              id="mobile-menu-toggle"
            >
              {mobileOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </nav>
      </header>

      {/* ---- Megamenu Overlay ---- */}
      {activeMega === 'Ship' && (
        <div className="megamenu-overlay" onClick={() => setActiveMega(null)}>
          <div className="megamenu" ref={megaRef} onClick={e => e.stopPropagation()} id="ship-megamenu">
            <div className="container megamenu-inner">
              {/* Left Panel */}
              <div className="megamenu-left">
                <h3 className="megamenu-heading">START SHIPPING</h3>
                <a href="/quote" className="megamenu-action-card" id="mega-get-quote">
                  <div className="megamenu-action-icon">
                    <QuoteIcon />
                  </div>
                  <span className="megamenu-action-label">Get a Quote</span>
                  <span className="megamenu-action-arrow"><ChevronRight /></span>
                </a>
                <a href="/book" className="megamenu-action-card" id="mega-ship-now">
                  <div className="megamenu-action-icon">
                    <ShipNowIcon />
                  </div>
                  <span className="megamenu-action-label">Ship Now</span>
                  <span className="megamenu-action-arrow"><ChevronRight /></span>
                </a>
              </div>

              {/* Right Panel */}
              <div className="megamenu-right">
                <h3 className="megamenu-heading">Learn more about</h3>
                <div className="megamenu-grid">
                  {/* Column 1 */}
                  <div className="megamenu-col">
                    <h4 className="megamenu-col-title">Document and Package</h4>
                    <p className="megamenu-col-subtitle">Personal and Business</p>
                    <p className="megamenu-col-desc">
                      Learn about shipping options with Express delivery services
                    </p>
                    <a href="/services/express" className="btn btn-outline btn-sm" id="mega-explore-express">
                      Explore Express
                    </a>
                  </div>

                  {/* Column 2 */}
                  <div className="megamenu-col">
                    <h4 className="megamenu-col-title">Pallets, Containers and Cargo</h4>
                    <p className="megamenu-col-subtitle">Business Only</p>
                    <p className="megamenu-col-desc">
                      Air and ocean freight, plus customs and logistics services with Global Forwarding
                    </p>
                    <a href="/services/freight" className="btn btn-outline btn-sm" id="mega-explore-freight">
                      Explore Freight Services
                    </a>
                  </div>

                  {/* Column 3 */}
                  <div className="megamenu-col">
                    <h4 className="megamenu-col-title">For Business</h4>
                    <p className="megamenu-col-subtitle">Frequent Shippers</p>
                    <p className="megamenu-col-desc">
                      Ship regularly or often, learn about the benefits of opening an account
                    </p>
                    <a href="/business" className="btn btn-outline btn-sm" id="mega-frequent-shipping">
                      Frequent Shipping Options
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ---- Mobile Menu Drawer ---- */}
      <div className={`mobile-drawer ${mobileOpen ? 'open' : ''}`} id="mobile-drawer">
        <div className="mobile-drawer-content">
          <ul className="mobile-nav-list">
            <li><a href="/track" className="mobile-nav-link">Track</a></li>
            <li><a href="/book" className="mobile-nav-link">Ship</a></li>
            <li><a href="/support" className="mobile-nav-link">Customer Service</a></li>
            <li><a href="/quote" className="mobile-nav-link">Get a Quote</a></li>
            <li><a href="/login" className="mobile-nav-link">Customer Portal</a></li>
          </ul>
        </div>
      </div>
    </>
  );
}
