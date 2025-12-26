import React, { useState, useEffect, useRef } from 'react';
import {
  FaJava, FaPython, FaHtml5, FaCss3Alt, FaJs,
  FaReact, FaNodeJs, FaBootstrap, FaGitAlt, FaFigma
} from 'react-icons/fa';
import {
  SiTailwindcss, SiTypescript, SiDjango,
  SiFlask, SiMongodb, SiExpress
} from 'react-icons/si';

const Skills = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const sectionRef = useRef(null);

  const skills = [
    { name: 'Bootstrap', icon: <FaBootstrap size={32} />, color: '#7c3aed' },
    { name: 'Git', icon: <FaGitAlt size={32} />, color: '#ea580c' },
    { name: 'Java', icon: <FaJava size={32} />, color: '#dc2626' },
    { name: 'Python', icon: <FaPython size={32} />, color: '#eab308' },
    { name: 'HTML5', icon: <FaHtml5 size={32} />, color: '#f97316' },
    { name: 'CSS3', icon: <FaCss3Alt size={32} />, color: '#3b82f6' },
    { name: 'JavaScript', icon: <FaJs size={32} />, color: '#facc15' },
    { name: 'Tailwind', icon: <SiTailwindcss size={32} />, color: '#22d3ee' },
    { name: 'Figma', icon: <FaFigma size={32} />, color: '#ec4899' },
    { name: 'React', icon: <FaReact size={32} />, color: '#22d3ee' },
    { name: 'TypeScript', icon: <SiTypescript size={32} />, color: '#2563eb' },
    { name: 'Django', icon: <SiDjango size={32} />, color: '#166534' },
    { name: 'Flask', icon: <SiFlask size={32} />, color: '#000000' },
    { name: 'MongoDB', icon: <SiMongodb size={32} />, color: '#22c55e' },
    { name: 'Express', icon: <SiExpress size={32} />, color: '#6b7280' },
    { name: 'Node.js', icon: <FaNodeJs size={32} />, color: '#16a34a' },
  ];

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % skills.length);
    }, 1000);
    return () => clearInterval(interval);
  }, [isPaused, skills.length]);

  // Scroll animation
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

    sectionRef.current
      .querySelectorAll('.skill-card')
      .forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section id="languages" ref={sectionRef} className="px-6 py-16 md:px-16 bg-white font-sora">
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

      <h2 className="text-3xl md:text-4xl text-center mb-16">
        Languages & <span className="font-extrabold">Tools</span>
      </h2>

      <div
        className="flex flex-wrap justify-center gap-6 md:gap-8"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {skills.map((skill, index) => {
          const isActive = index === activeIndex;

          return (
            <div
              key={index}
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
    </section>
  );
};

export default Skills;
