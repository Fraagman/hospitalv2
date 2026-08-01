import React, { useState, useMemo, useEffect } from 'react';
import { useAuth } from '../../lib/AuthContext';
import {
  ChevronLeft, ChevronRight, CalendarDays, Clock, User, Phone,
  MessageCircle, ShieldCheck, Loader2, AlertCircle, Check, Stethoscope
} from 'lucide-react';

/* ── Constants ─────────────────────────────────────────────── */

const WHATSAPP_NUMBER = '917507633352';
const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const TIME_SLOTS = (() => {
  const slots = [];
  let h = 9, m = 30;
  while (h < 18 || (h === 18 && m <= 30)) {
    const ampm = h >= 12 ? 'PM' : 'AM';
    const displayH = h > 12 ? h - 12 : h;
    slots.push(`${displayH}:${m.toString().padStart(2, '0')} ${ampm}`);
    m += 30;
    if (m === 60) { m = 0; h++; }
  }
  return slots;
})();

const STEPS = [
  { num: 1, label: 'Choose Date & Time' },
  { num: 2, label: 'Authentication' },
  { num: 3, label: 'Complete Booking' },
];

/* ── Calendar Helpers ──────────────────────────────────────── */

function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year, month) {
  const day = new Date(year, month, 1).getDay();
  return day === 0 ? 6 : day - 1;            // Mon = 0
}

/* ── Component ─────────────────────────────────────────────── */

