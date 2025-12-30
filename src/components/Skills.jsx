import React, { useState, useEffect, useRef } from 'react';
import {
  FaJava, FaPython, FaHtml5, FaCss3Alt, FaJs,
  FaReact, FaNodeJs, FaBootstrap, FaGitAlt, FaFigma,
  FaDocker, FaDatabase
} from 'react-icons/fa';
import {
  SiTailwindcss, SiTypescript, SiDjango,
  SiFlask, SiMongodb, SiExpress, SiRedis
} from 'react-icons/si';

const Skills = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [category, setCategory] = useState('All');

  const [currentPage, setCurrentPage] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const ITEMS_PER_PAGE = 6; 

  const sectionRef = useRef(null);


  const allSkills = [

    { name: 'HTML5', icon: <FaHtml5 size={32} />, color: '#f97316', type: 'Frontend' },
    { name: 'CSS3', icon: <FaCss3Alt size={32} />, color: '#3b82f6', type: 'Frontend' },
    { name: 'JavaScript', icon: <FaJs size={32} />, color: '#facc15', type: 'Frontend' },
    { name: 'React', icon: <FaReact size={32} />, color: '#22d3ee', type: 'Frontend' },
    { name: 'TypeScript', icon: <SiTypescript size={32} />, color: '#2563eb', type: 'Frontend' },
    { name: 'Tailwind', icon: <SiTailwindcss size={32} />, color: '#22d3ee', type: 'Frontend' },
    { name: 'Bootstrap', icon: <FaBootstrap size={32} />, color: '#7c3aed', type: 'Frontend' },
    { name: 'Figma', icon: <FaFigma size={32} />, color: '#ec4899', type: 'Frontend' },


    { name: 'Node.js', icon: <FaNodeJs size={32} />, color: '#16a34a', type: 'Backend' },
    { name: 'Express', icon: <SiExpress size={32} />, color: '#6b7280', type: 'Backend' },
    { name: 'Python', icon: <FaPython size={32} />, color: '#eab308', type: 'Backend' },
    { name: 'Django', icon: <SiDjango size={32} />, color: '#166534', type: 'Backend' },
    { name: 'Flask', icon: <SiFlask size={32} />, color: '#000000', type: 'Backend' },
    { name: 'Java', icon: <FaJava size={32} />, color: '#dc2626', type: 'Backend' },


    { name: 'MongoDB', icon: <SiMongodb size={32} />, color: '#22c55e', type: 'Tools' },
    { name: 'SQL', icon: <FaDatabase size={32} />, color: '#00758f', type: 'Tools' },
    { name: 'Redis', icon: <SiRedis size={32} />, color: '#dc2626', type: 'Tools' },
    { name: 'Git', icon: <FaGitAlt size={32} />, color: '#ea580c', type: 'Tools' },
    { name: 'Docker', icon: <FaDocker size={32} />, color: '#2496ed', type: 'Tools' },
  ];

  const filteredSkills = category === 'All' 
    ? allSkills 
    : allSkills.filter(s => s.type === category);

  const totalPages = Math.ceil(filteredSkills.length / ITEMS_PER_PAGE);
  
  const visibleSkills = isMobile 
    ? filteredSkills.slice(currentPage * ITEMS_PER_PAGE, (currentPage + 1) * ITEMS_PER_PAGE)
    : filteredSkills;

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    setCurrentPage(0);
    setActiveIndex(0);
  }, [category]);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % visibleSkills.length);
    }, 1000);
    return () => clearInterval(interval);
  }, [isPaused, visibleSkills.length]);

  useEffect(() => {
    if (!sectionRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-pop-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    setTimeout(() => {
        sectionRef.current
        .querySelectorAll('.skill-card')
        .forEach((el) => observer.observe(el));
    }, 100);

    return () => observer.disconnect();
  }, [visibleSkills]);

  return (
    <section id="languages" ref={sectionRef} className="px-6 py-16 md:px-16 bg-white font-sora min-h-[600px]">
      <style>{`
        .skill-card {
          opacity: 0;
          transform: scale(0.8);
          transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        .animate-pop-in {
          opacity: 1;
          transform: scale(1);
        }
      `}</style>

      <h2 className="text-3xl md:text-4xl text-center mb-8">
        Languages & <span className="font-extrabold">Tools</span>
      </h2>

      <div className="flex justify-center gap-4 mb-12 flex-wrap">
        {['All', 'Frontend', 'Backend', 'Tools'].map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
              category === cat 
                ? 'bg-black text-white' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div
        className={
            isMobile 
            ? "grid grid-cols-3 gap-y-6 place-items-center" 
            : "flex flex-wrap justify-center gap-6 md:gap-8" 
        }
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {visibleSkills.map((skill, index) => {
          const isActive = index === activeIndex;

          return (
            <div
              key={`${skill.name}-${index}`}
              className="skill-card w-24 h-24 flex flex-col items-center justify-center gap-2 border-2 rounded-xl cursor-pointer bg-white transition-all duration-300"
              style={{
                borderColor: isActive ? skill.color : '#e5e7eb',
                transform: isActive ? 'scale(1.1)' : 'scale(1)',
                boxShadow: isActive ? '0 10px 20px rgba(0,0,0,0.1)' : 'none',
                transitionDelay: `${index * 50}ms`,
              }}
            >
              <div
                style={{ color: isActive ? skill.color : '#9ca3af' }}
                className="transition-colors duration-300"
              >
                {skill.icon}
              </div>

              <span className="text-xs font-bold uppercase text-center">
                {skill.name}
              </span>
            </div>
          );
        })}
      </div>

      {isMobile && totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-8">
          {Array.from({ length: totalPages }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentPage(idx)}
              className={`w-2 h-2 rounded-full transition-all ${
                currentPage === idx ? 'bg-black w-6' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default Skills;