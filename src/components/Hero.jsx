import React from 'react';
import FadeInUp from './FadeInUp';
import HeroBackground from './HeroBackground';
import { Star } from 'lucide-react';

export default function Hero() {
  return (
    <FadeInUp as="header" className="hero section" style={{ position: 'relative', overflow: 'hidden' }}>
      <HeroBackground />
      <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(255, 255, 255, 0.5)', zIndex: 1 }}></div>
      <div className="hero-content" style={{ position: 'relative', zIndex: 2 }}>
        <div className="badge">World-class Vitreo-Retinal Care</div>
        <h1 className="hero-title">
          Shaureen Advanced <br /> Eye Care <br />
          <span className="gradient-text">Nagpur's Leading</span> Vision Center
        </h1>
        <div className="hero-actions">
          <button className="primary-btn">
            Book Appointment
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </button>
          <div className="hero-avatars">
            <img src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=100" alt="Happy Patient" />
            <img src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=100" alt="Happy Patient" />
            <div className="avatar-count">+10k</div>
          </div>
          <div className="hero-rating">
            <div className="stars" style={{ display: 'flex', gap: '2px', color: '#FFD700' }}>
              <Star size={16} fill="currentColor" stroke="none" />
              <Star size={16} fill="currentColor" stroke="none" />
              <Star size={16} fill="currentColor" stroke="none" />
              <Star size={16} fill="currentColor" stroke="none" />
              <Star size={16} fill="currentColor" stroke="none" />
            </div>
            <p>4.9/5 (2k+ Happy Patients)</p>
          </div>
        </div>
      </div>
    </FadeInUp>
  );
}
