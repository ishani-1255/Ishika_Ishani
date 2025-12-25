import React, { useEffect, useState } from 'react';
import { Linkedin, Github, Twitter, BookOpen } from 'lucide-react';
import banner from '../images/Banner.png';

const Hero = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <section className="px-6 pt-10 pb-20 md:px-16 md:py-20 flex flex-col-reverse md:flex-row items-center justify-between gap-10 overflow-hidden">
      
      <div className={`md:w-1/2 space-y-6 text-center md:text-left transition-all duration-1000 ease-out transform ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <h1 className="text-4xl md:text-6xl leading-tight text-black font-sora">
          Hello I am <span className="font-extrabold">Ishika Ishani.</span> <br />
          <span className="londrina-outline-regular text-5xl md:text-7xl">Software</span>{' '}
          <span className="font-extrabold">Developer</span> <br />
          Based in <span className="font-extrabold"> <span className="londrina-outline-regular text-5xl md:text-7xl"> India.</span></span>
        </h1>

        <p className="text-gray-500 max-w-lg mx-auto md:mx-0 leading-relaxed font-sora delay-200">
          Former ASE Intern @ServiceNow. Passionate about Fullstack, AI, Data Science, and building scalable applications.
        </p>

        {/* Social Links */}
        <div className="flex gap-5 justify-center md:justify-start pt-4">
          {[
            { href: "https://www.linkedin.com/in/ishika-ishani/", icon: <Linkedin size={20} /> },
            { href: "https://github.com/ishani-1255", icon: <Github size={20} /> },
            { href: "https://x.com/cranes_flying", icon: <Twitter size={20} /> },
            { href: "https://ishikaishani.hashnode.dev/", icon: <BookOpen size={20} /> }
          ].map((link, index) => (
            <a
              key={index}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`p-3 border-2 border-black rounded hover:bg-black hover:text-white transition-all duration-200 hover:-translate-y-1 transform ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
              style={{ transitionDelay: `${index * 100 + 300}ms` }}
            >
              {link.icon}
            </a>
          ))}
        </div>
      </div>

      <div className={`md:w-1/2 flex justify-center transition-all duration-1000 ease-out delay-300 transform ${loaded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
        <img src={banner} alt="Hero" className="w-full max-w-md mx-auto object-contain animate-float" />
      </div>

      <style jsx>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default Hero;