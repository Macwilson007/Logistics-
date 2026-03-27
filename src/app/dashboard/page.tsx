'use client';

import './Dashboard.css';

const Package = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m7.5 4.27 9 5.15" /><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" /><path d="m3.3 7 8.7 5 8.7-5" /><path d="M12 22V12" />
  </svg>
);

const Receipt = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z" /><path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8" /><path d="M12 17.5v-11" />
  </svg>
);

const MapPin = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" />
  </svg>
);

const recentShipments = [
  { id: 'LG-2026-84729', status: 'In Transit', dest: 'London, UK', date: 'Mar 29, 2026', type: 'Express' },
  { id: 'LG-2026-84730', status: 'Delivered', dest: 'Paris, FR', date: 'Mar 20, 2026', type: 'Standard' },
  { id: 'LG-2026-84731', status: 'Pending', dest: 'New York, USA', date: 'Apr 02, 2026', type: 'Freight' },
];

export default function Dashboard() {
  return (
    <main className="dashboard-page container animate-fade-in">
      <div className="dashboard-header">
        <h1 className="dashboard-title">Welcome back, John</h1>
        <p className="dashboard-subtitle">Manage your shipments, quotes, and account settings.</p>
        <a href="/book" className="btn btn-primary dashboard-action">Create New Shipment</a>
      </div>

      <div className="dashboard-stats-grid">
        <div className="dash-stat-card">
          <div className="stat-icon yellow"><Package /></div>
          <div className="stat-info">
            <span className="stat-val">12</span>
            <span className="stat-label">Active Shipments</span>
          </div>
        </div>
        <div className="dash-stat-card">
          <div className="stat-icon red"><Receipt /></div>
          <div className="stat-info">
            <span className="stat-val">$1,450.00</span>
            <span className="stat-label">Current Balance</span>
          </div>
        </div>
        <div className="dash-stat-card">
          <div className="stat-icon gray"><MapPin /></div>
          <div className="stat-info">
            <span className="stat-val">3</span>
            <span className="stat-label">Saved Addresses</span>
          </div>
        </div>
      </div>

      <div className="dashboard-content-grid">
        <div className="dash-panel">
          <div className="panel-header">
            <h2 className="panel-title">Recent Shipments</h2>
            <a href="/track" className="panel-link">View All</a>
          </div>
          <div className="panel-body">
            <table className="dash-table">
              <thead>
                <tr>
                  <th>Tracking ID</th>
                  <th>Destination</th>
                  <th>Date / ETA</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {recentShipments.map(s => (
                  <tr key={s.id}>
                    <td className="monospace">{s.id}</td>
                    <td>{s.dest}</td>
                    <td>{s.date}</td>
                    <td>
                      <span className={`status-badge ${s.status.toLowerCase().replace(' ', '-')}`}>
                        {s.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="dash-panel">
          <div className="panel-header">
            <h2 className="panel-title">Your Profile</h2>
          </div>
          <div className="panel-body profile-body">
            <div className="profile-row">
              <span className="profile-label">Company</span>
              <span className="profile-val">Acme Corporation</span>
            </div>
            <div className="profile-row">
              <span className="profile-label">Email</span>
              <span className="profile-val">john@acmecorp.com</span>
            </div>
            <div className="profile-row">
              <span className="profile-label">Account Type</span>
              <span className="profile-val badge">Business Pro</span>
            </div>
            <button className="btn btn-outline" style={{ marginTop: 'var(--space-4)', width: '100%' }}>
              Edit Profile Settings
            </button>
            <a href="/" className="btn btn-yellow" style={{ marginTop: 'var(--space-2)', width: '100%', textAlign: 'center' }}>
              Sign Out
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