export default function BookAppointment() {
  const { user, profile, loginWithGoogle, mockLogin } = useAuth();

  /* step & selection state */
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  /* calendar view */
  const today = useMemo(() => { const d = new Date(); d.setHours(0,0,0,0); return d; }, []);
  const maxDate = useMemo(() => { const d = new Date(today); d.setDate(d.getDate() + 5); return d; }, [today]);
  const [viewYear, setViewYear]   = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());

  /* step‑2  auth */
  const [authLoading, setAuthLoading] = useState(false);
  const [authError,   setAuthError]   = useState(null);

  /* step‑3  form */
  const [name, setName]           = useState('');
  const [phone, setPhone]         = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [submitted, setSubmitted]   = useState(false);

  /* sync profile → form whenever we land on step 3 */
  useEffect(() => {
    if (currentStep === 3) {
      if (profile)     { setName(profile.name || user?.displayName || ''); setPhone(profile.phone || ''); }
      else if (user)   { setName(user.displayName || ''); }
    }
  }, [currentStep, profile, user]);

  /* ── Calendar grid ──────────────────────────────────────── */

  const monthName = new Date(viewYear, viewMonth)
    .toLocaleString('default', { month: 'long' });

  const calendarCells = useMemo(() => {
    const daysInMonth = getDaysInMonth(viewYear, viewMonth);
    const firstDay   = getFirstDayOfMonth(viewYear, viewMonth);
    const cells = [];

    for (let i = 0; i < firstDay; i++) cells.push({ key: `e${i}` });

    for (let d = 1; d <= daysInMonth; d++) {
      const date    = new Date(viewYear, viewMonth, d);
      const dow     = date.getDay();
      cells.push({
        key: `d${d}`, day: d, date,
        disabled: date < today || date > maxDate || dow === 0,
        isSunday: dow === 0,
        isToday:  date.getTime() === today.getTime(),
      });
    }

    const tail = cells.length % 7 === 0 ? 0 : 7 - (cells.length % 7);
    for (let i = 1; i <= tail; i++) cells.push({ key: `t${i}`, day: i, trailing: true });

    return cells;
  }, [viewYear, viewMonth, today, maxDate]);

  const canGoPrev = viewYear > today.getFullYear()
    || (viewYear === today.getFullYear() && viewMonth > today.getMonth());
  const canGoNext = viewYear < maxDate.getFullYear()
    || (viewYear === maxDate.getFullYear() && viewMonth < maxDate.getMonth());

  const isDateSelected = (d) =>
    selectedDate && d
    && selectedDate.getDate()     === d.getDate()
    && selectedDate.getMonth()    === d.getMonth()
    && selectedDate.getFullYear() === d.getFullYear();

  const prevMonth = () => { if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y-1); } else setViewMonth(m => m-1); };
  const nextMonth = () => { if (viewMonth === 11){ setViewMonth(0);  setViewYear(y => y+1); } else setViewMonth(m => m+1); };

  const availableTimeSlots = useMemo(() => {
    if (!selectedDate) return [];
    const isTodaySelected = 
      selectedDate.getDate() === today.getDate() &&
      selectedDate.getMonth() === today.getMonth() &&
      selectedDate.getFullYear() === today.getFullYear();
      
    if (isTodaySelected) {
      const now = new Date();
      const currentHour = now.getHours();
      const currentMinute = now.getMinutes();
      return TIME_SLOTS.filter(slotStr => {
        const [time, ampm] = slotStr.split(' ');
        let [h, m] = time.split(':').map(Number);
        if (ampm === 'PM' && h < 12) h += 12;
        if (ampm === 'AM' && h === 12) h = 0;
        
        if (h > currentHour) return true;
        if (h === currentHour && m > currentMinute) return true;
        return false;
      });
    }
    return TIME_SLOTS;
  }, [selectedDate, today]);

  /* ── Step navigation ────────────────────────────────────── */

  const goTo = (s) => setCurrentStep(s);

  const handleDateClick = (date) => {
    setSelectedDate(date);
    setSelectedTime(null);
    if (currentStep !== 1) goTo(1);
  };

  const handleContinue = () => { goTo(user ? 3 : 2); };

  const handleGoogleSignIn = async () => {
    setAuthLoading(true); setAuthError(null);
    try {
      if (import.meta.env.DEV) {
        mockLogin({ uid:'mock-123', displayName:'Demo User', email:'demo@example.com', photoURL:'' });
      } else {
        await loginWithGoogle();
      }
      goTo(3);
    } catch (err) {
      setAuthError(err.code === 'auth/popup-closed-by-user'
        ? 'Sign‑in was cancelled.' : `Error: ${err.message}`);
    } finally { setAuthLoading(false); }
  };

  const handleSubmit = () => {
    if (!phone || phone.length !== 10) { setPhoneError('Enter a valid 10‑digit number'); return; }
    if (!name.trim()) return;
    setPhoneError(''); setSubmitted(true);

    const fd = selectedDate?.toLocaleDateString('en-IN',{weekday:'long',day:'numeric',month:'long',year:'numeric'});
    const msg = `Hello, I would like to book an appointment.\nPatient Name: ${name.trim()}\nPhone: ${phone}\nDate: ${fd}\nTime: ${selectedTime}`;
    setTimeout(() => window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank'), 400);
  };

  const stepDone = (n) => n < currentStep || (n === 2 && user && currentStep >= 3);

  const fmtDate = selectedDate?.toLocaleDateString('en-IN',{weekday:'long',day:'numeric',month:'long',year:'numeric'});

  /* ── Render ─────────────────────────────────────────────── */
  return (
    <section className="flex flex-col items-center justify-start px-4 sm:px-6 lg:px-8 w-full">
      <div className="w-full max-w-[1024px]">
        <div className="bg-white rounded-3xl shadow-[0_20px_60px_-15px_rgba(55,112,191,0.15)] overflow-hidden border border-gray-100">


          {/* ── Header ────────────────────────────────────── */}
          <div className="bg-[#3770bf] px-8 py-8 text-center">
            <h1 className="text-2xl sm:text-3xl font-bold text-white italic"
                style={{ fontFamily: "'Philosopher', sans-serif" }}>
              Book Appointment
            </h1>
            <p className="text-blue-200/90 text-sm sm:text-base mt-1.5 font-medium">
              Aura Vision • Eye Care Specialist
            </p>
          </div>

          {/* ── Step indicator ────────────────────────────── */}
          <div className="bg-[#edf1f9] px-6 sm:px-10 py-5 border-b border-gray-100">
            <div className="flex items-center max-w-xl mx-auto">
              {STEPS.map((step, i) => (
                <React.Fragment key={step.num}>
                  <div className="flex items-center gap-1.5 flex-shrink-0">
                    <div className={`
                      w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all
                      ${stepDone(step.num)
                        ? 'bg-[#3770bf] text-white'
                        : currentStep === step.num
                          ? 'bg-[#3770bf] text-white'
                          : 'bg-white text-gray-400 border border-gray-300'}
                    `}>
                      {stepDone(step.num)
                        ? <Check size={14} strokeWidth={3} />
                        : step.num}
                    </div>
                    <span className={`text-[11px] font-semibold hidden sm:block whitespace-nowrap ${
                      currentStep >= step.num ? 'text-[#3770bf]' : 'text-gray-400'
                    }`}>
                      {step.num}. {step.label}
                    </span>
                  </div>
                  {i < 2 && (
                    <div className="flex-1 h-[2px] mx-2 sm:mx-4 bg-gray-200/80 rounded-full overflow-hidden">
                      <div className="h-full bg-[#3770bf] transition-all duration-500 ease-out"
                           style={{ width: stepDone(step.num) ? '100%' : '0%' }} />
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* ── Body: Two‑column ──────────────────────────── */}
          <div className="flex flex-col lg:flex-row min-h-[500px]">

            {/* ▸ Left – Calendar ─────────────────────────── */}
            <div className="lg:w-[48%] p-6 sm:p-8 lg:p-10 border-b lg:border-b-0 lg:border-r border-gray-100 bg-gray-50/30">

              {/* month nav */}
              <div className="flex items-center justify-between mb-3">
                <button onClick={prevMonth} disabled={!canGoPrev}
                  className={`w-7 h-7 rounded-md flex items-center justify-center transition ${
                    canGoPrev ? 'text-[#3770bf] hover:bg-[#3770bf]/10' : 'text-gray-300 cursor-not-allowed'}`}>
                  <ChevronLeft size={17} />
                </button>
                <h3 className="text-[15px] font-bold text-gray-800">{monthName} {viewYear}</h3>
                <button onClick={nextMonth} disabled={!canGoNext}
                  className={`w-7 h-7 rounded-md flex items-center justify-center transition ${
                    canGoNext ? 'text-[#3770bf] hover:bg-[#3770bf]/10' : 'text-gray-300 cursor-not-allowed'}`}>
                  <ChevronRight size={17} />
                </button>
              </div>

              {/* day headers */}
              <div className="grid grid-cols-7 mb-0.5">
                {DAYS.map(d => (
                  <div key={d} className={`text-center text-[11px] font-semibold py-1.5 ${
                    d === 'Sun' ? 'text-red-400' : 'text-gray-400'}`}>
                    {d}
                  </div>
                ))}
              </div>

              {/* date grid */}
              <div className="grid grid-cols-7 gap-y-0.5">
                {calendarCells.map(cell => {
                  if (!cell.day) return <div key={cell.key} className="h-10" />;
                  if (cell.trailing) return (
                    <div key={cell.key} className="h-10 flex items-center justify-center text-[13px] text-gray-300">{cell.day}</div>
                  );
                  const sel = isDateSelected(cell.date);
                  return (
                    <div key={cell.key} className="flex items-center justify-center py-1">
                      <button disabled={cell.disabled} onClick={() => handleDateClick(cell.date)}
                        className={`w-10 h-10 rounded-full text-sm font-semibold flex items-center justify-center transition-all
                          ${cell.disabled
                            ? cell.isSunday
                              ? 'text-red-300/70 cursor-not-allowed'
                              : 'text-gray-300 cursor-not-allowed'
                            : sel
                              ? 'bg-[#3770bf] text-white font-bold shadow-md shadow-[#3770bf]/25'
                              : cell.isToday
                                ? 'text-[#3770bf] font-bold ring-2 ring-[#3770bf]/25 hover:bg-[#3770bf]/10'
                                : 'text-gray-700 hover:bg-[#3770bf]/8 cursor-pointer'
                          }`}>
                        {cell.day}
                      </button>
                    </div>
                  );
                })}
              </div>

              {/* time slots – only on step 1 after date picked */}
              {currentStep === 1 && selectedDate && (
                <div className="mt-6 pt-6 border-t border-gray-100">
                  <div className="flex items-center gap-2 mb-4">
                    <Clock size={16} className="text-[#3770bf]" />
                    <span className="text-sm font-bold text-gray-600">
                      Available — {selectedDate.toLocaleDateString('en-IN',{weekday:'short', day:'numeric', month:'short'})}
                    </span>
                  </div>
                  {availableTimeSlots.length === 0 ? (
                    <div className="text-center py-6 bg-[#f3f6ff] rounded-xl">
                      <p className="text-sm text-red-500 font-bold mb-1.5">No time slots left for today.</p>
                      <p className="text-xs text-gray-500">Please select an upcoming date.</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-3 gap-2 sm:gap-3">
                      {availableTimeSlots.map(slot => (
                        <button key={slot} onClick={() => setSelectedTime(slot)}
                          className={`py-2.5 rounded-xl text-xs sm:text-[13px] font-bold transition-all
                            ${selectedTime === slot
                              ? 'bg-[#3770bf] text-white shadow-md shadow-[#3770bf]/20 scale-[1.02]'
                              : 'bg-[#f3f6ff] text-gray-600 hover:bg-[#e0e8f7] hover:text-gray-900'
                            }`}>
                          {slot}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* ▸ Right – Step content ────────────────────── */}
            <div className="lg:w-[52%] p-6 sm:p-8 lg:p-10 flex flex-col bg-white">

              {/* ─ Step 1 ─────────────────────────────────── */}
              {currentStep === 1 && (
                <div className="flex-1 flex flex-col justify-center">
                  {!selectedDate ? (
                    <div className="text-center py-12 opacity-80">
                      <CalendarDays size={56} className="mx-auto text-[#8dc2ff] mb-5" strokeWidth={1.5} />
                      <p className="text-base text-gray-500 font-medium leading-relaxed">Select a date from the calendar<br/>to view available time slots</p>
                    </div>
                  ) : !selectedTime ? (
                    <div className="text-center py-12 opacity-80">
                      <Clock size={56} className="mx-auto text-[#8dc2ff] mb-5" strokeWidth={1.5} />
                      <p className="text-base text-gray-500 font-medium leading-relaxed">Pick a preferred time slot<br/>from the list on the left</p>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {/* summary card */}
                      <div className="bg-[#f3f6ff] rounded-2xl p-5 flex items-start gap-4 border border-blue-50">
                        <CalendarDays size={22} className="text-[#3770bf] mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-xs uppercase tracking-widest text-gray-500 font-bold mb-1">Selected Appointment</p>
                          <p className="text-base font-bold text-gray-900">{fmtDate}</p>
                          <p className="text-base font-bold text-[#3770bf] mt-0.5">{selectedTime}</p>
                        </div>
                      </div>

                      <div className="bg-[#fafcf3] rounded-2xl p-5 border border-[#cef26d]/40">
                        <div className="flex items-center gap-2 mb-2">
                          <Stethoscope size={16} className="text-[#3770bf]" />
                          <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Consultation Summary</p>
                        </div>
                        <p className="text-[15px] font-semibold text-gray-800">Aura Vision • Eye Care Specialist</p>
                        <p className="text-sm text-gray-500 mt-1">Mon‑Sat: 9:30 AM – 6:30 PM</p>
                      </div>

                      <button onClick={handleContinue}
                        className="w-full py-4 mt-2 rounded-xl bg-[#cef26d] text-[#3770bf] font-bold text-[15px] uppercase tracking-wide shadow-md shadow-[#cef26d]/30 hover:shadow-lg hover:brightness-[1.03] active:scale-[0.99] transition-all">
                        Continue →
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* ─ Step 2: Auth ───────────────────────────── */}
              {currentStep === 2 && (
                <div className="flex-1 flex flex-col justify-center space-y-6">
                  <div className="text-center">
                    {/* google icon */}
                    <div className="w-16 h-16 rounded-3xl bg-white shadow-xl shadow-gray-200/50 flex items-center justify-center mx-auto mb-5 border border-gray-50">
                      <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-1">Verify Your Identity</h3>
                    <p className="text-sm text-gray-500">Quick sign‑in to secure your appointment</p>
                  </div>

                  {authError && (
                    <div className="flex items-center gap-2 bg-red-50 text-red-600 px-4 py-3 rounded-xl text-sm border border-red-100">
                      <AlertCircle size={16} className="flex-shrink-0" /><span>{authError}</span>
                    </div>
                  )}

                  <button onClick={handleGoogleSignIn} disabled={authLoading}
                    className={`w-full py-4 rounded-xl font-bold text-[15px] flex items-center justify-center gap-3 transition-all ${
                      authLoading
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-white border-2 border-gray-200 text-gray-700 hover:border-[#3770bf]/40 hover:shadow-md'}`}>
                    {authLoading ? <><Loader2 size={18} className="animate-spin"/>Signing in…</>
                     : <>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                        </svg>
                        Continue with Google
                       </>}
                  </button>

                  {/* dev bypass */}
                  {import.meta.env.DEV && (
                    <button onClick={() => { mockLogin({uid:'mock-123',displayName:'Demo User',email:'demo@example.com',photoURL:''}); goTo(3); }}
                      className="w-full py-2.5 rounded-xl border border-dashed border-[#3770bf]/30 text-xs font-semibold text-[#3770bf] hover:bg-[#3770bf]/5 transition">
                      Dev Bypass Sign In
                    </button>
                  )}

                  <button onClick={() => goTo(1)} className="text-sm font-medium text-gray-400 hover:text-[#3770bf] transition mt-2">
                    ← Back to Date &amp; Time
                  </button>
                </div>
              )}

              {/* ─ Step 3: Details ─────────────────────────── */}
              {currentStep === 3 && (
                <div className="space-y-5">

                  {/* chosen date/time badge */}
                  <div className="bg-[#f3f6ff] rounded-xl p-4 flex items-start gap-4 border border-blue-50">
                    <CalendarDays size={20} className="text-[#3770bf] mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-xs uppercase tracking-widest text-gray-400 font-bold mb-1">Chosen Date &amp; Time:</p>
                      <p className="text-[15px] font-bold text-gray-900">
                        {fmtDate}, {selectedTime}
                      </p>
                    </div>
                  </div>

                  {/* patient details heading */}
                  <h4 className="text-base font-bold text-gray-800 pt-2">Patient Details</h4>

                  {/* signed‑in banner */}
                  {user && (
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center text-sm font-bold flex-shrink-0 overflow-hidden ring-2 ring-gray-100">
                        {user.photoURL
                          ? <img src={user.photoURL} alt="" className="w-full h-full object-cover" />
                          : (profile?.name || user.displayName || user.email || '?').charAt(0).toUpperCase()
                        }
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs text-gray-400 font-medium">Signed in as</p>
                        <p className="text-[15px] font-bold text-gray-800 truncate">
                          {profile?.name || user.displayName || user.email}
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="space-y-4">
                    {/* name input */}
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5">Patient Name</label>
                      <input type="text" value={name}
                        onChange={e => setName(e.target.value)}
                        placeholder="Enter patient name"
                        className="w-full px-0 py-2.5 border-0 border-b-2 border-gray-200 text-base font-medium text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#3770bf] focus:ring-0 transition-colors bg-transparent" />
                    </div>

                    {/* phone input */}
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5">Phone Number</label>
                      <input type="tel" value={phone}
                        onChange={e => { setPhone(e.target.value.replace(/\D/g,'').slice(0,10)); setPhoneError(''); }}
                        placeholder="Enter 10‑digit number" maxLength={10}
                        className={`w-full px-0 py-2.5 border-0 border-b-2 text-base font-medium text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-0 transition-colors bg-transparent ${
                          phoneError ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-[#3770bf]'}`} />
                      {phoneError && (
                        <p className="text-xs text-red-500 mt-1.5 flex items-center gap-1.5 font-medium">
                          <AlertCircle size={14} />{phoneError}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* consultation summary */}
                  <div className="bg-[#fafcf3] rounded-xl p-4 border border-[#cef26d]/40">
                    <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Consultation Summary</h4>
                    <p className="text-[15px] font-semibold text-gray-800">Aura Vision • Eye Care Specialist</p>
                    <div className="flex items-center gap-2 mt-2 text-gray-400">
                      <Clock size={14} />
                      <span className="text-xs font-medium">Consultation Hours</span>
                    </div>
                    <p className="text-xs font-medium text-gray-500 ml-5">Mon‑Sat: 9:30 AM – 6:30 PM</p>
                  </div>

                  {/* CTA */}
                  <button onClick={handleSubmit}
                    disabled={!name.trim() || submitted}
                    className={`w-full py-4 rounded-xl font-bold text-[15px] uppercase tracking-wide flex items-center justify-center gap-2.5 transition-all mt-2
                      ${submitted
                        ? 'bg-green-100 text-green-600 cursor-not-allowed'
                        : !name.trim()
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                          : 'bg-[#cef26d] text-[#3770bf] shadow-md shadow-[#cef26d]/30 hover:shadow-lg hover:brightness-[1.03] active:scale-[0.99]'}`}>
                    {submitted
                      ? <>Redirecting to WhatsApp…</>
                      : <>Confirm Booking <MessageCircle size={18}/></>}
                  </button>

                  {/* security */}
                  <p className="text-xs font-medium text-gray-400 text-center leading-relaxed">
                    <ShieldCheck size={14} className="inline mr-1 align-sub" />
                    Your data is secure and only shared with the doctor's clinic.
                  </p>

                  {/* back */}
                  <button onClick={() => goTo(user ? 1 : 2)} disabled={submitted}
                    className="w-full text-center text-sm font-medium text-gray-400 hover:text-[#3770bf] transition">
                    ‹ Back
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* outer security */}
        <p className="text-center text-[11px] text-[#8dc2ff] mt-5">
          Your data is secure and only shared with the doctor's clinic via WhatsApp.
        </p>
      </div>
    </section>
  );
}
