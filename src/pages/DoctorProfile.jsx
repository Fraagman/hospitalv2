import React, { useEffect, useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft, ChevronDown, Phone, MapPin, Award,
  GraduationCap, Eye, BookOpen,
  Building2, Zap, Globe, Calendar, Briefcase,
  FileText, Mic, Shield, ArrowUpRight,
  Droplets, Scan, SunMedium, FlameKindling, Activity,
  Microscope, HeartPulse, Glasses, Bug, Flame,
} from 'lucide-react';
import { doctors } from '../data/doctors';
import drImg from '../img/R-1.jpg';
import WaveSeparator, { DiagonalSlash, SeismicEdge, DotDissolve } from '../components/WaveSeparator';

const C = {
  moon: '#f3f6ff', herb: '#cef26d', harbor: '#3770bf',
  ice: '#8dc2ff', dark: '#1A1A1A', muted: '#6b7280',
};

/* ── Accordion ── */
function Accordion({ title, icon, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="dp2-accordion">
      <button className="dp2-accordion-btn" onClick={() => setOpen(!open)}>
        <span className="dp2-acc-icon">{icon}</span>
        <span className="dp2-acc-label">{title}</span>
        <ChevronDown size={18} className={`dp2-acc-chevron ${open ? 'dp2-acc-open' : ''}`} />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} style={{ overflow: 'hidden' }}>
            <div className="dp2-acc-body">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ── Marquee ── */
function Marquee({ items }) {
  const doubled = [...items, ...items];
  return (
    <div className="dp2-marquee-track">
      <motion.div className="dp2-marquee-inner"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}>
        {doubled.map((item, i) => (
          <span key={i} className="dp2-marquee-item">
            <Eye size={14} /> {item} <span className="dp2-marquee-dot">✦</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════ */
export default function DoctorProfile() {
  const { id } = useParams();
  const doctor = doctors.find(d => d.id === id);
  useEffect(() => { window.scrollTo(0, 0); }, [id]);

  if (!doctor) {
    return (
      <div className="dp2-notfound">
        <h2>Doctor not found</h2>
        <Link to="/">Return Home</Link>
      </div>
    );
  }

  const yrs = new Date().getFullYear() - (doctor.practisingSince || 2001);
  const nameParts = doctor.name.split(' ');
  const lastName = nameParts.pop();
  const firstNames = nameParts.join(' ');

  return (
    <div className="dp2-page">

      {/* ═══════ SECTION 1 — HERO COLLAGE ═══════ */}
      <section className="dp2-hero">
        <div className="dp2-hero-grid-bg" />

        {/* Floating back link */}
        <Link to="/" className="dp2-back">
          <ChevronLeft size={16} /> Back
        </Link>

        <div className="dp2-hero-inner">
          {/* Left — Collage */}
          <motion.div className="dp2-collage"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>

            {/* Main portrait */}
            <motion.div className="dp2-collage-main"
              initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}>
              <img src={doctor.image || drImg} alt={doctor.name} />
              <div className="dp2-collage-main-border" />
            </motion.div>

            {/* Overlapping secondary image placeholder — styled as old map */}
            <motion.div className="dp2-collage-map"
              initial={{ x: -30, opacity: 0 }} animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.5 }}>
              <div className="dp2-collage-map-inner">
                <MapPin size={20} color={C.herb} />
                <span>Nagpur</span>
                <small>Maharashtra, India</small>
              </div>
            </motion.div>

            {/* Small floating Polaroid */}
            <motion.div className="dp2-collage-polaroid"
              initial={{ rotate: -15, opacity: 0 }} animate={{ rotate: -8, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.7 }}>
              <div className="dp2-polaroid-img-fill">
                <Eye size={28} color={C.harbor} />
              </div>
              <p style={{textAlign: 'center', lineHeight: '1.2', fontSize: '0.85rem', fontWeight: '600'}}>{doctor.specialisation}</p>
            </motion.div>

            {/* Stamp */}
            <motion.div className="dp2-collage-stamp"
              initial={{ scale: 0 }} animate={{ scale: 1 }}
              transition={{ duration: 0.4, delay: 0.9, type: 'spring' }}>
              <span className="dp2-stamp-year">{doctor.practisingSince}</span>
              <span className="dp2-stamp-text">EST.</span>
            </motion.div>
          </motion.div>

          {/* Right — Editorial text */}
          <motion.div className="dp2-hero-text"
            initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}>

            <p className="dp2-hero-eyebrow">The Portfolio of</p>

            <h1 className="dp2-hero-name">
              {firstNames}<br/>
              <span className="dp2-hero-name-accent">{lastName}</span>
            </h1>

            <div className="dp2-hero-quals-line">
              {doctor.qualifications.split(',').map((q, idx) => (
                <span key={idx} className="dp2-tag-herb"><Award size={13} /> {q.trim()}</span>
              ))}
            </div>

            <p className="dp2-hero-intro">
              {doctor.about}
            </p>

            <div className="dp2-hero-stats-strip">
              <div className="dp2-stat-block">
                <span className="dp2-stat-big">{yrs}+</span>
                <span className="dp2-stat-small">Years of<br/>Practice</span>
              </div>
              <div className="dp2-stat-block">
                <span className="dp2-stat-big">{doctor.publications?.length || 0}</span>
                <span className="dp2-stat-small">Research<br/>Papers</span>
              </div>
              <div className="dp2-stat-block">
                <span className="dp2-stat-big">{doctor.ailments?.length || 0}+</span>
                <span className="dp2-stat-small">Conditions<br/>Treated</span>
              </div>
            </div>

            <div className="dp2-hero-cta-row">
              <a href={`tel:${doctor.phone}`} className="dp2-cta-primary">
                <Phone size={16} /> {doctor.phone}
              </a>
              <span className="dp2-cta-secondary">
                <ArrowUpRight size={16} /> View Map
              </span>
            </div>
          </motion.div>
        </div>

        {/* Quote ribbon */}
        <div className="dp2-ribbon">
          <p>"Dedicated to restoring and preserving vision through advanced surgical excellence."</p>
        </div>
      </section>


      {/* ═══════ MARQUEE — Ailments ticker ═══════ */}
      <Marquee items={doctor.ailments || []} />


      {/* ═══════ SECTION 2 — SKILLS / EXPERTISE ═══════ */}
      <section className="dp2-skills">
        <div className="dp2-skills-inner">
          <motion.div className="dp2-skills-header"
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <span className="dp2-kicker">What He Does Best</span>
            <h2 className="dp2-editorial-h2">Specializations &<br/>Training</h2>
          </motion.div>

          {/* Organic skill nodes — diamond layout */}
          <div className="dp2-skill-nodes">

            {/* Connecting arms + nodes */}
            {(doctor.specializations || []).map((spec, idx) => (
              <motion.div key={idx}
                className={`dp2-skill-node dp2-skill-node-${idx}`}
                initial={{ opacity: 0, scale: 0.6 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 + idx * 0.12 }}>
                <div className="dp2-skill-connector" />
                <div className="dp2-skill-card">
                  <h4>{spec.title}</h4>
                  <p>{spec.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* ═══════ SECTION 3 — EDUCATION & EXPERIENCE ═══════ */}
      <DiagonalSlash />
      <section className="dp2-timeline">
        <div className="dp2-timeline-inner">
          <motion.div className="dp2-timeline-header"
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <span className="dp2-kicker dp2-kicker-light">Career Path</span>
            <h2 className="dp2-editorial-h2 dp2-editorial-h2-light">Education &<br/>Experience</h2>
          </motion.div>

          {/* Scattered newspaper/passport clippings */}
          <div className="dp2-clippings">
            {/* Education */}
            {(doctor.education || []).map((edu, idx) => (
              <motion.div key={`e-${idx}`}
                className={`dp2-clipping dp2-clipping-${idx}`}
                style={{ '--rot': `${idx % 2 === 0 ? -3 : 2.5}deg` }}
                initial={{ opacity: 0, y: 50, rotate: 0 }}
                whileInView={{ opacity: 1, y: 0, rotate: idx % 2 === 0 ? -3 : 2.5 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}>
                <div className="dp2-clipping-tape" />
                <span className="dp2-clip-type">Education</span>
                <h3 className="dp2-clip-degree">{edu.degree}</h3>
                <p className="dp2-clip-inst">{edu.institution}</p>
                <div className="dp2-clip-footer">
                  <MapPin size={12} /> {edu.location}
                  <span className="dp2-clip-year">{edu.year}</span>
                </div>
              </motion.div>
            ))}

            {/* Experience */}
            {(doctor.experienceTimeline || []).map((exp, idx) => (
              <motion.div key={`x-${idx}`}
                className={`dp2-clipping dp2-clipping-exp dp2-clipping-exp-${idx}`}
                style={{ '--rot': `${idx % 2 === 0 ? 2 : -2}deg` }}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0, rotate: idx % 2 === 0 ? 2 : -2 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 + idx * 0.15 }}>
                <div className="dp2-clipping-tape dp2-tape-herb" />
                <span className="dp2-clip-type dp2-clip-type-herb">Experience</span>
                <h3 className="dp2-clip-degree">{exp.role}</h3>
                <p className="dp2-clip-inst">{exp.institution}</p>
                <p className="dp2-clip-desc">{exp.description}</p>
                <div className="dp2-clip-footer">
                  <Calendar size={12} /> {exp.period}
                </div>
              </motion.div>
            ))}

            {/* Fellowships */}
            {(doctor.fellowships || []).map((f, idx) => {
              const parts = f.split('.');
              return (
                <motion.div key={`f-${idx}`}
                  className={`dp2-clipping dp2-clipping-fellow dp2-clipping-fellow-${idx}`}
                  style={{ '--rot': `${idx % 2 === 0 ? -4 : 3}deg` }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1, rotate: idx % 2 === 0 ? -4 : 3 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.5 + idx * 0.12 }}>
                  <span className="dp2-fellow-badge">Fellowship</span>
                  <h3 className="dp2-clip-degree">{parts[0]?.trim()}</h3>
                  <p className="dp2-clip-inst">{parts[1]?.trim()}</p>
                  <div className="dp2-clip-footer">
                    <Globe size={12} /> {parts[3]?.trim().replace(/[()]/g, '')}
                    <span className="dp2-clip-year">{parts[2]?.trim()}</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>


      {/* ═══════ SECTION 4 — CONDITIONS TREATED ═══════ */}
      <SeismicEdge />
      <section className="dp2-conditions">
        <div className="dp2-conditions-inner">
          <motion.div className="dp2-conditions-header"
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <span className="dp2-kicker">Conditions Managed</span>
            <h2 className="dp2-editorial-h2">What We<br/>Treat</h2>
          </motion.div>

          {/* Bento grid — each ailment gets a unique illustrative icon + accent */}
          <div className="dp2-bento">
            {/* Row 1+2 — AMD (2×2), Cataract (1×2), Diabetic (1×1), Glaucoma (1×1) */}
            <motion.div className="dp2-bento-card dp2-bento-c1"
              style={{ '--card-bg': '#eef4ff' }}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.45, delay: 0 }}
              whileHover={{ y: -4 }}>
              <div className="dp2-bento-icon" style={{ color: '#3770bf' }}><Scan size={32} /></div>
              <div className="dp2-bento-body">
                <h4 style={{ color: '#3770bf' }}>Age Related Macular Degeneration</h4>
                <p style={{ color: '#3770bf', opacity: 0.65 }}>Retinal centre deterioration affecting central vision clarity.</p>
              </div>
            </motion.div>

            <motion.div className="dp2-bento-card dp2-bento-c2"
              style={{ '--card-bg': '#cef26d' }}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.45, delay: 0.06 }}
              whileHover={{ y: -4 }}>
              <div className="dp2-bento-icon" style={{ color: '#1A1A1A' }}><Eye size={28} /></div>
              <div className="dp2-bento-body">
                <h4 style={{ color: '#1A1A1A' }}>Cataract</h4>
                <p style={{ color: '#1A1A1A', opacity: 0.65 }}>Lens clouding — treated with phaco or SICS surgery.</p>
              </div>
            </motion.div>

            <motion.div className="dp2-bento-card dp2-bento-c3"
              style={{ '--card-bg': '#3770bf' }}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.45, delay: 0.12 }}
              whileHover={{ y: -4 }}>
              <div className="dp2-bento-icon" style={{ color: '#fff' }}><Activity size={28} /></div>
              <div className="dp2-bento-body">
                <h4 style={{ color: '#fff' }}>Diabetic Retinopathy</h4>
                <p style={{ color: '#fff', opacity: 0.65 }}>Vascular damage to the retina from chronic high blood sugar.</p>
              </div>
            </motion.div>

            <motion.div className="dp2-bento-card dp2-bento-c4"
              style={{ '--card-bg': '#f0f5ff' }}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.45, delay: 0.18 }}
              whileHover={{ y: -4 }}>
              <div className="dp2-bento-icon" style={{ color: '#3770bf' }}><HeartPulse size={26} /></div>
              <div className="dp2-bento-body">
                <h4 style={{ color: '#3770bf' }}>Glaucoma</h4>
                <p style={{ color: '#3770bf', opacity: 0.65 }}>Optic nerve damage due to elevated intraocular pressure.</p>
              </div>
            </motion.div>

            {/* Row 3+4 — Hypertensive (2×1), Uveitis (1×1), Refractive (1×1), Conjunctivitis (1×1), Endophthalmitis (1×1 in row4), Stye (2×1) */}
            <motion.div className="dp2-bento-card dp2-bento-c5"
              style={{ '--card-bg': '#1A1A1A' }}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.45, delay: 0.24 }}
              whileHover={{ y: -4 }}>
              <div className="dp2-bento-icon" style={{ color: '#cef26d' }}><FlameKindling size={26} /></div>
              <div className="dp2-bento-body">
                <h4 style={{ color: '#fff' }}>Hypertensive Retinopathy</h4>
                <p style={{ color: '#fff', opacity: 0.55 }}>Retinal vessel damage caused by sustained high blood pressure.</p>
              </div>
            </motion.div>

            <motion.div className="dp2-bento-card dp2-bento-c6"
              style={{ '--card-bg': '#fff7ed' }}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.45, delay: 0.30 }}
              whileHover={{ y: -4 }}>
              <div className="dp2-bento-icon" style={{ color: '#c2410c' }}><Flame size={26} /></div>
              <div className="dp2-bento-body">
                <h4 style={{ color: '#c2410c' }}>Uveitis</h4>
                <p style={{ color: '#c2410c', opacity: 0.65 }}>Inflammatory condition of the uveal tract of the eye.</p>
              </div>
            </motion.div>

            <motion.div className="dp2-bento-card dp2-bento-c7"
              style={{ '--card-bg': '#f3f6ff' }}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.45, delay: 0.36 }}
              whileHover={{ y: -4 }}>
              <div className="dp2-bento-icon" style={{ color: '#3770bf' }}><Glasses size={28} /></div>
              <div className="dp2-bento-body">
                <h4 style={{ color: '#3770bf' }}>Refractive Errors</h4>
                <p style={{ color: '#3770bf', opacity: 0.65 }}>Myopia, hyperopia, astigmatism & presbyopia corrections.</p>
              </div>
            </motion.div>

            <motion.div className="dp2-bento-card dp2-bento-c8"
              style={{ '--card-bg': '#e8f8f0' }}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.45, delay: 0.42 }}
              whileHover={{ y: -4 }}>
              <div className="dp2-bento-icon" style={{ color: '#065f46' }}><Droplets size={24} /></div>
              <div className="dp2-bento-body">
                <h4 style={{ color: '#065f46' }}>Conjunctivitis</h4>
                <p style={{ color: '#065f46', opacity: 0.65 }}>Infection or inflammation of the conjunctival membrane.</p>
              </div>
            </motion.div>

            <motion.div className="dp2-bento-card dp2-bento-c9"
              style={{ '--card-bg': '#374151' }}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.45, delay: 0.48 }}
              whileHover={{ y: -4 }}>
              <div className="dp2-bento-icon" style={{ color: '#8dc2ff' }}><Microscope size={26} /></div>
              <div className="dp2-bento-body">
                <h4 style={{ color: '#fff' }}>Endophthalmitis</h4>
                <p style={{ color: '#fff', opacity: 0.55 }}>Severe intraocular infection requiring urgent intervention.</p>
              </div>
            </motion.div>

            <motion.div className="dp2-bento-card dp2-bento-c10"
              style={{ '--card-bg': '#fef9c3' }}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.45, delay: 0.54 }}
              whileHover={{ y: -4 }}>
              <div className="dp2-bento-icon" style={{ color: '#92400e' }}><Bug size={22} /></div>
              <div className="dp2-bento-body">
                <h4 style={{ color: '#92400e' }}>Stye</h4>
                <p style={{ color: '#92400e', opacity: 0.65 }}>Bacterial infection of the eyelid gland causing a tender lump.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>


      {/* ═══════ SECTION 5 — JOURNEY MAP ═══════ */}
      <DotDissolve topColor="#f3f6ff" bottomColor="#e8efff" />
      <section className="dp2-journey">
        <div className="dp2-journey-inner">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <span className="dp2-kicker">Life's Path</span>
            <h2 className="dp2-editorial-h2">Journey<br/>Across Borders</h2>
          </motion.div>

          <div className="dp2-journey-map">
            {doctor.journeyMapImage ? (
              <motion.img 
                src={doctor.journeyMapImage} 
                alt={`${doctor.name} Journey Map`} 
                className="dp2-map-img"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                style={{ width: '100%', height: 'auto', borderRadius: '16px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', display: 'block' }}
              />
            ) : null}

            {/* Journey cards stacked organically */}
            <div className="dp2-journey-cards">
              {(doctor.journeyLocations || []).map((loc, idx) => (
                <motion.div key={idx}
                  className="dp2-journey-card"
                  style={{ '--jrot': `${idx % 2 === 0 ? -2 : 1.5}deg` }}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: idx * 0.1 }}
                  whileHover={{ rotate: 0, x: 8 }}>
                  <div className="dp2-jcard-dot" style={{ background: idx < 2 ? C.herb : C.ice }} />
                  <div className="dp2-jcard-text">
                    <h4>{loc.city} <span>{loc.country}</span></h4>
                    <p>{loc.label}</p>
                    <small>{loc.period}</small>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>


      {/* ═══════ BOTTOM — Accordions + Contact ═══════ */}
      <DotDissolve topColor="#e8efff" bottomColor="#f3f6ff" variant="up" />
      <section className="dp2-bottom">
        <div className="dp2-bottom-inner">
          <div className="dp2-bottom-grid">
            {/* Left — Accordions */}
            <div className="dp2-bottom-left">
              <Accordion title={`Publications (${doctor.publications?.length || 0})`}
                icon={<BookOpen size={16} color={C.harbor} />} defaultOpen>
                {(doctor.publications || []).map((pub, i) => (
                  <div key={i} className="dp2-pub-row">
                    <span className="dp2-pub-idx">{String(i + 1).padStart(2, '0')}</span>
                    <div>
                      <p className="dp2-pub-title">{pub.title}</p>
                      <p className="dp2-pub-journal"><FileText size={11} /> {pub.journal}</p>
                    </div>
                  </div>
                ))}
              </Accordion>

              <Accordion title="Presentations & Teaching"
                icon={<Mic size={16} color={C.harbor} />}>
                {(doctor.presentations || []).map((p, i) => (
                  <div key={i} className="dp2-pres-row">
                    <div className="dp2-pres-bullet" />
                    <p>{p}</p>
                  </div>
                ))}
              </Accordion>

              <Accordion title="Memberships & Committees"
                icon={<Shield size={16} color={C.harbor} />}>
                {(doctor.accreditations || []).map((a, i) => (
                  <div key={i} className="dp2-pres-row">
                    <div className="dp2-pres-bullet dp2-pres-bullet-herb" />
                    <p>{a}</p>
                  </div>
                ))}
              </Accordion>
            </div>

            {/* Right — Contact + Facilities */}
            <div className="dp2-bottom-right">
              <div className="dp2-contact-card">
                <h3>Get in Touch</h3>
                <div className="dp2-cc-row">
                  <Phone size={18} color={C.harbor} />
                  <div>
                    <small>Phone</small>
                    <p>{doctor.phone}</p>
                  </div>
                </div>
                <div className="dp2-cc-row">
                  <Building2 size={18} color={C.harbor} />
                  <div>
                    <small>Hospital</small>
                    <p>{doctor.hospital?.name}</p>
                    <span className="dp2-cc-addr">{doctor.hospital?.address}</span>
                  </div>
                </div>
                <div className="dp2-cc-row">
                  <MapPin size={18} color={C.harbor} />
                  <div>
                    <small>Hours</small>
                    <p>{doctor.hospital?.timings}</p>
                  </div>
                </div>
              </div>

              <div className="dp2-fac-card">
                <h3>Facilities</h3>
                <div className="dp2-fac-tags">
                  {(doctor.hospital?.facilities || []).map((f, i) => (
                    <span key={i} className="dp2-fac-tag">
                      <Zap size={11} color={C.harbor} /> {f}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
