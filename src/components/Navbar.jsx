import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="font-sora flex md:justify-center justify-between items-center px-6 py-6 md:px-16 bg-white sticky top-0 z-50 border-b md:border-none border-gray-100 animate-slide-down">
      <style>{`
        @keyframes slideDown {
          from { transform: translateY(-100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-slide-down { animation: slideDown 0.6s ease-out forwards; }
      `}</style>

      <div className="text-2xl font-bold flex items-center gap-2 md:hidden">
         {/* Mobile Logo Placeholder if needed */}
         <span className="font-bold">Portfolio</span>
      </div>
      
      <div className="hidden md:flex gap-8 font-medium text-gray-600 font-sora">
        {['About Me', 'Languages', 'Experience', 'Projects', 'Certifications', 'Articles', 'Contact Me'].map((item, i) => (
           <a key={i} href={`#${item.toLowerCase().split(' ')[0]}`} className="hover:text-black hover:-translate-y-0.5 transition-all duration-200">{item}</a>
        ))}
      </div>

      <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <X size={28} /> : <Menu size={28} />}
      </button>
 
      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-white border-b border-gray-200 p-6 flex flex-col gap-6 md:hidden shadow-lg animate-in slide-in-from-top-5">
           {['About Me', 'Skills', 'Projects', 'Contact Me'].map((item) => (
             <a key={item} href={`#${item.toLowerCase().split(' ')[0]}`} onClick={() => setIsOpen(false)} className="text-lg font-medium">{item}</a>
           ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
