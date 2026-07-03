import React from 'react';
import Reveal from './Reveal';
import EquipmentCarousel from './EquipmentCarousel';
import { Eye, Stethoscope, Microscope, Hospital } from 'lucide-react';

export default function WhyUs() {
  return (
    <section className="why-us section">
      {/* Mobile Title (visible only on <=1024px) */}
      <Reveal direction="down" delay={50} className="mobile-only-title">
        <h2 className="bento-main-title">Why Us?</h2>
      </Reveal>

      <div className="bento-container">
        {/* Left Column */}
        <div className="bento-left">
          {/* Experts Card */}
          <Reveal direction="right" delay={100} className="bento-card bento-experts">
            <div className="experts-content" style={{ position: 'relative', zIndex: 10, pointerEvents: 'none' }}>
              <h2>15+</h2>
              <p>Advanced<br/>Equipments</p>
              <div className="plus-btn" style={{ pointerEvents: 'auto' }}>+</div>
            </div>
            <div className="experts-carousel-container" style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 1 }}>
              <EquipmentCarousel />
            </div>
          </Reveal>

          <div className="bento-left-bottom">
            {/* Success Card */}
            <Reveal direction="up" delay={200} className="bento-card bento-success">
              <div className="success-content">
                <h2>99%</h2>
                <p>Success Rate<br/>for Surgeries</p>
              </div>
            </Reveal>

            {/* Consult Card */}
            <Reveal direction="up" delay={300} className="bento-card bento-consult">
              <div className="consult-content">
                <span className="hashtag">#care</span>
                <div className="consult-icons">
                  <div className="c-icon"><Eye size={20} /></div>
                  <div className="c-icon active"><Stethoscope size={20} /></div>
                  <div className="c-icon"><Microscope size={20} /></div>
                </div>
                <h3>Detailed Eye<br/>Exam & Diagnosis</h3>
                <div className="dots">
                  <span></span><span className="active"></span><span></span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Right Column */}
        <div className="bento-right">
          <div className="bento-right-top">
            {/* Person Card */}
            <Reveal direction="down" delay={150} className="bento-card bento-person">
              <img src="https://images.unsplash.com/photo-1581595220892-b0739db3ba8c?auto=format&fit=crop&q=80&w=400" alt="Happy Patient" />
              <div className="person-label">Happy Patients</div>
            </Reveal>

            <div className="bento-right-top-right">
              {/* Title */}
              <Reveal direction="down" delay={50}>
                <h2 className="bento-main-title">Why Us?</h2>
              </Reveal>
              
              <Reveal direction="left" delay={250} className="bento-materials-row">
                {/* Materials Card */}
                <div className="bento-card bento-materials">
                  <h2>20k+</h2>
                  <p>Satisfied<br/>Customers</p>
                </div>
                
                {/* Play Button */}
                <div className="bento-play-wrapper">
                  <button className="bento-play-btn">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                  </button>
                  <svg className="play-text" viewBox="0 0 100 100">
                    <path id="curve" d="M 50, 50 m -35, 0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0" fill="transparent"/>
                    <text><textPath href="#curve" startOffset="0">explore treatments • explore treatments • </textPath></text>
                  </svg>
                </div>
              </Reveal>
            </div>
          </div>

          {/* Features Card */}
          <Reveal direction="up" delay={400} className="bento-card bento-features">
            <div className="features-content">
              <div className="features-tags">
                <span className="f-tag"><Microscope size={16} /></span>
                <span className="f-tag"><Hospital size={16} /></span>
              </div>
              <p className="f-subtitle">World-class Medical Care</p>
              <h3>Advanced Diagnostics<br/>& Precision Care</h3>
            </div>
            <div className="features-mockup">
              <img src="https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=400" alt="Eye Care Diagnostics" style={{ height: '100%', objectFit: 'cover' }} />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
