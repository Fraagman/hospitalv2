import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Reveal from './Reveal';

const INITIAL_REVIEWS = [
  {
    id: 1,
    title: <>Exceptional Eye Care:<br/>My Experience at Shaureen</>,
    smallTitle: <>"Exceptional Eye<br/>Care Experience"</>,
    desc: "I visited Dr. Shamik Ambatkar for a vitreo-retinal consultation and the experience was flawless. The advanced equipment and caring staff made me feel completely at ease.",
    heroImg: "https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=800",
    smallImg: "https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=400",
    rating: "5/5",
    colorClass: "bg-accent-main",
    type: "bg-img",
  },
  {
    id: 2,
    title: <>Best Eye Hospital<br/>in Nagpur</>,
    smallTitle: <>"Best Eye<br/>Hospital in Nagpur"</>,
    desc: "The level of professionalism and care I received was outstanding. The facilities are top-notch and the staff goes above and beyond my expectations.",
    heroImg: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800",
    smallImg: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200",
    rating: "5/5",
    colorClass: "bg-accent-bright",
    type: "cutout",
  },
  {
    id: 3,
    title: <>Precise Diagnosis<br/>and Helpful Care</>,
    smallTitle: <>"Dr. Shamik's diagnosis<br/>was precise and helpful."</>,
    desc: "Dr. Shamik's diagnosis was precise and helpful. He took the time to explain my condition in detail and laid out a clear treatment plan.",
    heroImg: "https://images.unsplash.com/photo-1557672172-298e090bd0f1?auto=format&fit=crop&q=80&w=800",
    smallImg: "https://images.unsplash.com/photo-1557672172-298e090bd0f1?auto=format&fit=crop&q=80&w=400",
    rating: "5/5",
    colorClass: "bg-site-theme",
    type: "bg-img",
  },
  {
    id: 4,
    title: <>Successful Surgery:<br/>Highly Recommended!</>,
    smallTitle: <>"The surgery was a success.<br/>Highly Recommended!"</>,
    desc: "The surgery was a complete success. I was nervous initially, but the surgical team was incredibly reassuring. My recovery was much faster than I expected.",
    heroImg: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&q=80&w=800",
    smallImg: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&q=80&w=400",
    rating: "5/5",
    colorClass: "bg-accent-main",
    type: "bg-img",
  },
  {
    id: 5,
    title: <>Perfect Vision<br/>After Treatment</>,
    smallTitle: <>"My vision is<br/>perfect now!"</>,
    desc: "My vision is perfect now! It's like seeing the world clearly for the first time in years. Thank you Shaureen Advanced Eye Care for changing my life.",
    heroImg: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=800",
    smallImg: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200",
    rating: "5/5",
    colorClass: "bg-accent-light",
    type: "cutout",
  }
];

export default function CaseStudies() {
  const [reviews, setReviews] = useState(INITIAL_REVIEWS);

  const rotateNext = () => {
    setReviews((prev) => {
      const newArr = [...prev];
      const first = newArr.shift();
      newArr.push(first);
      return newArr;
    });
  };

  const rotatePrev = () => {
    setReviews((prev) => {
      const newArr = [...prev];
      const last = newArr.pop();
      newArr.unshift(last);
      return newArr;
    });
  };

  const mainReview = reviews[0];
  const queueReviews = reviews.slice(1);

  return (
    <section className="case-studies section">
      <div className="case-header" style={{ justifyContent: 'flex-end' }}>
        <Reveal direction="left">
          <h2 className="case-main-title">Patient Reviews</h2>
        </Reveal>
      </div>

      <div className="case-layout">
        <Reveal direction="up" delay={200} className="case-left">
          <AnimatePresence mode="wait">
            <motion.div 
              key={mainReview.id}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 30 }}
              transition={{ duration: 0.3 }}
              className="case-main-card"
            >
              <div className="case-card-top">
                <div>
                  <h3>{mainReview.title}</h3>
                  <p className="case-desc">{mainReview.desc}</p>
                </div>
              </div>
              
              <img className="case-hero-img" src={mainReview.heroImg} alt="Happy Patient" />
              
              <div className="case-stats">
                <div className="stat-pill">
                  {mainReview.rating} <svg viewBox="0 0 24 24" fill="currentColor" stroke="none" style={{color: '#FFD700'}} width="20" height="20"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
          
          <div className="case-controls">
            <button className="control-btn left" onClick={rotatePrev} style={{ position: 'relative', zIndex: 99, pointerEvents: 'auto' }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7"></path></svg>
            </button>
            <button className="control-btn right" onClick={rotateNext} style={{ position: 'relative', zIndex: 99, pointerEvents: 'auto' }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"></path></svg>
            </button>
            <div className="slider-track" style={{ position: 'relative', zIndex: 99, pointerEvents: 'none' }}>
              <div className="slider-thumb" style={{ left: `0%`, width: '100%', position: 'relative', pointerEvents: 'none' }}></div>
            </div>
          </div>
        </Reveal>

        <Reveal direction="up" delay={300} className="case-right">
          <div className="case-carousel">
            <AnimatePresence mode="popLayout">
              {queueReviews.map((review) => (
                <motion.div 
                  layout
                  key={review.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3 }}
                  className={`small-case-card ${review.colorClass}`}
                >
                  {review.type === "bg-img" ? (
                    <>
                      <img className="card-bg-img" src={review.smallImg} alt={review.smallTitle.toString()} />
                      <div className="glass-content">
                        <h4>{review.smallTitle}</h4>
                      </div>
                    </>
                  ) : (
                    <>
                      <h4>{review.smallTitle}</h4>
                      <div className="circle-cutout">
                        <img src={review.smallImg} alt={review.smallTitle.toString()} />
                      </div>
                    </>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
          
          <div className="case-info">
             <p>Read what our happy patients have to say about their experience with Shaureen Advanced Eye Care. From routine check-ups to complex retinal surgeries, our commitment to excellence shines through their stories.</p>
             <a href="#" className="explore-link">
               Read More Reviews 
               <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"></path></svg>
             </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
