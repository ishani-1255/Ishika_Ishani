import React, { useEffect, useRef } from 'react';
import { GraduationCap } from 'lucide-react';
import banner2 from '../images/Banner2.png';

const About = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-active');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    const elements = sectionRef.current.querySelectorAll('.animate-hidden');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const education = [
    { institution: "Cochin University of Science and Technology", degree: "B.Tech in Computer Science", year: "Oct 2022 - Mar 2026" },
    { institution: "Indian Institute of Technology, Madras", degree: "BS in Data Science and Applications", year: "Sep 2022 - Sep 2026" },
    { institution: "Pitts Modern School", degree: "Senior Secondary (CBSE)", year: "Apr 2020 - Apr 2022" },
    { institution: "Pitts Modern School", degree: "Secondary School (CBSE)", year: "Apr 2017 - Apr 2020" }
  ];

  return (
    <section id="about" ref={sectionRef} className="font-sora px-6 py-20 md:px-16 flex flex-col md:flex-row gap-12 md:gap-20 overflow-hidden">
      
      {/* Animation Styles */}
      <style jsx>{`
        .animate-hidden { opacity: 0; transform: translateY(30px); transition: all 0.8s ease-out; }
        .animate-active { opacity: 1; transform: translateY(0); }
        .delay-100 { transition-delay: 0.1s; }
        .delay-200 { transition-delay: 0.2s; }
        
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
      `}</style>

      {/* Left Column - Image with Bouncing Animation */}
      <div className="md:w-1/3 flex flex-col items-center animate-hidden">
         <img 
           src={banner2} 
           alt="About Me Illustration" 
           className="w-full max-w-sm sticky top-24 animate-float" 
         />
      </div>
      
      {/* Right Column */}
      <div className="md:w-2/3 space-y-10">
        <div className="space-y-6 animate-hidden delay-100">
          <h2 className="text-3xl md:text-4xl font-normal font-sora">About <span className="font-extrabold">Me</span></h2>
          <p className="text-gray-500 leading-relaxed">
            I am a passionate developer blending the power of development and data science to craft smart, scalable solutions and a dual-degree student pursuing Computer Science at <span className="font-bold text-black">CUSAT</span> and Data Science at <span className="font-bold text-black">IIT Madras</span>.
          </p>  
          <p className="text-gray-500 leading-relaxed">
            My journey is defined by a love for coding and innovation. I am the <span className="font-bold text-black">Winner of Code with Cisco '25</span>, a <span className="font-bold text-black">Jury Choice Awardee at the Accenture Innovation Challenge '24</span>, and a <span className="font-bold text-black">Semi-Finalist in the Google Girl Hackathon '25</span>. 
          </p>
        </div>

        <div className="animate-hidden delay-200">
          <h3 className="text-2xl font-bold mb-6 flex items-center gap-2"><GraduationCap className="text-black" /> Education</h3>
          <div className="border-l-2 border-gray-200 ml-3 space-y-8 pl-8 relative">
            {education.map((edu, index) => (
              <div key={index} className="relative group">
                <div className="absolute -left-[43px] top-1 w-5 h-5 bg-black rounded-full border-4 border-white shadow-sm transition-all duration-300 group-hover:scale-125 group-hover:border-black group-hover:bg-white"></div>
                <h4 className="text-lg font-bold text-black group-hover:translate-x-1 transition-transform">{edu.institution}</h4>
                <p className="text-sm font-semibold text-gray-700">{edu.degree}</p>
                <span className="text-xs text-gray-600 font-mono bg-gray-100 px-2 py-1 rounded inline-block mt-1 mb-2 group-hover:bg-black group-hover:text-white transition-colors">{edu.year}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;