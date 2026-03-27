import '@/app/(site)/generic.css';
import prisma from "@/lib/prisma";

const defaultResourcesData: Record<string, { title: string; subtitle: string; icon: string }> = {
  customs: { 
    title: 'Customs Guide', 
    subtitle: 'Navigate international shipping regulations and customs clearance.',
    icon: '🛂',
  },
  packaging: { 
    title: 'Packaging Tips', 
    subtitle: 'Learn how to pack your shipments securely to avoid damage.',
    icon: '📦',
  },
  glossary: { 
    title: 'Shipping Glossary', 
    subtitle: 'Understand common logistics terms and acronyms.',
    icon: '📚',
  },
  api: { 
    title: 'API Documentation', 
    subtitle: 'Integrate our tracking, rates, and booking endpoints into your app.',
    icon: '💻',
  },
};

export default async function ResourcePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  const dbContent = await prisma.siteContent.findUnique({
    where: { key: `resource_${slug}` }
  });

  const dynamicData = dbContent ? JSON.parse(dbContent.value) : null;
  
  const data = dynamicData || defaultResourcesData[slug] || { 
    title: `${slug.replace(/-/g, ' ')}`, 
    subtitle: 'Logistics resources and guides.',
    icon: '📄',
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
          <h2>{data.contentTitle || 'Knowledge Center'}</h2>
          <div dangerouslySetInnerHTML={{ __html: data.content || '<p>This comprehensive guide is currently being updated by our logistics experts. Please check back later for the final published version.</p>' }} />
          <div className="generic-actions">
            <a href="/support" className="btn btn-primary">Contact Support</a>
            <a href="/" className="btn btn-outline">Back to Home</a>
          </div>
        </div>
      </section>
    </main>
  );
}
