import React, { useEffect, useRef } from 'react';

const Experience = () => {
  const sectionRef = useRef(null);
  
  const experiences = [
    { company: 'ServiceNow', role: 'Associate Software Engineer Intern', date: 'May 2025 - Jul 2025', desc: 'Worked on a Generative AI tool that automates technical documentation aiming to streamline and reduce manual effort.', active: true },
    { company: 'TinkerHub', role: 'Developer Associate', date: 'Feb 2025 - Apr 2025', desc: 'Development of TinkerHub website, and managing organization automation tasks increasing user engagement.', active: false },
    { company: 'Brainspired Labs', role: 'Application Developer', date: 'Nov 2024 - Jan 2025', desc: 'Developed an Android application enabling Bluetooth connectivity and implemented new features for client-facing software.', active: false },
    { company: 'Napmar Automations', role: 'AI Automation Engineer', date: 'Dec 2023 - Feb 2024', desc: 'Deployed Voiceflow-based chatbots for seamless AI-driven automation; streamlined customer support processes, reducing manual intervention.', active: false },
    { company: 'Realyt Estate', role: 'Frontend Development Intern', date: 'Sept 2023 - Jan 2024', desc: 'Developed React-based landing pages for a startup’s initial phase, increasing lead conversion rates and user engagement .', active: false },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-active');
        }
      });
    }, { threshold: 0.1 });

    const elements = sectionRef.current.querySelectorAll('.animate-hidden');
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="experiences" ref={sectionRef} className="font-sora bg-black text-white px-0 py-20 md:px-16 overflow-hidden">
      <style>{`
        .animate-hidden { opacity: 0; transform: translateY(20px); transition: all 0.6s ease-out; }
        .animate-active { opacity: 1; transform: translateY(0); }
      `}</style>
      
      <h2 className="text-3xl md:text-4xl text-center mb-10 md:mb-16 animate-hidden px-6">
        My <span className="font-bold">Experience</span>
      </h2>
      
      <div className="max-w-4xl mx-auto">
        <div className="
          flex 
          flex-row overflow-x-auto snap-x snap-mandatory gap-4 px-6 pb-4 no-scrollbar
          md:flex-col md:overflow-visible md:gap-6 md:px-0 md:pb-0
        ">
          {experiences.map((exp, index) => (
            <div 
              key={index} 
              className={`
                animate-hidden
                /* Mobile Sizing: Fixed width, no shrink */
                min-w-[85vw] flex-shrink-0 snap-center
                /* Desktop Sizing: Auto width */
                md:min-w-0 md:flex-shrink md:snap-align-none

                p-6 md:p-8 rounded-xl border border-zinc-800
                ${exp.active ? 'bg-zinc-900 border-zinc-700' : 'bg-transparent hover:bg-zinc-900'}
                transition-all duration-300 hover:scale-[1.02]
              `}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-2">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center font-bold text-xs text-white shrink-0">
                    {exp.company[0]}
                  </div>
                  <h3 className="text-lg md:text-xl font-bold">{exp.role} at {exp.company}</h3>
                </div>
                <span className="text-zinc-500 text-sm font-medium">{exp.date}</span>
              </div>
              <p className="text-zinc-400 leading-relaxed text-sm md:text-base">
                {exp.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;