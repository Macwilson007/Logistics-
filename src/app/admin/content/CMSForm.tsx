'use client';

import { useState } from 'react';
import { batchUpdateSiteContent } from '@/app/actions/cms';
import { useRouter } from 'next/navigation';

export default function CMSForm({ initialItems }: { initialItems: any[] }) {
  const [items, setItems] = useState(initialItems);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });
  const router = useRouter();

  const handleUpdate = (key: string, newValue: string) => {
    setItems(prev => prev.map(item => item.key === key ? { ...item, value: newValue } : item));
    if (message.text) setMessage({ text: '', type: '' });
  };

  const handleSave = async () => {
    setIsSaving(true);
    setMessage({ text: 'Saving changes...', type: 'info' });

    try {
      const updates = items.map(item => ({ key: item.key, value: item.value }));
      const result = await batchUpdateSiteContent(updates);
      
      if (result.success) {
        setMessage({ text: 'Site updated successfully!', type: 'success' });
        router.refresh(); // Refresh page content and server components
      } else {
        setMessage({ text: 'Failed to update site content.', type: 'error' });
      }
    } catch (err) {
      setMessage({ text: 'An unexpected error occurred.', type: 'error' });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {message.text && (
        <div style={{ 
          padding: '12px 16px', 
          borderRadius: '8px', 
          fontSize: '0.9rem', 
          fontWeight: 600,
          backgroundColor: message.type === 'success' ? '#ECFDF5' : message.type === 'error' ? '#FEF2F2' : '#EFF6FF',
          color: message.type === 'success' ? '#065F46' : message.type === 'error' ? '#991B1B' : '#1E40AF',
          border: `1px solid ${message.type === 'success' ? '#A7F3D0' : message.type === 'error' ? '#FECACA' : '#BFDBFE'}`,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          {message.text}
          <button onClick={() => setMessage({ text: '', type: '' })} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1rem', color: 'inherit' }}>&times;</button>
        </div>
      )}

      {items.map((item, i) => (
        <div key={item.key} className="cms-field" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#666' }}>{item.label}</label>
          {item.type === 'textarea' ? (
            <textarea 
              value={item.value} 
              onChange={(e) => handleUpdate(item.key, e.target.value)}
              style={{ padding: '12px', borderRadius: '8px', border: '1px solid #ddd', minHeight: '100px', width: '100%', fontSize: '0.9rem' }}
              disabled={isSaving}
            />
          ) : item.type === 'color' ? (
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <input 
                type="color" 
                value={item.value} 
                onChange={(e) => handleUpdate(item.key, e.target.value)}
                style={{ width: '50px', height: '40px', border: 'none', background: 'none', cursor: 'pointer' }}
                disabled={isSaving}
              />
              <input 
                type="text" 
                value={item.value}
                onChange={(e) => handleUpdate(item.key, e.target.value)}
                style={{ padding: '8px 12px', borderRadius: '8px', border: '1px solid #ddd', width: '120px' }}
                disabled={isSaving}
              />
            </div>
          ) : (
            <input 
              type="text" 
              value={item.value} 
              onChange={(e) => handleUpdate(item.key, e.target.value)}
              style={{ padding: '12px', borderRadius: '8px', border: '1px solid #ddd', width: '100%', fontSize: '0.9rem' }}
              disabled={isSaving}
            />
          )}
        </div>
      ))}
      <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'flex-end' }}>
        <button 
          className="btn-admin-action" 
          style={{ 
            background: isSaving ? '#eee' : '#FFCC00', 
            color: '#111', 
            fontWeight: 700, 
            padding: '12px 32px',
            opacity: isSaving ? 0.7 : 1,
            cursor: isSaving ? 'not-allowed' : 'pointer'
          }}
          onClick={handleSave}
          disabled={isSaving}
        >
          {isSaving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    </div>
  );
}
