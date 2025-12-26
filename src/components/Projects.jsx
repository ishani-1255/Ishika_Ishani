import React, { useState, useEffect, useRef } from 'react';
import { ExternalLink, Github, ArrowLeft, ArrowRight } from 'lucide-react';

const Projects = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const sectionRef = useRef(null);

  const projects = [
   { title: "OncoSense", desc: "AI-powered early cancer detection analyzing medical images and reports.", tech: "Node.js, React, Python", gitlink:"https://github.com/ishani-1255/OncoSense", link:"https://genai-ai-cancer-detection.onrender.com" },
   { title: "Saarthi", desc: "AI platform personalized learning paths and career guidance.", tech: "React, Tailwind, Gemini API", gitlink:"https://github.com/ishani-1255/Saarthi", link:"https://vercel-saarthi.vercel.app/main" },
   { title: "Arogya", desc: "Healthcare support system for prescription and symptom analysis.", tech: "Node.js, React, Gemini API", gitlink: "https://github.com/ishani-1255/Arogya", link: "https://youtu.be/5GKeNg_fuN0" },
   { title: "CusaQuest", desc: "Placement management system. Winner: Make-A-Ton'24", tech: "React, Node.js", gitlink: "https://github.com/ishani-1255/CusaQuest", link : "https://github.com/ishani-1255/CusaQuest" },
   { title: "TrackSmart", desc: "TrackSmart is an open-source, BECKN-based platform for unified, real-time shipment tracking across India.", tech: "React, Node.js, OpenStreetMap(OSM)API", gitlink: "https://github.com/ishani-1255/TrackSmart", link : "https://tracksmart.onrender.com/" },
   { title: "SecureScan", desc: " A one-click plugin that sniffs out messy vibe code, open vulnerabilities, and sneaky edge cases, cutting development and QA time from months to minutes.", tech: "React, Node.js, VS Extension", gitlink: "https://github.com/ishani-1255/AI-Grand-Challenge", link : "https://marketplace.visualstudio.com/items?itemName=ar1701.vscode-secure-code-analyzer" },
   { title: "Aquagrove", desc: "ML project for capillary irrigation systems.", tech: "Python", gitlink: "https://github.com/ishani-1255/AquaGrove", link : "https://github.com/ishani-1255/AquaGrove" },
   { title: "CryptoTrackX", desc: "Real-time crypto tracking dashboard.", tech: "React, Tailwind, TypeScript, Chart.js, CoinGecko API ", gitlink: "https://github.com/ishani-1255/Crypto_Portfolio", link : "crypto-portfolio-ten.vercel.app" },
   { title: "Git Auto", desc: "Python script to automate Git operations.", tech: "Python, Scripting", gitlink: "https://github.com/ishani-1255/git_automate", link : "https://github.com/ishani-1255/git_automate" },
   { title: "TinyMLHackathon", desc: "Official website for TinyML Hackathon 2024.", tech: "React, Tailwind", gitlink: "https://github.com/MakerGram/tinymlhack2024", link : "https://tinymlhack.com/" },
   { title: "Disease Predictor", desc: "Platform for detection of diabetes, Parkinson's disease, and heart conditions through machine learning algorithms.", tech: "React, Tailwind, Python, Streamlit", gitlink: "https://github.com/ishani-1255/multiple_diseases_prediction", link : "https://multiplediseasesprediction-giybqcaj2anbntwsujhm8h.streamlit.app/" },
   { title: "NoteSync", desc: "NoteSync is a Chrome extension that allows users to take notes specific to individual websites.", tech: "HTML,CSS, JavaScript", gitlink: "https://github.com/ishani-1255/Note_Sync", link : "https://github.com/ishani-1255/Note_Sync" },
  ];

  const itemsPerPage = 4;
  const totalPages = Math.ceil(projects.length / itemsPerPage);
  const handleNext = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1));
  const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 0));
  const currentProjects = projects.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

  // Re-trigger animation when page changes
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if(entry.isIntersecting) {
            entry.target.classList.add('animate-active');
            entry.target.classList.remove('opacity-0', 'translate-y-10');
        }
      });
    }, { threshold: 0.1 });

    const elements = sectionRef.current.querySelectorAll('.animate-item');
    elements.forEach(el => {
        // Reset state for re-animation on page change
        el.classList.remove('animate-active');
        el.classList.add('opacity-0', 'translate-y-10');
        observer.observe(el);
    });

    return () => observer.disconnect();
  }, [currentPage]);

  return (
    <section id="projects" ref={sectionRef} className="font-sora bg-black text-white py-20 px-6 md:px-16">
      <style>{`
        .animate-active { opacity: 1 !important; transform: translateY(0) !important; transition: all 0.6s ease-out; }
      `}</style>
      
      <div className="flex flex-col md:flex-row justify-between items-end mb-12">
        <div className="w-full text-center md:text-left">
           <h2 className="text-3xl md:text-4xl text-center mb-8">My <span className="font-bold">Projects</span></h2>
           <p className="text-zinc-500">Page {currentPage + 1} of {totalPages}</p>
        </div>
        <div className="hidden md:flex gap-4">
          <button onClick={handlePrev} disabled={currentPage === 0} className="p-3 border border-zinc-700 rounded-full hover:bg-white hover:text-black disabled:opacity-30 transition-colors"><ArrowLeft size={20} /></button>
          <button onClick={handleNext} disabled={currentPage >= totalPages - 1} className="p-3 border border-zinc-700 rounded-full hover:bg-white hover:text-black disabled:opacity-30 transition-colors"><ArrowRight size={20} /></button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 min-h-[500px]">
        {currentProjects.map((p, i) => (
          <div key={i} className="animate-item opacity-0 translate-y-10 group border border-zinc-800 bg-zinc-900/50 rounded-2xl overflow-hidden hover:border-zinc-600 transition-all duration-300 flex flex-col hover:-translate-y-2">
            <div className="h-auto overflow-hidden relative">
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
            </div>
            <div className="p-6 flex flex-col flex-grow">
              <div className="flex justify-between items-start mb-4">
                 <h3 className="text-2xl font-bold">{p.title}</h3>
                 <div className="flex gap-3">
                   <a href={p.gitlink} target="_blank" className="text-zinc-400 hover:text-white transition"><Github size={20} /></a>
                   {p.link && <a href={p.link} target="_blank" className="text-zinc-400 hover:text-white transition"><ExternalLink size={20} /></a>}
                 </div>
              </div>
              <p className="text-zinc-400 mb-6 line-clamp-2">{p.desc}</p>
              <div className="mt-auto flex flex-wrap gap-2">
                  {p.tech.split(', ').map((t, idx) => <span key={idx} className="text-xs font-mono text-zinc-300 bg-zinc-800 px-2 py-1 rounded border border-zinc-700">{t}</span>)}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Mobile Nav */}
      <div className="flex md:hidden justify-center gap-4 mt-8">
          <button onClick={handlePrev} disabled={currentPage === 0} className="p-3 border border-zinc-700 rounded-full hover:bg-white hover:text-black disabled:opacity-30 transition-colors"><ArrowLeft size={20} /></button>
          <button onClick={handleNext} disabled={currentPage >= totalPages - 1} className="p-3 border border-zinc-700 rounded-full hover:bg-white hover:text-black disabled:opacity-30 transition-colors"><ArrowRight size={20} /></button>
      </div>
    </section>
  );
};

export default Projects;
