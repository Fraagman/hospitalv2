import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import img1 from '../img/automated-visual-field-analyzer.png';
import img2 from '../img/autorefractor-keratometer.png';
import img3 from '../img/corneal-topographer.png';
import img4 from '../img/non-contact-tonometer.png';
import img5 from '../img/optical-biometer.png';
import img6 from '../img/optical-coherence-tomography-oct-machine.png';
import img7 from '../img/widefield-fundus-camera.png';

const equipments = [
  { id: 1, src: img1, label: 'Visual Field Analyzer', desc: 'Detailed peripheral vision testing' },
  { id: 2, src: img2, label: 'Autorefractor', desc: 'Automated exact prescription reading' },
  { id: 3, src: img3, label: 'Corneal Topographer', desc: '3D mapping of the cornea surface' },
  { id: 4, src: img4, label: 'Non-contact Tonometer', desc: 'Painless fluid pressure check' },
  { id: 5, src: img5, label: 'Optical Biometer', desc: 'Precise measurements for cataract' },
  { id: 6, src: img6, label: 'OCT Machine', desc: 'High-res retinal layer imaging' },
  { id: 7, src: img7, label: 'Fundus Camera', desc: 'Widefield retina photography' }
];

// Responsive size configs
const sizeConfigs = {
  mobile: { hexW: 55, hexH: 63, spacing: 60, left: '45%', width: '55%' },
  tablet: { hexW: 85, hexH: 98, spacing: 94, left: '40%', width: '60%' },
  desktop: { hexW: 110, hexH: 126, spacing: 115, left: '25%', width: '75%' }
};

function getConfig(width) {
  if (width <= 640) return sizeConfigs.mobile;
  if (width <= 1024) return sizeConfigs.tablet;
  return sizeConfigs.desktop;
}

function getPositions(spacing) {
  const hx = spacing * 0.87; // horizontal offset for hex grid
  return [
    { x: 0, y: 0 },
    { x: 0, y: -spacing },
    { x: hx, y: -spacing * 0.5 },
    { x: hx, y: spacing * 0.5 },
    { x: 0, y: spacing },
    { x: -hx, y: spacing * 0.5 },
    { x: -hx, y: -spacing * 0.5 }
  ];
}

export default function EquipmentCarousel() {
  const [hoveredId, setHoveredId] = useState(null);
  const [config, setConfig] = useState(() => getConfig(typeof window !== 'undefined' ? window.innerWidth : 1200));

  useEffect(() => {
    const handleResize = () => {
      setConfig(getConfig(window.innerWidth));
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const positions = getPositions(config.spacing);

  return (
    <div 
      className="honeycomb-wrapper"
      style={{
        position: 'absolute',
        top: 0,
        left: config.left,
        width: config.width,
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'visible'
      }}
    >
      <div style={{ position: 'relative', width: 0, height: 0 }}>
        {equipments.map((eq, index) => {
          const pos = positions[index];
          const isHovered = hoveredId === eq.id;
          
          return (
            <motion.div
              key={eq.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ 
                delay: index * 0.1, 
                type: 'spring', 
                stiffness: 260, 
                damping: 20 
              }}
              onMouseEnter={() => setHoveredId(eq.id)}
              onMouseLeave={() => setHoveredId(null)}
              style={{
                position: 'absolute',
                top: pos.y,
                left: pos.x,
                width: `${config.hexW}px`,
                height: `${config.hexH}px`,
                marginLeft: `${-config.hexW / 2}px`,
                marginTop: `${-config.hexH / 2}px`,
                clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                background: '#ffffff',
                boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                cursor: 'pointer',
                zIndex: isHovered ? 20 : 10
              }}
              whileHover={{ 
                scale: 1.15,
                zIndex: 20
              }}
            >
              <img 
                src={eq.src} 
                alt={eq.label} 
                style={{
                  width: '90%',
                  height: '90%',
                  objectFit: 'contain',
                  mixBlendMode: 'multiply',
                  pointerEvents: 'none',
                  opacity: isHovered ? 0.2 : 1,
                  transition: 'opacity 0.3s'
                }} 
              />

              <AnimatePresence>
                {isHovered && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                      background: 'rgba(37, 99, 235, 0.85)',
                      backdropFilter: 'blur(2px)',
                      color: 'white',
                      textAlign: 'center',
                      padding: '8px'
                    }}
                  >
                    <span style={{ fontSize: config.hexW <= 70 ? '8px' : '11px', fontWeight: 'bold', lineHeight: '1.1', marginBottom: '4px' }}>
                      {eq.label}
                    </span>
                    <span style={{ fontSize: config.hexW <= 70 ? '7px' : '9px', lineHeight: '1.2', opacity: 0.9 }}>
                      {eq.desc}
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
