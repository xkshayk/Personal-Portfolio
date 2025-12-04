const About = () => {
  return (
    <section id="about" className="min-h-screen py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="relative">
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-gray-100 mb-16">About Me</h2>
          
          {/* Profile Image - positioned absolutely to align with header */}
          <div className="hidden md:block absolute top-0 right-0">
            <img src="/Akshay Aquarium.png" alt="Profile" className="w-[500px] h-[500px] rounded-lg object-cover" />
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-4 mb-16">
          {/* Bio */}
          <div className="flex flex-col justify-start items-start">
            <p className="text-xl md:text-2xl text-gray-900 dark:text-gray-100 leading-relaxed font-light text-left">
              I'm a Mechanical Engineer student at the University of Toronto with a passion for aerodynamics and competiton. In the future I hope I can combine these interests in a career I love. I've outlined some of the projects I've been lucky enough to be a part of so far, and any feedback or just discussion would be awesome. 
            </p>
          </div>
          
          {/* Mobile Image placeholder */}
          <div className="md:hidden flex items-start justify-center">
            <img src="/Akshay Aquarium.png" alt="Profile" className="w-[420px] h-[420px] rounded-lg object-cover" />
          </div>
        </div>

        {/* Resume Button */}
        <div className="flex justify-start mb-12">
          <a
            href="/Akshay_Kolwalkar_Resume_Tech.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl dark:shadow-white/20 dark:hover:shadow-white/30 transition-all duration-200 transform hover:scale-105"
          >
            Resume
          </a>
        </div>

        {/* Timeline */}
        <div className="mt-16">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-cyan-500 via-blue-500 to-teal-500 dark:from-cyan-600 dark:via-blue-600 dark:to-teal-600"></div>
            
            {/* Timeline points */}
            <div className="grid grid-cols-4 gap-4">
              {/* Point 1 - 2006 */}
              <div className="flex flex-col items-center">
                <div className="w-6 h-6 rounded-full bg-cyan-500 dark:bg-cyan-400 border-4 border-cyan-400 dark:border-slate-950 -mt-2.5 mb-10 z-10 relative"></div>
                <p className="text-xl md:text-2xl text-gray-900 dark:text-gray-100 font-medium text-center mb-5">Born</p>
                <p className="text-3xl md:text-4xl font-bold text-gray-700 dark:text-gray-300">2006</p>
              </div>
              
              {/* Point 2 - 2013 */}
              <div className="flex flex-col items-center">
                <div className="w-6 h-6 rounded-full bg-blue-500 dark:bg-blue-400 border-4 border-cyan-400 dark:border-slate-950 -mt-2.5 mb-10 z-10 relative"></div>
                <p className="text-xl md:text-2xl text-gray-900 dark:text-gray-100 font-medium text-center mb-5">Wanted to be Messi</p>
                <p className="text-3xl md:text-4xl font-bold text-gray-700 dark:text-gray-300">2013</p>
              </div>
              
              {/* Point 3 - 2019 */}
              <div className="flex flex-col items-center">
                <div className="w-6 h-6 rounded-full bg-teal-500 dark:bg-teal-400 border-4 border-cyan-400 dark:border-slate-950 -mt-2.5 mb-10 z-10 relative"></div>
                <p className="text-xl md:text-2xl text-gray-900 dark:text-gray-100 font-medium text-center mb-5">Wanted to be Kevin Durant</p>
                <p className="text-3xl md:text-4xl font-bold text-gray-700 dark:text-gray-300">2019</p>
              </div>
              
              {/* Point 4 - 2025 */}
              <div className="flex flex-col items-center">
                <div className="w-6 h-6 rounded-full bg-cyan-600 dark:bg-cyan-500 border-4 border-cyan-400 dark:border-slate-950 -mt-2.5 mb-10 z-10 relative"></div>
                <p className="text-xl md:text-2xl text-gray-900 dark:text-gray-100 font-medium text-center mb-5">Want to fly jets</p>
                <p className="text-3xl md:text-4xl font-bold text-gray-700 dark:text-gray-300">2025</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
