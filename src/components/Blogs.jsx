import React, { useState, useEffect, useRef } from 'react';
import { ArrowUpRight, Calendar, Clock, ArrowLeft, ArrowRight } from 'lucide-react';

const Blogs = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const sectionRef = useRef(null);

  const blogs = [
    { title: "Enhancing Data Analysis with Python Libraries", date: "May 4, 2024", readTime: "10 min read", tag: "Python", image:"https://cdn.hashnode.com/res/hashnode/image/upload/v1714812578418/ca26902c-4388-4663-8e1f-abd9508dbe00.jpeg", link: "https://ishikaishani.hashnode.dev/series/data-analysis-python" },
    { title: "Understanding Docker", date: "Apr 13, 2024", readTime: "14 min read", tag: "Docker", image: "https://cdn.hashnode.com/res/hashnode/image/upload/v1712887586399/96d8c42e-fe23-4392-b7ac-f5269ebc974b.png", link:"https://ishikaishani.hashnode.dev/series/docker" },
    { title: "Understanding How Internet Works", date: "Nov 9, 2024", readTime: "7 min read", tag: "Networks", image: "https://cdn.hashnode.com/res/hashnode/image/upload/v1731140195616/ad963bef-cad0-446b-b1c1-0118b7bae118.jpeg", link:"https://ishikaishani.hashnode.dev/how-the-internet-works" },
    { title: "Building Web Applications with Django", date: "May 5, 2024", readTime: "16 min read", tag: "Django", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRB6x4zTOJ5nxL5y7TDzu6AXNbFBA9Vx0TaTg&s", link:"https://ishikaishani.hashnode.dev/series/django" },
    { title: "Understanding Transformers in Deep Learning", date: "June 25, 2024", readTime: "6 min read", tag: "Deep Learning", image: "https://cdn.hashnode.com/res/hashnode/image/upload/v1719310186008/e747a6b3-9099-4dfc-90db-052b71eaefb9.avif", link:"https://ishikaishani.hashnode.dev/understanding-transformers-in-deep-learning" },
    { title: "Automating Git Operations with Bash", date: "Jan 23, 2024", readTime: "4 min read", tag: "Scripting", image: "https://cdn.hashnode.com/res/hashnode/image/upload/v1716435048241/f7e44de2-8ee0-4062-9df3-96007b15ed01.avif", link:"https://ishikaishani.hashnode.dev/automating-git-operations-with-bash" }
  ];

  const itemsPerPage = 3;
  const totalPages = Math.ceil(blogs.length / itemsPerPage);
  const handleNext = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1));
  const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 0));
  const currentBlogs = blogs.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if(entry.isIntersecting) entry.target.classList.add('animate-active');
        });
    }, { threshold: 0.1 });
    const elements = sectionRef.current.querySelectorAll('.animate-item');
    elements.forEach(el => {
        el.classList.remove('animate-active');
        observer.observe(el);
    });
    return () => observer.disconnect();
  }, [currentPage]);

  return (
    <section id="articles" ref={sectionRef} className="font-sora px-6 py-20 md:px-16 bg-white border-b border-gray-100">
      <style>{`.animate-item { opacity: 0; transform: translateY(20px); transition: all 0.6s ease-out; } .animate-active { opacity: 1 !important; transform: translateY(0) !important; }`}</style>
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
        <div className="w-full text-center md:text-left">
          <h2 className="text-3xl md:text-4xl text-center mb-8">Latest <span className="font-bold">Articles</span></h2>
          <p className="text-zinc-500">Page {currentPage + 1} of {totalPages}</p>
        </div>
        <div className="flex gap-4">
          <button onClick={handlePrev} disabled={currentPage === 0} className="p-3 border border-gray-300 rounded-full hover:bg-black hover:text-white disabled:opacity-30 transition"><ArrowLeft size={20} /></button>
          <button onClick={handleNext} disabled={currentPage >= totalPages - 1} className="p-3 border border-gray-300 rounded-full hover:bg-white hover:text-white disabled:opacity-30 transition"><ArrowRight size={20} /></button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 min-h-[450px]">
        {currentBlogs.map((blog, index) => (
           <article key={index} className="animate-item group cursor-pointer flex flex-col h-full border border-gray-100 rounded-2xl hover:shadow-xl hover:border-gray-200 transition-all duration-300 hover:-translate-y-2 bg-white" style={{ transitionDelay: `${index * 100}ms` }}>
             <div className="h-52 overflow-hidden rounded-t-2xl relative">
                <img src={blog.image} alt={blog.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 text-xs font-bold rounded-full border border-gray-200 shadow-sm uppercase">{blog.tag}</div>
             </div>
             <div className="p-6 flex flex-col flex-grow">
               <div className="flex items-center gap-4 text-xs text-gray-500 mb-4 font-medium">
                  <div className="flex items-center gap-1"><Calendar size={14} /> {blog.date}</div>
                  <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                  <div className="flex items-center gap-1"><Clock size={14} /> {blog.readTime}</div>
               </div>
               <h3 className="text-xl font-bold leading-tight mb-4 group-hover:text-gray-700 transition-colors">{blog.title}</h3>
               <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between text-sm font-bold">
                 <span>Read Article</span>
                 <a href={blog.link} target="_blank" rel="noopener noreferrer"><ArrowUpRight size={18} className="text-gray-400 group-hover:text-black transition-colors" /></a>
               </div>
             </div>
           </article>
        ))}
      </div>
    </section>
  );
};

export default Blogs;