import React, { useState } from 'react';

export default function Footer() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      alert(`Thank you for subscribing with ${email}!`);
      setEmail('');
    }
  };

  return (
    <footer className="site-footer" id="site-footer">
      {/* Watermark */}
      <span className="footer-watermark" aria-hidden="true">Aura Vision</span>

      <div className="footer-main">
        {/* Column 1 - Quick Links */}
        <div className="footer-col">
          <h4 className="footer-col-title">Why Us?</h4>
          <ul className="footer-link-list">
            <li><a href="#why-us">Advanced Equipments</a></li>
            <li><a href="#why-us">World-class Medical Care</a></li>
            <li><a href="#case-studies">Patient Success Stories</a></li>
          </ul>
        </div>

        {/* Column 2 - Services */}
        <div className="footer-col">
          <h4 className="footer-col-title">Patient Care</h4>
          <ul className="footer-link-list">
            <li><a href="#contact">Book Appointment</a></li>
            <li><a href="#services">Eye Exam &amp; Diagnosis</a></li>
            <li><a href="#services">Surgeries</a></li>
          </ul>
        </div>

        {/* Column 3 - Find Us */}
        <div className="footer-col footer-col-map">
          <h4 className="footer-col-title">Find Us</h4>
          <div className="footer-map-wrapper">
            <iframe
              title="Aura Vision Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.1422937950147!2d-73.98731968459391!3d40.75889497932681!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDQ1JzMyLjAiTiA3M8KwNTknMDYuNCJX!5e0!3m2!1sen!2sus!4v1650000000000!5m2!1sen!2sus"
              width="100%"
              height="160"
              style={{ border: 0, borderRadius: '12px', display: 'block' }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <div className="footer-contact-details">
            <p>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
              <span>100 Health Sciences Plaza, Suite 400, Medical District</span>
            </p>
            <p>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              <span>+1 (800) 555-0199</span>
            </p>
            <p>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              <span>Mon – Sat: 9:00 AM – 7:00 PM</span>
            </p>
          </div>
        </div>

        {/* Column 4 - Newsletter */}
        <div className="footer-col footer-col-newsletter">
          <h4 className="footer-col-title">Stay Updated</h4>
          <p className="footer-newsletter-desc">
            Join our newsletter for eye care tips and clinic updates.
          </p>
          <form className="footer-newsletter-form" onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Enter your email"
              className="footer-email-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              id="footer-email-input"
            />
            <button type="submit" className="footer-subscribe-btn" id="footer-subscribe-btn">
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom-bar">
        <p className="footer-copyright">&copy; 2026, Aura Vision Center. All rights reserved.</p>
        <div className="footer-bottom-right">
          <div className="footer-policy-links">
            <a href="#">Privacy</a>
            <span className="footer-divider">|</span>
            <a href="#">Terms</a>
          </div>
          <div className="footer-social-icons">
            {/* Facebook */}
            <a href="#" aria-label="Facebook" className="footer-social-link">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
            </a>
            {/* Instagram */}
            <a href="#" aria-label="Instagram" className="footer-social-link">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
            </a>
            {/* YouTube */}
            <a href="#" aria-label="YouTube" className="footer-social-link">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
