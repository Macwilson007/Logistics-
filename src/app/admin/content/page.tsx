import CMSForm from "./CMSForm";
import prisma from "@/lib/prisma";

export default async function CMSManager() {
  const content = await prisma.siteContent.findMany({
    orderBy: { key: "asc" },
  });

  // Default content for fallback if database is empty
  const defaultItems = [
    { key: 'hero_title', type: 'text', label: 'Home Page Hero Title', value: 'Global Shipping & Logistics Solutions' },
    { key: 'hero_subtitle', type: 'text', label: 'Home Page Hero Subtitle', value: 'Fast, secure, and reliable shipping for businesses and individuals worldwide.' },
    { key: 'main_accent_color', type: 'color', label: 'Brand Primary Color', value: '#D40511' },
    { key: 'contact_email', type: 'text', label: 'Support Email', value: 'support@logistics.com' },
    { key: 'contact_phone', type: 'text', label: 'Support Phone', value: '+234 800 LOGISTICS' },
    { key: 'footer_about', type: 'textarea', label: 'Footer About Text', value: 'Logistics Website is a global leader in shipping and logistics, providing innovative solutions to help businesses connect with the world.' }
  ];

  // Merge database items with defaults (only using key/value for the form)
  // Converting DB records to a format suitable for the CMSForm
  const itemsForForm = defaultItems.map(defItem => {
    const dbItem = content.find(c => c.key === defItem.key);
    return {
      ...defItem,
      value: dbItem?.value || defItem.value,
    };
  });

  return (
    <div style={{ maxWidth: '800px' }} className="animate-fade-in-up">
      <div className="admin-card">
        <h2 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '24px' }}>Global Site Content</h2>
        <p style={{ color: '#666', marginBottom: '32px', fontSize: '0.9rem' }}>
          Update your site's branding, hero messages, and global contact information directly from this dashboard.
        </p>
        <CMSForm initialItems={itemsForForm} />
      </div>
    </div>
  );
}
