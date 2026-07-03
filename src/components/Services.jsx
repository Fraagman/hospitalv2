import React from 'react';
import { Link } from 'react-router-dom';
import Reveal from './Reveal';
import drImg from '../img/R-1.jpg';

export default function Services() {
  return (
    <section className="services-hub section">
      <div className="services-header">
        <Reveal direction="down">
          <h2 className="services-title">Services Hub:<br /> Discover Your Path to Success</h2>
        </Reveal>
        <Reveal direction="down" delay={100}>
          <p className="services-subtitle">From Consultations to Collaborations,<br /> We're Here to Elevate Your Journey</p>
        </Reveal>
      </div>

      <div className="services-grid">
        {/* Left Card */}
        <Reveal direction="right" delay={200} className="services-card green-theme cursor-pointer hover:scale-105 transition-transform duration-300">
          <Link to="/doctor/shamik" className="flex items-end justify-center w-full h-full">
            <div className="services-card-bg-wrapper">
               <img src={drImg} alt="Dr. Shamik Ambatkar" />
            </div>
            <div className="glass-panel">
              <div className="glass-top">
                 <span className="pill-badge">Chief Surgeon</span>
              </div>
              <div className="glass-middle">
                 <h3 className="card-doctor-name">Dr. Shamik Ambatkar</h3>
              </div>
            </div>
          </Link>
        </Reveal>

        {/* Right Card */}
        <Reveal direction="left" delay={300} className="services-card peach-theme cursor-pointer hover:scale-105 transition-transform duration-300">
          <Link to="/doctor/sonal" className="flex items-end justify-center w-full h-full">
            <div className="services-card-bg-wrapper">
               <img src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=800" alt="Dr. Sonal Shamik Ambatkar" />
            </div>
            <div className="glass-panel">
              <div className="glass-top">
                 <span className="pill-badge">Specialized Care</span>
              </div>
              <div className="glass-middle">
                 <h3 className="card-doctor-name">Dr. Sonal Ambatkar</h3>
              </div>
            </div>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
