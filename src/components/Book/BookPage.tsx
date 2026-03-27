'use client';

import { useState } from 'react';
import './BookPage.css';

const CheckIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20,6 9,17 4,12" />
  </svg>
);

const ArrowRight = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12,5 19,12 12,19" />
  </svg>
);

const ArrowLeft = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12,19 5,12 12,5" />
  </svg>
);

const steps = ['Sender Details', 'Receiver Details', 'Package Info', 'Review & Confirm'];

const countries = [
  'Nigeria', 'United Kingdom', 'United States', 'Germany', 'China',
  'South Africa', 'Ghana', 'Canada', 'France', 'India', 'Japan',
  'Australia', 'Brazil', 'Kenya', 'Egypt', 'UAE',
];

export default function BookPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    senderName: '', senderEmail: '', senderPhone: '', senderAddress: '', senderCity: '', senderCountry: '',
    receiverName: '', receiverEmail: '', receiverPhone: '', receiverAddress: '', receiverCity: '', receiverCountry: '',
    packageDesc: '', weight: '', length: '', width: '', height: '', service: 'standard',
    pickupDate: '', specialInstructions: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const next = () => setCurrentStep(prev => Math.min(prev + 1, steps.length - 1));
  const prev = () => setCurrentStep(prev => Math.max(prev - 1, 0));

  const submit = () => {
    setSubmitted(true);
  };

  return (
    <main className="book-page" id="book-page">
      <section className="book-hero">
        <div className="container">
          <h1 className="book-hero-title">Book a Shipment</h1>
          <p className="book-hero-subtitle">
            Schedule your pickup in minutes. Complete the steps below to place your order.
          </p>
        </div>
      </section>

      <section className="container book-content">
        {submitted ? (
          <div className="book-success animate-fade-in-up" id="booking-success">
            <div className="book-success-icon">✅</div>
            <h2>Booking Confirmed!</h2>
            <p>Your shipment has been scheduled. You will receive a confirmation email with tracking details shortly.</p>
            <div className="book-success-ref">
              <span>Reference Number</span>
              <strong>LG-2026-{Math.floor(10000 + Math.random() * 90000)}</strong>
            </div>
            <div className="book-success-actions">
              <a href="/track" className="btn btn-primary btn-lg">Track Your Shipment</a>
              <a href="/" className="btn btn-outline btn-lg">Back to Home</a>
            </div>
          </div>
        ) : (
          <>
            {/* Progress Steps */}
            <div className="book-stepper" id="booking-stepper">
              {steps.map((step, i) => (
                <div key={step} className={`stepper-item ${i < currentStep ? 'completed' : ''} ${i === currentStep ? 'active' : ''}`}>
                  <div className="stepper-dot">
                    {i < currentStep ? <CheckIcon /> : <span>{i + 1}</span>}
                  </div>
                  <span className="stepper-label">{step}</span>
                  {i < steps.length - 1 && <div className={`stepper-line ${i < currentStep ? 'completed' : ''}`} />}
                </div>
              ))}
            </div>

            {/* Step Forms */}
            <div className="book-form-card animate-fade-in" id="booking-form">
              {/* Step 1: Sender */}
              {currentStep === 0 && (
                <div className="step-content">
                  <h2 className="step-title">Sender Information</h2>
                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">Full Name *</label>
                      <input className="form-input" type="text" placeholder="John Doe" value={formData.senderName} onChange={e => handleChange('senderName', e.target.value)} id="sender-name" />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Email *</label>
                      <input className="form-input" type="email" placeholder="john@company.com" value={formData.senderEmail} onChange={e => handleChange('senderEmail', e.target.value)} id="sender-email" />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">Phone Number *</label>
                      <input className="form-input" type="tel" placeholder="+234 800 000 0000" value={formData.senderPhone} onChange={e => handleChange('senderPhone', e.target.value)} id="sender-phone" />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Country *</label>
                      <select className="form-select" value={formData.senderCountry} onChange={e => handleChange('senderCountry', e.target.value)} id="sender-country">
                        <option value="">Select country...</option>
                        {countries.map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">City *</label>
                      <input className="form-input" type="text" placeholder="Lagos" value={formData.senderCity} onChange={e => handleChange('senderCity', e.target.value)} id="sender-city" />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Address *</label>
                      <input className="form-input" type="text" placeholder="123 Victoria Island" value={formData.senderAddress} onChange={e => handleChange('senderAddress', e.target.value)} id="sender-address" />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Receiver */}
              {currentStep === 1 && (
                <div className="step-content">
                  <h2 className="step-title">Receiver Information</h2>
                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">Full Name *</label>
                      <input className="form-input" type="text" placeholder="Jane Smith" value={formData.receiverName} onChange={e => handleChange('receiverName', e.target.value)} id="receiver-name" />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Email *</label>
                      <input className="form-input" type="email" placeholder="jane@example.com" value={formData.receiverEmail} onChange={e => handleChange('receiverEmail', e.target.value)} id="receiver-email" />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">Phone Number *</label>
                      <input className="form-input" type="tel" placeholder="+44 20 0000 0000" value={formData.receiverPhone} onChange={e => handleChange('receiverPhone', e.target.value)} id="receiver-phone" />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Country *</label>
                      <select className="form-select" value={formData.receiverCountry} onChange={e => handleChange('receiverCountry', e.target.value)} id="receiver-country">
                        <option value="">Select country...</option>
                        {countries.map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">City *</label>
                      <input className="form-input" type="text" placeholder="London" value={formData.receiverCity} onChange={e => handleChange('receiverCity', e.target.value)} id="receiver-city" />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Address *</label>
                      <input className="form-input" type="text" placeholder="45 Oxford Street" value={formData.receiverAddress} onChange={e => handleChange('receiverAddress', e.target.value)} id="receiver-address" />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Package */}
              {currentStep === 2 && (
                <div className="step-content">
                  <h2 className="step-title">Package Information</h2>
                  <div className="form-group">
                    <label className="form-label">Package Description *</label>
                    <input className="form-input" type="text" placeholder="e.g. Electronics, Documents, Clothing" value={formData.packageDesc} onChange={e => handleChange('packageDesc', e.target.value)} id="package-desc" />
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">Weight (kg) *</label>
                      <input className="form-input" type="number" placeholder="5" value={formData.weight} onChange={e => handleChange('weight', e.target.value)} id="package-weight" />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Pickup Date *</label>
                      <input className="form-input" type="date" value={formData.pickupDate} onChange={e => handleChange('pickupDate', e.target.value)} id="pickup-date" />
                    </div>
                  </div>
                  <div className="form-row-3">
                    <div className="form-group">
                      <label className="form-label">Length (cm)</label>
                      <input className="form-input" type="number" placeholder="30" value={formData.length} onChange={e => handleChange('length', e.target.value)} id="package-length" />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Width (cm)</label>
                      <input className="form-input" type="number" placeholder="20" value={formData.width} onChange={e => handleChange('width', e.target.value)} id="package-width" />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Height (cm)</label>
                      <input className="form-input" type="number" placeholder="15" value={formData.height} onChange={e => handleChange('height', e.target.value)} id="package-height" />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Special Instructions</label>
                    <textarea className="form-textarea" rows={3} placeholder="Fragile, handle with care..." value={formData.specialInstructions} onChange={e => handleChange('specialInstructions', e.target.value)} id="special-instructions" />
                  </div>
                </div>
              )}

              {/* Step 4: Review */}
              {currentStep === 3 && (
                <div className="step-content">
                  <h2 className="step-title">Review Your Booking</h2>
                  <div className="review-grid">
                    <div className="review-section">
                      <h3 className="review-section-title">Sender</h3>
                      <div className="review-item"><span>Name</span><strong>{formData.senderName || '—'}</strong></div>
                      <div className="review-item"><span>Email</span><strong>{formData.senderEmail || '—'}</strong></div>
                      <div className="review-item"><span>Phone</span><strong>{formData.senderPhone || '—'}</strong></div>
                      <div className="review-item"><span>Location</span><strong>{formData.senderCity}, {formData.senderCountry}</strong></div>
                    </div>
                    <div className="review-section">
                      <h3 className="review-section-title">Receiver</h3>
                      <div className="review-item"><span>Name</span><strong>{formData.receiverName || '—'}</strong></div>
                      <div className="review-item"><span>Email</span><strong>{formData.receiverEmail || '—'}</strong></div>
                      <div className="review-item"><span>Phone</span><strong>{formData.receiverPhone || '—'}</strong></div>
                      <div className="review-item"><span>Location</span><strong>{formData.receiverCity}, {formData.receiverCountry}</strong></div>
                    </div>
                    <div className="review-section full-width">
                      <h3 className="review-section-title">Package Details</h3>
                      <div className="review-item"><span>Description</span><strong>{formData.packageDesc || '—'}</strong></div>
                      <div className="review-item"><span>Weight</span><strong>{formData.weight ? `${formData.weight} kg` : '—'}</strong></div>
                      <div className="review-item"><span>Dimensions</span><strong>{formData.length && formData.width && formData.height ? `${formData.length} × ${formData.width} × ${formData.height} cm` : '—'}</strong></div>
                      <div className="review-item"><span>Pickup Date</span><strong>{formData.pickupDate || '—'}</strong></div>
                      {formData.specialInstructions && (
                        <div className="review-item"><span>Instructions</span><strong>{formData.specialInstructions}</strong></div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation */}
              <div className="step-nav">
                {currentStep > 0 && (
                  <button className="btn btn-outline btn-lg" onClick={prev} id="step-prev-btn">
                    <ArrowLeft /> Previous
                  </button>
                )}
                <div className="step-nav-spacer" />
                {currentStep < steps.length - 1 ? (
                  <button className="btn btn-primary btn-lg" onClick={next} id="step-next-btn">
                    Next Step <ArrowRight />
                  </button>
                ) : (
                  <button className="btn btn-yellow btn-lg" onClick={submit} id="step-submit-btn">
                    Confirm Booking <CheckIcon />
                  </button>
                )}
              </div>
            </div>
          </>
        )}
      </section>
    </main>
  );
}
