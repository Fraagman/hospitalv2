import drShamikImg from '../img/R-1.jpg';
import drSonalImg from '../img/67133d513112ae5e0ebf734286fcf2e8.png';
import shamikJourneyMap from '../img/shamik_journey_v2.png';
import sonalJourneyMap from '../img/sonal_journey_v2.png';

export const doctors = [

  {
    id: "shamik",
    name: "Dr. Shamik A. Ambatkar",
    qualifications: "MBBS, DNB (Ophthalmology)",
    specialisation: "Vitreo-Retinal Surgery",
    experience: "22+",
    practisingSince: 2001,
    phone: "0712 2232005",
    image: drShamikImg,
    coverImage: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&q=80&w=1200",
    journeyMapImage: shamikJourneyMap,
    about: "Dr. Shamik A Ambatkar is a premier Vitreo-Retinal Surgeon based in Nagpur at Shaureen Advanced Eye Care Hospital. He has an MBBS and Diplomate of the National Board (DNB) in Ophthalmology as his main medical qualifications. He did his post-graduation from Aravind Eye Hospital in Madurai, where he was also a Consultant for four years, while completing a Fellowship in Vitreo-Retina there and clearing the Part I requirements for fellow status at the International Council of Ophthalmology (London).",

    specializations: [
      { title: "Vitreo-Retinal Surgery", description: "Advanced surgical treatment of retinal detachments, macular holes, and vitreous hemorrhage." },
      { title: "Manual SICS", description: "Manual small-incision cataract surgery — a cost-effective, sutureless technique." },
      { title: "Instrumental Phacoemulsification", description: "Modern ultrasound-based cataract removal with foldable IOL implantation." },
      { title: "Orbital Surgeries", description: "Surgical management of conditions affecting the eye socket and surrounding structures." },
      { title: "Diabetic Retinopathy Management", description: "Comprehensive screening, laser treatment, and surgical intervention for diabetic eye disease." }
    ],

    education: [
      { degree: "MBBS", institution: "Government Medical College", year: 1995, location: "Nagpur" },
      { degree: "DNB (Ophthalmology)", institution: "Aravind Eye Hospital", year: 2001, location: "Tirunelveli" }
    ],

    experienceTimeline: [
      { role: "Head of Department & Consultant", institution: "Aravind Eye Hospital", period: "2002–2005", description: "Vitreo-Retina services under Dr. P Namperumalsamy. Led retinal surgery department and trained post-graduate residents." },
      { role: "Founder & Chief Surgeon", institution: "Shaureen Advanced Eye Care Hospital", period: "2007–Present", description: "Founded private practice specializing in advanced retinal surgeries, glaucoma management, and laser treatments." }
    ],

    fellowships: [
      "Fellowship in Vitreo-Retinal Surgery. Aravind Eye Hospital. 2003. (India)",
      "Fellow, International Council of Ophthalmology (Part I). London. 2003. (United Kingdom)"
    ],

    accreditations: [
      "Member, Rotary International.",
      "Member, Rotary Club of Nagpur, Wardha.",
      "Organising Committee Member, Tamil Nadu Ophthalmic Association Conference, Tirunelveli. 2004.",
      "Organising Committee Member, Glaucoma Society of India Annual Meeting, Tirunelveli. 2003."
    ],

    publications: [
      { title: "Fuchs' heterochromic uveitis with Duane's retraction syndrome: A co-existence or coincidence?", journal: "Journal of Tamil Nadu Ophthalmic Association" },
      { title: "Pseudo tumour cerebri with penicillin.", journal: "Journal of Tamil Nadu Ophthalmic Association" },
      { title: "Optical coherence tomographic findings in acute macular neuroretinopathy.", journal: "Eye Journal (London)" },
      { title: "Congenital hamartoma of retinal pigment epithelium: OCT findings.", journal: "American Journal of Ophthalmology" },
      { title: "Waardenberg syndrome.", journal: "Indian Journal of Ophthalmology" },
      { title: "OCT findings in solar retinopathy.", journal: "Indian Journal of Ophthalmology" }
    ],

    presentations: [
      "Free Paper Presentations: Annual Tamil Nadu Ophthalmic Association Conference (2000, 2002, 2003, 2004)",
      "Free Paper Presentations: Annual Conference of All India Ophthalmic Association (2003, 2004)",
      "Free Paper Presentation: Annual Conference of the Vitreo-Retinal Society (2004)",
      "Instruction Course & Ophthalmology Update Programs conducted at Aravind Eye Hospital.",
      "Guest Faculty: CME Nagpur Academy of Ophthalmology (2005), IMA Tuticorin, Vidharbha Ophthalmic Society (2007, 2008).",
      "Teaching Experience: Lecturer at INMC, Sawangi, Wardha."
    ],

    journeyLocations: [
      { city: "Nagpur", country: "India", x: 62, y: 52, label: "Government Medical College & Shaureen Hospital", period: "1990–1995, 2007–Present" },
      { city: "Tirunelveli", country: "India", x: 58, y: 82, label: "Aravind Eye Hospital — DNB, Fellowship, HOD", period: "1998–2005" },
      { city: "Madurai", country: "India", x: 60, y: 78, label: "Aravind Eye Hospital — Residency", period: "1998–2001" },
      { city: "London", country: "UK", x: 20, y: 18, label: "International Council of Ophthalmology — Part I", period: "2003" },
      { city: "USA (Telelink)", country: "USA", x: 8, y: 25, label: "Wilmer Eye Hospital — Inaugural Case Report", period: "2003" }
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
      "MBBS: Government Medical College. 1995.",
      "DNB (Opthalmology): Aravind Eye Hospital, Tirunelveli. 2001.",
      "Instruction course conducted: Annual Tamil Nadu Ophthalmology Conference. 2004.",
      "Ophthalmology update programme conducted: For all India post-graduates. Aravind Eye Hospital, Tirunelveli. 2002.",
      "Guest faculty: CME, Nagpur Academy of Ophthalmology. 2005."
    ],
    hospital: {
      name: "Shaureen Advanced Eye Care Hospital",
      address: "Ajni Square, Wardha Road, Vivekanand Nagar, Nagpur - 440015, Maharashtra",
      facilities: ["Perimetry", "A-Scan Biometry", "YAG Laser", "Fundus Fluorescein Angiography", "OCT", "Green Laser", "Phaco IOL", "Vitreo-Retinal Surgery"],
      timings: "Mon - Sat: By Appointment | Sun: Closed"
    }
  },
  {
    id: "sonal",
    name: "Dr. Sonal Shamik Ambatkar",
    qualifications: "MBBS, DNB (Ophthalmology)",
    specialisation: "Glaucoma Services & Cataract Surgery",
    experience: "20+",
    practisingSince: 2002,
    phone: "09423638101",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=800",
    coverImage: "https://images.unsplash.com/photo-1557672172-298e090bd0f1?auto=format&fit=crop&q=80&w=1200",
    journeyMapImage: sonalJourneyMap,
    about: "Dr. Sonal Shamik Ambatkar is a highly experienced Consultant Ophthalmologist specializing in Glaucoma Services. She trained at the prestigious Aravind-Zeiss Centre of Excellence, Aravind Eye Hospital, under Dr. R Ramakrishnan. She is an expert in high-volume cataract surgeries, having performed over 12,000 manual small incision cataract surgeries, alongside advanced glaucoma management, phacoemulsification, and anterior segment laser procedures.",
    
    specializations: [
      { title: "Glaucoma Surgeries", description: "Advanced medical and surgical management of glaucoma to prevent optic nerve damage." },
      { title: "Manual SICS", description: "High-volume expert in manual small-incision cataract surgeries with over 12,000 successful procedures." },
      { title: "Phacoemulsification", description: "Modern ultrasound-based cataract removal for faster recovery and better visual outcomes." },
      { title: "Anterior Segment Laser", description: "Laser procedures for various anterior segment conditions including post-cataract opacification and glaucoma." },
      { title: "Orbital & Anterior Segment Surgeries", description: "Comprehensive surgical care for orbital and various anterior segment disorders." }
    ],

    education: [
      { degree: "MBBS", institution: "Government Medical College", year: 1996, location: "Nagpur" },
      { degree: "DNB (Ophthalmology)", institution: "Aravind Eye Hospital", year: 2002, location: "Tirunelveli" }
    ],

    experienceTimeline: [
      { role: "Medical Officer", institution: "Aravind Eye Hospital", period: "May 2002 – Nov 2002", description: "Attended general Ophthalmology OPD and OR. Conducted free camps under the aegis of Aravind Eye Hospital." },
      { role: "Consultant, Glaucoma Services", institution: "Aravind-Zeiss Centre of Excellence, Aravind Eye Hospital", period: "Dec 2002 – June 2005", description: "Underwent specialized training in Glaucoma under Dr. R Ramakrishnan. Performed high-volume cataract and glaucoma surgeries." },
      { role: "Consultant Ophthalmologist", institution: "Shaureen Advanced Eye Care Hospital", period: "Jan 2007 – Present", description: "Providing comprehensive eye care specializing in glaucoma and advanced cataract surgeries." }
    ],

    fellowships: [
      "Training in Glaucoma under Dr. R Ramakrishnan, Aravind Eye Hospital, Tirunelveli"
    ],

    accreditations: [
      "Member, Glaucoma Society of India",
      "Member, Vidarbha Ophthalmic Society",
      "Member, Nagpur Academy of Ophthalmologists",
      "Member, Academy of Medical Sciences, Nagpur",
      "Member, Rotary club of vision",
      "Organising committee of Tamil Nadu Ophthalmic Association Conference 2004 held at Tirunelveli",
      "Organising committee of Annual Glaucoma Society of India conference 2003 held at Tirunelveli"
    ],

    publications: [
      { title: "OCT of RNFL layer in normal and glaucoma population", journal: "Indian Journal of Ophthalmology" },
      { title: "Original article on OCT (Optical Coherence Tomography)", journal: "Journal of Tamil Nadu Ophthalmic Association" },
      { title: "Original article on Central Corneal Thickness in Glaucoma", journal: "Journal of Bombay Ophthalmic Association" },
      { title: "Chapter on Phacoemulsification in Glaucomatous eyes", journal: "L C Dutta textbook of Ophthalmology" },
      { title: "Chapter on Tonometry", journal: "Recent advances in Ophthalmology by Nema" }
    ],

    presentations: [
      "Annual Glaucoma Society of India conference 2003: Presented free paper on association of Retinal Nerve Fibre Layer thickness and Macular thickness by OCT.",
      "Instruction course on Optical Coherence Tomography in Annual Tamil Nadu Ophthalmic Association Conference 2004.",
      "Invited as guest faculty at CME 2005 of Nagpur Academy of Ophthalmology."
    ],

    journeyLocations: [
      { city: "Nagpur", country: "India", x: 62, y: 52, label: "Government Medical College", period: "1996" },
      { city: "Tirunelveli", country: "India", x: 58, y: 82, label: "Aravind Eye Hospital — DNB & Glaucoma Services", period: "1998–2005" },
      { city: "Nagpur", country: "India", x: 62, y: 52, label: "Shaureen Advanced Eye Care", period: "2007–Present" }
    ],

    ailments: [
      "Glaucoma",
      "Cataract",
      "Refractive Errors",
      "Anterior Segment Disorders",
      "Orbital Diseases"
    ],
    
    training: [
      "MBBS: Government Medical College. 1996.",
      "DNB (Opthalmology): Aravind Eye Hospital, Tirunelveli. 2002.",
      "Training in Glaucoma: Aravind Eye Hospital, Tirunelveli."
    ],

    hospital: {
      name: "Shaureen Advanced Eye Care Hospital",
      address: "Bhavani Chambers, Ajni Square, Wardha Road, Nagpur - 440015, Maharashtra",
      facilities: ["Perimetry", "A-Scan Biometry", "YAG Laser", "OCT", "Phaco IOL", "Glaucoma Surgeries", "Anterior Segment Laser"],
      timings: "Mon - Sat: By Appointment | Sun: Closed"
    }
  }
];
