import shamikJourneyMap from '../img/shamik_journey_v2.png';
import sonalJourneyMap from '../img/sonal_journey_v2.png';

export const doctors = [
  {
    id: "shamik",
    name: "Dr. Alex Vance",
    qualifications: "MBBS, DNB (Ophthalmology), FICO",
    specialisation: "Vitreo-Retinal Surgery",
    experience: "22+",
    practisingSince: 2001,
    phone: "+1 (800) 555-0199",
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=800",
    coverImage: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&q=80&w=1200",
    journeyMapImage: shamikJourneyMap,
    about: "Dr. Alex Vance is a premier Vitreo-Retinal Surgeon based at Aura Vision Center. Holding an MBBS and Diplomate of the National Board (DNB) in Ophthalmology, Dr. Vance completed advanced post-graduate fellowship training in Vitreo-Retinal surgery and is a fellow of the International Council of Ophthalmology.",

    specializations: [
      { title: "Vitreo-Retinal Surgery", description: "Advanced surgical treatment of retinal detachments, macular holes, and vitreous hemorrhage." },
      { title: "Manual SICS", description: "Manual small-incision cataract surgery — a cost-effective, sutureless technique." },
      { title: "Instrumental Phacoemulsification", description: "Modern ultrasound-based cataract removal with foldable IOL implantation." },
      { title: "Orbital Surgeries", description: "Surgical management of conditions affecting the eye socket and surrounding structures." },
      { title: "Diabetic Retinopathy Management", description: "Comprehensive screening, laser treatment, and surgical intervention for diabetic eye disease." }
    ],

    education: [
      { degree: "MBBS", institution: "State Medical University", year: 1995, location: "Medical District" },
      { degree: "DNB (Ophthalmology)", institution: "National Eye Care Institute", year: 2001, location: "Central Campus" }
    ],

    experienceTimeline: [
      { role: "Head of Department & Consultant", institution: "National Eye Care Institute", period: "2002–2005", description: "Led retinal surgery department and trained post-graduate surgical residents." },
      { role: "Founder & Chief Surgeon", institution: "Aura Vision Center", period: "2007–Present", description: "Founded private practice specializing in advanced retinal surgeries, glaucoma management, and laser treatments." }
    ],

    fellowships: [
      "Fellowship in Vitreo-Retinal Surgery. National Eye Care Institute. 2003.",
      "Fellow, International Council of Ophthalmology (Part I). London. 2003. (United Kingdom)"
    ],

    accreditations: [
      "Member, International Society of Ophthalmology.",
      "Member, National Ophthalmic Association.",
      "Organising Committee Member, Annual Retinal Surgeons Conference.",
      "Organising Committee Member, Glaucoma Society Annual Meeting."
    ],

    publications: [
      { title: "Fuchs' heterochromic uveitis with Duane's retraction syndrome: Clinical Insights", journal: "Journal of Ophthalmic Surgery" },
      { title: "Optical coherence tomographic findings in acute macular neuroretinopathy.", journal: "Eye Journal (London)" },
      { title: "Congenital hamartoma of retinal pigment epithelium: OCT findings.", journal: "American Journal of Ophthalmology" },
      { title: "OCT findings in solar retinopathy.", journal: "Journal of Clinical Ophthalmology" }
    ],

    presentations: [
      "Free Paper Presentations: Annual Ophthalmic Association Conference",
      "Free Paper Presentations: Annual Conference of Vitreo-Retinal Society",
      "Instruction Course & Ophthalmology Update Programs conducted at National Eye Institute.",
      "Guest Faculty: Ophthalmic CME Seminars and Symposia."
    ],

    journeyLocations: [
      { city: "Medical District", country: "USA", x: 62, y: 52, label: "Medical University & Aura Vision", period: "1990–Present" },
      { city: "Central Campus", country: "USA", x: 58, y: 82, label: "National Eye Institute — Fellowship & HOD", period: "1998–2005" },
      { city: "London", country: "UK", x: 20, y: 18, label: "International Council of Ophthalmology", period: "2003" }
    ],

    ailments: [
      "Age Related Macular Degeneration",
      "Cataract",
      "Conjunctivitis",
      "Diabetic Retinopathy",
      "Endopthalmitis",
      "Glaucoma",
      "Hypertensive Retinopathy",
      "Refractive Errors",
      "Stye",
      "Uveitis"
    ],
    training: [
      "MBBS: State Medical University. 1995.",
      "DNB (Ophthalmology): National Eye Care Institute. 2001.",
      "Instruction course conducted: Annual Ophthalmology Conference. 2004.",
      "Guest faculty: Ophthalmic CME Seminars."
    ],
    hospital: {
      name: "Aura Vision Center",
      address: "100 Health Sciences Plaza, Suite 400, Medical District",
      facilities: ["Perimetry", "A-Scan Biometry", "YAG Laser", "Fundus Fluorescein Angiography", "OCT", "Green Laser", "Phaco IOL", "Vitreo-Retinal Surgery"],
      timings: "Mon - Sat: 9:00 AM - 7:00 PM | Sun: Closed"
    }
  },
  {
    id: "sonal",
    name: "Dr. Elena Morgan",
    qualifications: "MBBS, DNB (Ophthalmology)",
    specialisation: "Glaucoma Services & Cataract Surgery",
    experience: "20+",
    practisingSince: 2002,
    phone: "+1 (800) 555-0199",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=800",
    coverImage: "https://images.unsplash.com/photo-1557672172-298e090bd0f1?auto=format&fit=crop&q=80&w=1200",
    journeyMapImage: sonalJourneyMap,
    about: "Dr. Elena Morgan is a highly experienced Consultant Ophthalmologist specializing in Glaucoma Services and Cataract Surgery at Aura Vision Center. Trained at prestigious ophthalmic centers of excellence, Dr. Morgan is an expert in high-volume cataract procedures, advanced glaucoma management, phacoemulsification, and anterior segment laser treatments.",
    
    specializations: [
      { title: "Glaucoma Surgeries", description: "Advanced medical and surgical management of glaucoma to prevent optic nerve damage." },
      { title: "Manual SICS", description: "High-volume expert in manual small-incision cataract surgeries with over 12,000 successful procedures." },
      { title: "Phacoemulsification", description: "Modern ultrasound-based cataract removal for faster recovery and better visual outcomes." },
      { title: "Anterior Segment Laser", description: "Laser procedures for various anterior segment conditions including post-cataract opacification and glaucoma." },
      { title: "Orbital & Anterior Segment Surgeries", description: "Comprehensive surgical care for orbital and various anterior segment disorders." }
    ],

    education: [
      { degree: "MBBS", institution: "State Medical University", year: 1996, location: "Medical District" },
      { degree: "DNB (Ophthalmology)", institution: "National Eye Care Institute", year: 2002, location: "Central Campus" }
    ],

    experienceTimeline: [
      { role: "Medical Officer", institution: "National Eye Care Institute", period: "May 2002 – Nov 2002", description: "Attended general Ophthalmology OPD and OR services." },
      { role: "Consultant, Glaucoma Services", institution: "Center of Excellence for Ophthalmology", period: "Dec 2002 – June 2005", description: "Underwent specialized training in Glaucoma. Performed high-volume cataract and glaucoma surgeries." },
      { role: "Consultant Ophthalmologist", institution: "Aura Vision Center", period: "Jan 2007 – Present", description: "Providing comprehensive eye care specializing in glaucoma and advanced cataract surgeries." }
    ],

    fellowships: [
      "Specialized Fellowship Training in Glaucoma Services"
    ],

    accreditations: [
      "Member, Glaucoma Society",
      "Member, Ophthalmic Association",
      "Member, Academy of Medical Sciences"
    ],

    publications: [
      { title: "OCT of RNFL layer in normal and glaucoma population", journal: "Journal of Ophthalmology" },
      { title: "Original article on OCT (Optical Coherence Tomography)", journal: "Ophthalmic Research Journal" },
      { title: "Original article on Central Corneal Thickness in Glaucoma", journal: "Journal of Ophthalmic Medicine" }
    ],

    presentations: [
      "Annual Glaucoma Society Conference: Presented paper on association of Retinal Nerve Fibre Layer thickness and Macular thickness by OCT.",
      "Instruction course on Optical Coherence Tomography."
    ],

    journeyLocations: [
      { city: "Medical District", country: "USA", x: 62, y: 52, label: "State Medical University", period: "1996" },
      { city: "Central Campus", country: "USA", x: 58, y: 82, label: "Center of Excellence — DNB & Glaucoma Services", period: "1998–2005" },
      { city: "Medical District", country: "USA", x: 62, y: 52, label: "Aura Vision Center", period: "2007–Present" }
    ],

    ailments: [
      "Glaucoma",
      "Cataract",
      "Refractive Errors",
      "Anterior Segment Disorders",
      "Orbital Diseases"
    ],
    
    training: [
      "MBBS: State Medical University. 1996.",
      "DNB (Opthalmology): National Eye Care Institute. 2002.",
      "Specialized Training in Glaucoma Services."
    ],

    hospital: {
      name: "Aura Vision Center",
      address: "100 Health Sciences Plaza, Suite 400, Medical District",
      facilities: ["Perimetry", "A-Scan Biometry", "YAG Laser", "OCT", "Phaco IOL", "Glaucoma Surgeries", "Anterior Segment Laser"],
      timings: "Mon - Sat: 9:00 AM - 7:00 PM | Sun: Closed"
    }
  }
];
