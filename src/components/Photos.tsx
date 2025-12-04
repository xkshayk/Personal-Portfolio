const Photos = () => {
  const photos = [
    { id: 1, title: 'Photo Gallery 1', date: 'September 2023' },
    { id: 2, title: 'Photo Gallery 2', date: 'June - August 2024' },
    { id: 3, title: 'Photo Gallery 3', date: '2018-2024' },
    { id: 4, title: 'Photo Gallery 4', date: 'September 2023' },
    { id: 5, title: 'Photo Gallery 5', date: '2022' },
    { id: 6, title: 'Photo Gallery 6', date: '2023' }
  ]

  return (
    <section id="photos" className="min-h-screen py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-16">Photos</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {photos.map((photo) => (
            <div
              key={photo.id}
              className="relative group cursor-pointer rounded-xl overflow-hidden aspect-[4/3] bg-gradient-to-br from-cyan-200/40 via-blue-200/40 to-teal-200/40 dark:from-slate-800/40 dark:via-blue-800/40 dark:to-cyan-800/40 hover:scale-105 transition-transform duration-300"
            >
              {/* Placeholder background */}
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-gray-400 dark:text-gray-500 text-sm">Photo {photo.id}</span>
              </div>
              
              {/* Title overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex flex-col justify-end p-6">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">{photo.title}</h3>
                <p className="text-sm text-gray-200">{photo.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Photos
