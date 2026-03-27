'use client';

import { useState } from 'react';
import './QuotePage.css';

const ArrowRight = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12,5 19,12 12,19" />
  </svg>
);

const serviceTypes = [
  { value: 'express', label: 'Express (1-3 days)', multiplier: 3.5 },
  { value: 'standard', label: 'Standard (5-7 days)', multiplier: 1.8 },
  { value: 'economy', label: 'Economy (7-14 days)', multiplier: 1.0 },
  { value: 'freight', label: 'Freight (10-21 days)', multiplier: 0.6 },
];

const countries = [
  'Nigeria', 'United Kingdom', 'United States', 'Germany', 'China',
  'South Africa', 'Ghana', 'Canada', 'France', 'India', 'Japan',
  'Australia', 'Brazil', 'Kenya', 'Egypt', 'UAE',
];

export default function QuotePage() {
  const [form, setForm] = useState({
    origin: '',
    destination: '',
    weight: '',
    length: '',
    width: '',
    height: '',
    service: 'standard',
  });
  const [quote, setQuote] = useState<null | { price: number; service: string; eta: string }>(null);
  const [calculating, setCalculating] = useState(false);

  const handleChange = (field: string, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const calculateQuote = () => {
    const weight = parseFloat(form.weight) || 1;
    const length = parseFloat(form.length) || 10;
    const width = parseFloat(form.width) || 10;
    const height = parseFloat(form.height) || 10;
    const volumetric = (length * width * height) / 5000;
    const chargeableWeight = Math.max(weight, volumetric);
    const selectedService = serviceTypes.find(s => s.value === form.service)!;
    const baseRate = 12;
    const price = Math.round(chargeableWeight * baseRate * selectedService.multiplier * 100) / 100;

    setCalculating(true);
    setTimeout(() => {
      setQuote({
        price,
        service: selectedService.label,
        eta: selectedService.value === 'express' ? '1-3 business days' :
             selectedService.value === 'standard' ? '5-7 business days' :
             selectedService.value === 'economy' ? '7-14 business days' : '10-21 business days',
      });
      setCalculating(false);
    }, 1200);
  };

  return (
    <main className="quote-page" id="quote-page">
      <section className="quote-hero">
        <div className="container">
          <h1 className="quote-hero-title">Get an Instant Quote</h1>
          <p className="quote-hero-subtitle">
            Calculate shipping costs instantly. Enter your shipment details for an accurate estimate.
          </p>
        </div>
      </section>

      <section className="container quote-content">
        <div className="quote-layout">
          {/* Form */}
          <div className="quote-form-card" id="quote-form">
            <h2 className="quote-form-title">Shipment Details</h2>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Origin Country</label>
                <select className="form-select" value={form.origin} onChange={e => handleChange('origin', e.target.value)} id="quote-origin">
                  <option value="">Select origin...</option>
                  {countries.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Destination Country</label>
                <select className="form-select" value={form.destination} onChange={e => handleChange('destination', e.target.value)} id="quote-destination">
                  <option value="">Select destination...</option>
                  {countries.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Weight (kg)</label>
              <input type="number" className="form-input" placeholder="e.g. 5" value={form.weight} onChange={e => handleChange('weight', e.target.value)} id="quote-weight" />
            </div>

            <div className="form-row-3">
              <div className="form-group">
                <label className="form-label">Length (cm)</label>
                <input type="number" className="form-input" placeholder="30" value={form.length} onChange={e => handleChange('length', e.target.value)} id="quote-length" />
              </div>
              <div className="form-group">
                <label className="form-label">Width (cm)</label>
                <input type="number" className="form-input" placeholder="20" value={form.width} onChange={e => handleChange('width', e.target.value)} id="quote-width" />
              </div>
              <div className="form-group">
                <label className="form-label">Height (cm)</label>
                <input type="number" className="form-input" placeholder="15" value={form.height} onChange={e => handleChange('height', e.target.value)} id="quote-height" />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Service Type</label>
              <div className="service-options">
                {serviceTypes.map(s => (
                  <label key={s.value} className={`service-option ${form.service === s.value ? 'selected' : ''}`} id={`service-${s.value}`}>
                    <input type="radio" name="service" value={s.value} checked={form.service === s.value} onChange={e => handleChange('service', e.target.value)} />
                    <span className="service-option-label">{s.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <button className="btn btn-primary btn-lg quote-submit-btn" onClick={calculateQuote} id="calculate-quote-btn">
              {calculating ? 'Calculating...' : 'Calculate Quote'} {!calculating && <ArrowRight />}
            </button>
          </div>

          {/* Result */}
          <div className="quote-result-area">
            {quote ? (
              <div className="quote-result-card animate-fade-in-up" id="quote-result">
                <div className="quote-result-header">
                  <span className="quote-result-label">Estimated Cost</span>
                  <span className="quote-result-price">${quote.price.toLocaleString()}</span>
                  <span className="quote-result-currency">USD</span>
                </div>
                <div className="quote-result-details">
                  <div className="quote-detail-row">
                    <span>Service</span>
                    <strong>{quote.service}</strong>
                  </div>
                  <div className="quote-detail-row">
                    <span>Estimated Delivery</span>
                    <strong>{quote.eta}</strong>
                  </div>
                  <div className="quote-detail-row">
                    <span>Route</span>
                    <strong>{form.origin || 'Origin'} → {form.destination || 'Destination'}</strong>
                  </div>
                </div>
                <a href="/book" className="btn btn-yellow btn-lg quote-book-btn" id="proceed-to-book-btn">
                  Proceed to Book <ArrowRight />
                </a>
                <p className="quote-disclaimer">
                  * This is an estimate. Final price may vary based on actual weight and dimensions at pickup.
                </p>
              </div>
            ) : (
              <div className="quote-placeholder" id="quote-placeholder">
                <div className="quote-placeholder-icon">📦</div>
                <h3>Your Quote Will Appear Here</h3>
                <p>Fill in the shipment details and click &quot;Calculate Quote&quot; to get an instant price estimate.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
