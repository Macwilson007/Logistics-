'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { getShipmentStatus } from '@/app/actions/track';
import './TrackPage.css';

const CheckCircle = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22,4 12,14.01 9,11.01" />
  </svg>
);

const Clock = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><polyline points="12,6 12,12 16,14" />
  </svg>
);

const Package = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m7.5 4.27 9 5.15" /><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" /><path d="m3.3 7 8.7 5 8.7-5" /><path d="M12 22V12" />
  </svg>
);

const MapPin = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" />
  </svg>
);

const SearchIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
  </svg>
);

export default function TrackPage() {
  const searchParams = useSearchParams();
  const [trackingNumber, setTrackingNumber] = useState('');
  const [shipment, setShipment] = useState<any>(null);
  const [error, setError] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    const id = searchParams.get('id');
    if (id) {
      setTrackingNumber(id);
      handleTrack(id);
    }
  }, [searchParams]);

  const handleTrack = async (idOrEvent?: string | React.MouseEvent | React.KeyboardEvent) => {
    const id = typeof idOrEvent === 'string' ? idOrEvent : trackingNumber;
    if (!id || (typeof id === 'string' && !id.trim())) return;
    
    setIsSearching(true);
    setError('');
    
    try {
      const data = await getShipmentStatus(id);
      if (data) {
        setShipment(data);
      } else {
        setError('No shipment found with that tracking number.');
        setShipment(null);
      }
    } catch (err) {
      setError('An error occurred during tracking. Please try again.');
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <main className="track-page" id="track-page">
      <section className="track-hero">
        <div className="container">
          <h1 className="track-hero-title">Track Your Shipment</h1>
          <p className="track-hero-subtitle">
            Enter your tracking number to get real-time updates on your shipment status.
          </p>

          <div className="track-search-box" id="track-search-box">
            <div className="track-input-wrapper">
              <SearchIcon />
              <input
                type="text"
                className="track-input"
                placeholder="Enter tracking number (e.g. LG-2026-84729)"
                value={trackingNumber}
                onChange={e => setTrackingNumber(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleTrack()}
                id="track-input"
              />
            </div>
            <button className="btn btn-primary btn-lg" onClick={() => handleTrack()} id="track-submit-btn">
              {isSearching ? 'Tracking...' : 'Track'}
            </button>
          </div>
          {error && <p style={{ color: '#FFCC00', marginTop: '1rem', fontWeight: 600 }}>{error}</p>}
        </div>
      </section>

      {shipment && (
        <section className="track-results-container container animate-fade-in-up" id="track-results">
          <div className="track-result-card animate-fade-in">
            <div className="track-result-header">
              <div className="track-id">
                <span className="label">Shipment Number:</span>
                <span className="value">{shipment.trackingNumber}</span>
              </div>
              <div className={`track-status-badge ${shipment.status.toLowerCase().replace('_', '-')}`}>
                <Clock /> {shipment.status.replace(/_/g, ' ')}
              </div>
            </div>

            <div className="track-summary-info">
              <div className="summary-item">
                <span className="label">Origin / Destination:</span>
                <span className="value">{shipment.senderCity}, {shipment.senderCountry} → {shipment.receiverCity}, {shipment.receiverCountry}</span>
              </div>
              <div className="summary-item">
                <span className="label">Weight / Service:</span>
                <span className="value">{shipment.weight} kg — {shipment.serviceType}</span>
              </div>
              <div className="summary-item">
                <span className="label">Sender / Receiver:</span>
                <span className="value">{shipment.senderName} → {shipment.receiverName}</span>
              </div>
            </div>

            <div className="track-timeline">
              <h3 className="timeline-title-main"><Package /> Shipment History</h3>
              
              <div className="timeline-box">
                {shipment.updates.length === 0 ? (
                  <div className="timeline-item-new pending">
                    <div className="timeline-marker">
                      <div className="marker-dot pending"></div>
                    </div>
                    <div className="timeline-text">
                      <div className="status-row">
                        <span className="status-name">Shipment Logged</span>
                        <span className="status-time">{new Date(shipment.createdAt).toLocaleDateString()}</span>
                      </div>
                      <div className="detail-row">Shipment tracking number created. Awaiting pickup.</div>
                    </div>
                  </div>
                ) : (
                  shipment.updates.map((update: any, i: number) => (
                    <div key={update.id} className="timeline-item-new completed">
                      <div className="timeline-marker">
                        <div className="marker-dot completed">
                          <CheckCircle />
                        </div>
                        {i < shipment.updates.length - 1 && <div className="marker-line" />}
                      </div>
                      <div className="timeline-text">
                        <div className="status-row">
                          <span className="status-name">{update.status}</span>
                          <span className="status-time">{new Date(update.timestamp).toLocaleString()}</span>
                        </div>
                        <div className="location-row"><MapPin /> {update.location}</div>
                        <div className="detail-row">{update.detail}</div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
