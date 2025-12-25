import React, { useState, useEffect, useRef } from 'react';
import { Youtube, Twitter, Linkedin, Mail } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', website: '', message: '' });
  const sectionRef = useRef(null);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const subject = `Portfolio Contact from ${formData.name}`;
    const body = `Name: ${formData.name}%0D%0AEmail: ${formData.email}%0D%0AWebsite: ${formData.website}%0D%0A%0D%0AMessage:%0D%0A${formData.message}`;
    window.location.href = `mailto:ishaniishika31@gmail.com?subject=${subject}&body=${body}`;
    setFormData({ name: '', email: '', website: '', message: '' });
  };

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if(entry.isIntersecting) entry.target.classList.add('animate-active');
        });
    }, { threshold: 0.2 });
    const elements = sectionRef.current.querySelectorAll('.animate-hidden');
    elements.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="contact" ref={sectionRef} className="font-sora px-6 py-20 md:px-16 md:py-32 flex flex-col md:flex-row gap-16 bg-white overflow-hidden">
      <style>{`
        .animate-hidden.left { opacity: 0; transform: translateX(-30px); transition: all 0.8s ease-out; }
        .animate-hidden.right { opacity: 0; transform: translateX(30px); transition: all 0.8s ease-out; }
        .animate-active { opacity: 1 !important; transform: translateX(0) !important; }
      `}</style>

      <div className="w-full md:w-1/2 animate-hidden left">
        <form onSubmit={handleSubmit} className="space-y-6">
          <input name="name" value={formData.name} onChange={handleChange} type="text" placeholder="Your name" required className="w-full p-4 border-2 border-black rounded focus:outline-none focus:ring-4 focus:ring-black/10 placeholder-gray-500 transition-all" />
          <input name="email" value={formData.email} onChange={handleChange} type="email" placeholder="Email" required className="w-full p-4 border-2 border-black rounded focus:outline-none focus:ring-4 focus:ring-black/10 placeholder-gray-500 transition-all" />
          <input name="website" value={formData.website} onChange={handleChange} type="url" placeholder="Your website (If exists)" className="w-full p-4 border-2 border-black rounded focus:outline-none focus:ring-4 focus:ring-black/10 placeholder-gray-500 transition-all" />
          <textarea name="message" value={formData.message} onChange={handleChange} placeholder="How can I help?*" rows="4" required className="w-full p-4 border-2 border-black rounded focus:outline-none focus:ring-4 focus:ring-black/10 placeholder-gray-500 transition-all"></textarea>
          <div className="flex flex-col md:flex-row gap-4 items-center">
             <button type="submit" className="w-full md:w-auto px-8 py-4 bg-black text-white font-bold rounded hover:bg-neutral-800 transition active:scale-95">Get In Touch</button>
             <div className="flex gap-4 items-center justify-center md:justify-start">
               <a href="https://www.linkedin.com/in/ishika-ishani/" target="_blank" rel="noopener noreferrer" className="p-3 bg-black text-white rounded cursor-pointer hover:bg-neutral-800 hover:-translate-y-1 transition-transform"><Linkedin size={20}/></a>
               <a href="https://www.youtube.com/@ishikaishani894" target="_blank" rel="noopener noreferrer" className="p-3 bg-black text-white rounded cursor-pointer hover:bg-neutral-800 hover:-translate-y-1 transition-transform"><Youtube size={20}/></a>
               <a href="https://x.com/cranes_flying" target="_blank" rel="noopener noreferrer" className="p-3 bg-black text-white rounded cursor-pointer hover:bg-neutral-800 hover:-translate-y-1 transition-transform"><Twitter size={20}/></a>
             </div>
          </div>
        </form>
      </div>

      <div className="w-full md:w-1/2 space-y-6 mt-10 md:mt-0 animate-hidden right">
        <h2 className="text-4xl md:text-5xl font-extrabold leading-tight">
          Let's <span className="londrina-outline-regular text-4xl md:text-6xl"> talk </span>  for <br /> Something special
        </h2>
        <p className="text-gray-500 max-w-sm">
          I seek to push the limits of creativity to create high-engaging, user-friendly, and memorable interactive experiences.
        </p>
        <div className="pt-4 space-y-2">
           <a href="mailto:ishaniishika31@gmail.com" className="text-lg font-bold flex items-center gap-2 hover:underline underline-offset-4"><Mail size={20} /> ishaniishika31@gmail.com</a>
        </div>
      </div>
    </section>
  );
};

export default Contact;