const About = () => {
  return (
    <section id="about" className="min-h-screen py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-gray-100 mb-16">About Me</h2>
        
        <div className="grid md:grid-cols-2 gap-4 mb-16">
          {/* Profile Image */}
          <div className="flex items-start justify-start">
            <img src="/src/resources/Akshay Aquarium.png" alt="Profile" className="w-[420px] h-[420px] rounded-lg object-cover" />
          </div>
          
          {/* Bio */}
          <div className="flex flex-col justify-center items-center">
            <p className="text-5xl md:text-6xl text-gray-900 dark:text-gray-100 leading-relaxed font-light text-center">
              I love racing, beaches, and biryani
            </p>
          </div>
        </div>

        {/* Timeline */}
        <div className="mt-32">
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
