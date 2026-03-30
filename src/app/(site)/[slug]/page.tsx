import '@/app/(site)/generic.css';
import prisma from "@/lib/prisma";

// Default content for fallback
const defaultPageData: Record<string, { title: string; subtitle: string }> = {
  about: { title: 'About Us', subtitle: 'Learn more about our logistics network, our history, and our global impact.' },
  contact: { title: 'Contact Support', subtitle: 'Need help? Get in touch with our global support team 24/7.' },
  support: { title: 'Customer Support', subtitle: 'Find answers, manage claims, and connect with a specialist.' },
  business: { title: 'For Business', subtitle: 'Partner with us. Enterprise solutions, frequent shipping, and supply chain management.' },
  faq: { title: 'Frequently Asked Questions', subtitle: 'Find quick answers to common questions about tracking, shipping, and quotes.' },
  claims: { title: 'File a Claim', subtitle: 'Report damaged shipments or missing packages through our secure claims portal.' },
  advisories: { title: 'Service Advisories', subtitle: 'Stay updated on network delays, weather impacts, and customs alerts.' },
  careers: { title: 'Careers', subtitle: 'Join our team. We are hiring across the globe.' },
  press: { title: 'Press Center', subtitle: 'Latest news, press releases, and media resources.' },
  sustainability: { title: 'Sustainability', subtitle: 'Our commitment to zero emissions and green logistics by 2050.' },
  investors: { title: 'Investor Relations', subtitle: 'Financial reports, stock performance, and corporate strategy.' },
  blog: { title: 'Logistics Blog', subtitle: 'Insights, industry trends, and supply chain strategies.' },
  privacy: { title: 'Privacy Policy', subtitle: 'How we collect, use, and protect your personal data.' },
  terms: { title: 'Terms of Use', subtitle: 'Legal terms and conditions for using our website and services.' },
  cookies: { title: 'Cookie Settings', subtitle: 'Manage your cookie preferences and tracking options.' },
  fraud: { title: 'Fraud Awareness', subtitle: 'Learn how to protect yourself from shipping scams and phishing.' },
  'find-location': { title: 'Find a Location', subtitle: 'Locate a drop-off point or service center near you.' },
};

export async function generateStaticParams() {
  return Object.keys(defaultPageData).map((slug) => ({
    slug: slug,
  }));
}

export default async function GenericPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  // Try to load dynamic content from DB
  const dbContent = await prisma.siteContent.findUnique({
    where: { key: `page_${slug}` }
  });

  const dynamicData = dbContent ? JSON.parse(dbContent.value) : null;
  
  const data = dynamicData || defaultPageData[slug] || { 
    title: slug.replace(/-/g, ' '), 
    subtitle: 'Learn more about our services and global logistics operations.' 
  };

  return (
    <main className="generic-page animate-fade-in">
      <section className="generic-hero">
        <div className="container">
          <h1 className="generic-title" style={{ textTransform: 'capitalize' }}>{data.title}</h1>
          <p className="generic-subtitle">{data.subtitle}</p>
        </div>
      </section>
      
      <section className="generic-content container">
        <div className="content-grid">
          <div className="content-main">
            <div className="generic-card">
              <h2>Overview</h2>
              <div dangerouslySetInnerHTML={{ __html: data.content || `
                <p>
                  At Logistics Website, we are dedicated to providing the most reliable and efficient shipping solutions for individuals and businesses worldwide. 
                  Our team of logistics experts works around the clock to ensure your cargo arrives safely and on time, every time.
                </p>
                
                <div class="content-feature-list">
                  <div class="feature-item">
                    <div class="feature-icon">🌐</div>
                    <div class="feature-text">
                      <h3>Global Network</h3>
                      <p>Connected across 220 countries with over 5,000 service centers worldwide.</p>
                    </div>
                  </div>
                  <div class="feature-item">
                    <div class="feature-icon">🛡️</div>
                    <div class="feature-text">
                      <h3>Secure Handling</h3>
                      <p>Advanced security protocols and insurance coverage for all types of shipments.</p>
                    </div>
                  </div>
                  <div class="feature-item">
                    <div class="feature-icon">📱</div>
                    <div class="feature-text">
                      <h3>Real-time Visibility</h3>
                      <p>End-to-end tracking with millisecond-exact updates on your cargo position.</p>
                    </div>
                  </div>
                </div>

                <h3>Our Mission</h3>
                <p>
                  To simplify the world of logistics through innovation, transparency, and unyielding commitment to customer satisfaction. 
                  We believe that every shipment represents a promise, and we are here to keep it.
                </p>
              `}} />
            </div>
          </div>

          <aside className="content-sidebar">
            <div className="sidebar-widget">
              <h4>Quick Links</h4>
              <ul className="sidebar-links">
                <li><a href="/track">Track a Shipment</a></li>
                <li><a href="/quote">Get a Quote</a></li>
                <li><a href="/book">Book Now</a></li>
                <li><a href="/contact">Support Center</a></li>
              </ul>
            </div>
            <div className="sidebar-widget yellow">
              <h4>Need Help?</h4>
              <p>Our support team is available 24/7 to assist with your shipping needs.</p>
              <a href="tel:+1800LOGISTICS" className="btn btn-primary btn-full">Call Us Now</a>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
