import React, { useState, useEffect, useRef } from 'react';
import { BadgeCheck, Award, LayoutGrid, ArrowLeft, ArrowRight, X } from 'lucide-react';

const Certifications = () => {
  const [viewMode, setViewMode] = useState('carousel');
  const [currentPage, setCurrentPage] = useState(0);
  const sectionRef = useRef(null);

  const certs = [
    { name: "Postman API Fundamentals", issuer: "Postman", date: "Aug 2024" },
    { name: "Intro to ML & Deep Learning", issuer: "Kaggle", date: "Jun 2024" },
    { name: "Introduction to AI", issuer: "IBM", date: "Jun 2024" },
    { name: "Data Analytics Job Simulation", issuer: "Accenture", date: "May 2024" },
    { name: "Software Engineering Job Simulation", issuer: "Goldman Sachs", date: "May 2024" },
    { name: "Google Gen AI Study Jams", issuer: "Google", date: "May 2024" },
    { name: "DBMS - Fundamentals", issuer: "Scaler", date: "Apr 2024" },
    { name: "Getting Started With Docker", issuer: "Simplilearn", date: "Apr 2024" },
    { name: "Python Essentials 1", issuer: "Cisco", date: "Nov 2023" },
    { name: "Digital Marketing Fundamentals", issuer: "Google", date: "Oct 2023" },
    { name: "SQL (Basic) Certification", issuer: "HackerRank", date: "Oct 2023" },
  ];

  const itemsPerPage = 16;
  const totalPages = Math.ceil(certs.length / itemsPerPage);
  const handleNext = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1));
  const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 0));

  // Animation Logic
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if(entry.isIntersecting) entry.target.classList.add('animate-active');
        });
    }, { threshold: 0.1 });
    if(sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const renderCard = (cert, index) => (
    <div key={index} className="w-full h-full p-6 bg-white rounded-xl border border-gray-200 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
      <div className="flex items-start gap-4 mb-4">
        <div className="p-3 bg-black text-white rounded-lg shrink-0"><Award size={24} /></div>
        <div>
          <h4 className="font-bold text-sm leading-tight mb-1 line-clamp-2">{cert.name}</h4>
          <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold">{cert.issuer}</p>
        </div>
      </div>
      <div className="pt-4 border-t border-gray-100 flex items-center justify-between mt-auto">
        <span className="text-xs text-gray-600 font-mono flex items-center gap-1"><BadgeCheck size={14} className="text-green-600" /> Verified</span>
        <span className="text-xs text-gray-600 font-medium">{cert.date}</span>
      </div>
    </div>
  );

  return (
    <section id="certifications" ref={sectionRef} className="font-sora py-16 md:py-20 bg-neutral-50 border-t border-gray-100 relative transition-all duration-500 opacity-0 translate-y-10" style={{ transition: 'opacity 0.8s ease-out, transform 0.8s ease-out' }}>
      <style>{`.animate-active { opacity: 1 !important; transform: translateY(0) !important; }`}</style>
      
      <div className="px-6 md:px-16 mb-12 md:mb-16 relative">
        <div className="flex flex-col md:block items-center">
          <h2 className="text-3xl md:text-4xl text-center mb-6 md:mb-0">Licenses & <span className="font-bold">Certifications</span></h2>
          <button onClick={() => setViewMode(viewMode === 'carousel' ? 'grid' : 'carousel')} className="static md:absolute md:right-12 md:top-1/2 md:-translate-y-1/2 flex items-center gap-2 text-sm font-bold border-b-2 border-black pb-1 hover:text-gray-600 transition">
            {viewMode === 'carousel' ? <>View All <LayoutGrid size={16} /></> : <>Close <X size={16} /></>}
          </button>
        </div>
      </div>

      {viewMode === 'carousel' && (
        <div className="relative w-full group overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-10 md:w-20 bg-gradient-to-r from-neutral-50 to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-10 md:w-20 bg-gradient-to-l from-neutral-50 to-transparent z-10 pointer-events-none"></div>
          <div className="flex gap-4 md:gap-6 animate-infinite-scroll group-hover:paused w-max px-6">
            {[...certs, ...certs].map((cert, index) => <div key={index} className="w-[280px] sm:w-[300px] md:w-[350px] shrink-0">{renderCard(cert, index)}</div>)}
          </div>
        </div>
      )}

      {viewMode === 'grid' && (
        <div className="px-6 md:px-16 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 min-h-[400px]">
            {certs.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage).map((cert, index) => renderCard(cert, index))}
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center mt-12 pt-6 border-t border-gray-200 gap-4">
            <span className="text-sm text-gray-500 order-2 md:order-1">Page {currentPage + 1} of {totalPages}</span>
            <div className="flex gap-4 order-1 md:order-2">
              <button onClick={handlePrev} disabled={currentPage === 0} className="p-3 border rounded-full hover:bg-black hover:text-white disabled:opacity-30 transition"><ArrowLeft size={20} /></button>
              <button onClick={handleNext} disabled={currentPage >= totalPages - 1} className="p-3 border rounded-full hover:bg-black hover:text-white disabled:opacity-30 transition"><ArrowRight size={20} /></button>
            </div>
          </div>
        </div>
      )}
      <style jsx>{`@keyframes infinite-scroll { from { transform: translateX(0); } to { transform: translateX(-50%); } } .animate-infinite-scroll { animation: infinite-scroll 40s linear infinite; }`}</style>
    </section>
  );
};

export default Certifications;