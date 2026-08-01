import React from 'react';
import FadeInUp from './FadeInUp';

export default function Contact() {
  return (
    <FadeInUp as="section" className="contact-section section" style={{ paddingBottom: '100px' }}>
      <h2 style={{ fontSize: '48px', textAlign: 'center', fontWeight: '700', marginBottom: '20px', color: 'var(--text-primary)' }}>Contact Us</h2>
      <div className="contact-container" style={{display: 'flex', gap: '40px', padding: '0 5%', marginTop: '40px', position: 'relative', zIndex: 10, color: 'var(--text-primary)', alignItems: 'stretch'}}>
        <div className="contact-details" style={{flex: 1, display: 'flex', flexDirection: 'column', gap: '20px', background: 'white', padding: '40px', borderRadius: '24px', boxShadow: '0 10px 40px rgba(0,0,0,0.05)'}}>
          <h2 style={{ fontSize: '32px', marginBottom: '10px' }}>Aura Vision Center</h2>
          <p style={{ fontSize: '18px', lineHeight: '1.6', color: 'var(--text-secondary)' }}><strong style={{ color: 'var(--text-primary)' }}>Address:</strong><br/> 100 Health Sciences Plaza, Suite 400, Medical District</p>
          <p style={{ fontSize: '18px', lineHeight: '1.6', color: 'var(--text-secondary)' }}><strong style={{ color: 'var(--text-primary)' }}>Phone:</strong><br/> +1 (800) 555-0199</p>
          <p style={{ fontSize: '18px', lineHeight: '1.6', color: 'var(--text-secondary)' }}><strong style={{ color: 'var(--text-primary)' }}>Consultation Hours:</strong><br/> Mon - Sat: 9:00 AM - 7:00 PM</p>
        </div>
        <div className="contact-map" style={{flex: 1, borderRadius: '24px', overflow: 'hidden', boxShadow: '0 10px 40px rgba(0,0,0,0.05)'}}>
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.1422937950147!2d-73.98731968459391!3d40.75889497932681!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDQ1JzMyLjAiTiA3M8KwNTknMDYuNCJX!5e0!3m2!1sen!2sus!4v1650000000000!5m2!1sen!2sus" 
            width="100%" 
            height="100%" 
            style={{border: 0, minHeight: '100%'}} 
            allowFullScreen="" 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade">
          </iframe>
        </div>
      </div>
    </FadeInUp>
  );
}
