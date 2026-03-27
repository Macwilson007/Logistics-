'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import './Admin.css';

const HomeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>
);

const ShipIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="3" width="20" height="14" rx="2" ry="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" /></svg>
);

const ContentIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>
);

const UserIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
);

const LogoutIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 01-2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" /></svg>
);

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { data: session } = useSession();

  const handleLogout = (e: React.MouseEvent) => {
    e.preventDefault();
    signOut({ callbackUrl: '/' });
  };

  return (
    <div className="admin-container">
      <aside className="admin-sidebar">
        <div className="admin-logo">
          <Link href="/">
            <span className="logo-text">LOGISTICS <span className="logo-subtext">ADMIN</span></span>
          </Link>
        </div>
        
        <nav className="admin-nav">
          <Link href="/admin" className={`admin-nav-item ${pathname === '/admin' ? 'active' : ''}`}>
            <HomeIcon /> Dashboard
          </Link>
          <Link href="/admin/shipments" className={`admin-nav-item ${pathname.includes('/shipments') ? 'active' : ''}`}>
            <ShipIcon /> Shipments
          </Link>
          <Link href="/admin/content" className={`admin-nav-item ${pathname.includes('/content') ? 'active' : ''}`}>
            <ContentIcon /> CMS Content
          </Link>
          <Link href="/admin/users" className={`admin-nav-item ${pathname.includes('/users') ? 'active' : ''}`}>
            <UserIcon /> User Accounts
          </Link>
        </nav>

        <div className="admin-footer">
          <button onClick={handleLogout} className="admin-nav-item logout" style={{ background: 'none', border: 'none', width: '100%', cursor: 'pointer' }}>
            <LogoutIcon /> Exit Admin
          </button>
        </div>
      </aside>

      <main className="admin-content">
        <header className="admin-header">
          <div className="admin-header-title">
            <nav className="admin-breadcrumbs">
              <Link href="/admin">Admin</Link>
              {pathname !== '/admin' && (
                <>
                  <span className="breadcrumb-sep">/</span>
                  <span className="breadcrumb-current">
                    {pathname.includes('/shipments') ? 'Shipments' :
                     pathname.includes('/content') ? 'CMS' :
                     pathname.includes('/users') ? 'Users' : 'Page'}
                  </span>
                </>
              )}
            </nav>
            <div className="admin-page-title">
              {pathname === '/admin' ? 'Overview' : 
               pathname.includes('/shipments') ? 'Manage Shipments' :
               pathname.includes('/content') ? 'Site Content Manager' :
               pathname.includes('/users') ? 'User Management' : 'Admin'}
            </div>
          </div>
          <div className="admin-header-profile">
            <span className="admin-name">{session?.user?.name || 'Admin User'}</span>
            <div className="admin-avatar">{session?.user?.name?.[0] || 'A'}</div>
          </div>
        </header>
        <div className="admin-body">
          {children}
        </div>
      </main>
    </div>
  );
}
