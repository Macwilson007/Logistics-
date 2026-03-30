import '@/app/(site)/generic.css';
import prisma from "@/lib/prisma";

const defaultServicesData: Record<string, { title: string; subtitle: string; icon: string; desc: string }> = {
  express: { 
    title: 'Express Services', 
    subtitle: 'Time-critical international delivery with guaranteed speed.', 
    icon: '✈️',
    desc: 'Our Express shipping solutions provide end-to-end tracking, customs clearance, and next-day delivery options across 220 countries and territories.'
  },
  freight: { 
    title: 'Freight Transportation', 
    subtitle: 'Air, Ocean, and Road freight for heavy, bulky, or bulk goods.', 
    icon: '🚢',
    desc: 'Cost-effective logistics for B2B trade. From LCL (Less-than-Container Load) to full charters, our global network moves your large shipments securely.'
  },
  'supply-chain': { 
    title: 'Supply Chain Solutions', 
    subtitle: 'Warehousing, distribution, and strategic supply chain management.', 
    icon: '🏭',
    desc: 'End-to-end supply chain optimization. We handle inventory management, order fulfillment, and reverse logistics so you can focus on growth.'
  },
  ecommerce: { 
    title: 'eCommerce Solutions', 
    subtitle: 'Tailored shipping and return solutions for online retailers.', 
    icon: '🛒',
    desc: 'Connect your store using our APIs and offer your customers fast, reliable shipping with easy-to-print return labels and localized delivery options.'
  },
  post: { 
    title: 'Postal Services', 
    subtitle: 'International mail and B2C lightweight package delivery.', 
    icon: '📬',
    desc: 'Ideal for sending catalogues, lightweight goods, and international business mail with cost-effective postal network rates.'
  },
};

export async function generateStaticParams() {
  return Object.keys(defaultServicesData).map((serviceId) => ({
    serviceId: serviceId,
  }));
}

export default async function ServicePage({ params }: { params: Promise<{ serviceId: string }> }) {
  const { serviceId } = await params;
  
  const dbContent = await prisma.siteContent.findUnique({
    where: { key: `service_${serviceId}` }
  });

  const dynamicData = dbContent ? JSON.parse(dbContent.value) : null;
  
  const data = dynamicData || defaultServicesData[serviceId] || { 
    title: `${serviceId.replace(/-/g, ' ')}`, 
    subtitle: 'Explore our tailored logistics solutions.',
    icon: '📦',
    desc: 'We are currently preparing detailed documentation for this specific service. Stay tuned.'
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
        <div className="generic-card">
          <div className="generic-icon">{data.icon}</div>
          <h2>Specialized Logistics</h2>
          <p>{data.desc}</p>
          <div className="generic-actions">
            <a href="/quote" className="btn btn-primary">Get a Quote</a>
            <a href="/contact" className="btn btn-outline">Contact Sales</a>
          </div>
        </div>
      </section>
    </main>
  );
}
