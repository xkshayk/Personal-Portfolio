import { useState, Suspense, useEffect } from 'react'
import RobotArmModel from './RobotArmModel.tsx'

interface Project {
  id: number
  title: string
  description: string
  images: string[]
  captions: string[]
}

const Projects = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState<{ [key: number]: number }>({})
  const [Canvas, setCanvas] = useState<any>(null)
  const [components, setComponents] = useState<any>(null)

  useEffect(() => {
    // Dynamically load Three.js components
    import('@react-three/fiber').then(module => {
      setCanvas(() => module.Canvas)
    }).catch(err => {
      console.error('Failed to load Canvas:', err)
    })

    import('@react-three/drei').then(module => {
      setComponents(module)
    }).catch(err => {
      console.error('Failed to load drei:', err)
    })
  }, [])

  const nextImage = (projectId: number, totalImages: number, e: React.MouseEvent) => {
    e.stopPropagation()
    setCurrentImageIndex(prev => ({
      ...prev,
      [projectId]: ((prev[projectId] || 0) + 1) % totalImages
    }))
  }

  const prevImage = (projectId: number, totalImages: number, e: React.MouseEvent) => {
    e.stopPropagation()
    setCurrentImageIndex(prev => ({
      ...prev,
      [projectId]: ((prev[projectId] || 0) - 1 + totalImages) % totalImages
    }))
  }

  const projects: Project[] = [
    {
      id: 1,
      title: 'NASA Space Apps - Meteor Madness',
      description: ' NEOScope is a near Earth object visualization tool for viewing orbital paths of potentially hazardous asteroids, the consequences of their impact with Earth, and for simulating potential mitigation strategies. We used NASA databases such as the Small- Body Database Query and Sentry: Earth Impacts to filter over 1.5 million data points and extract the data required to map the trajectories and calculate impact magnitudes of 40 asteroids using Euclidean Keplerian Orbital mechanics. Won awards in the Local Impact and Most Inspirational categories at the 2025 NASA Space Apps Hackathon in Toronto.',
      images: [
        '/3D Viz.png',
        '/Impact Sim.png',
        '/NASA Space Apps Website Pic 3.png'
      ],
      captions: [
        'NASA Space Apps - 3D Visualization',
        'NASA Space Apps - Asteroid Impact Sim',
        'NASA Space Apps - Awards + Partner!'
      ]
    },
    {
      id: 2,
      title: 'UTAT Satellite Path Simulation',
      description: 'This project is an attitude planning and guidance package for the UTAT ADCS team supporting the FINCH satellite mission. It generates satellite attitude profiles using NASA SPICE ephemeris for dual-mode operations: sun-pointing (power generation via solar arrays) and target tracking (hyperspectral crop imaging). FINCH (Field Imaging Nanosatellite for Crop residue Hyperspectral mapping) is a 3U CubeSat demonstrating Volume Phase Holographic (VPH) grism technology for SWIR hyperspectral remote sensing of agricultural crop residue. \nLaunch target: Q3 2028. \n NASA SPICE toolkit via SpiceyPy Python wrapper, DE440 latest planetary ephemeris kernels, ICRF/J2000 Earth-centered inertial reference frame, Hamiltonian scalar-first quaternions [w,x,y,z] for Tensortech ADCS 10m compatibility, pickle-based hourly ephemeris caching, mode switching logic with battery/rate/exclusion zone safety constraints, STK `.a` attitude file export format.',
      images: ['/UTAT Picture.png'],
      captions: ['Orbital trajectory visualization', 'Simulation control panel']
    },
    {
      id: 3,
      title: 'Prosthetic Leg Redesign',
      description: 'Incorporated variable stiffness actuators into a prosthetic leg design to add adjustable tension capabilities while significantly reducing overall weight and cost compared to market alternatives. Researched human gait biomechanics and prosthetic technologies to inform design choices. Utilized Onshape for 3D modeling and simulation, followed by prototype fabrication and testing to validate performance improvements in comfort and functionality for users. Final basic prototype achieved an adjustable load stiffness between 0.7 - 4.4 (500% variability) pounds of force when simulating walking conditions.',
      images: [
        '/Prosthetic Leg Proj Pic 1.png',
        '/Prosthetic Leg Proj Results 2.png',
        '/Prosthetic Leg Proj Results 3.png'
      ],
      captions: ['Prototype', 'Spring Angles Tested', 'Results (Constant Displacement)']
    },
    {
      id: 4,
      title: 'F1Tenth Competition',
      description: 'Using Autodrive, ROS2, and Reinforcement Learning to develop an autonomous racing vehicle for the F1Tenth competition. Implementing path planning, computer vision, and control algorithms to navigate a 1/10th scale racecar powered by an Nvidia Jetson NX. RL algorithm training in F1Tenth gym enviromnment. Planning to compete at the IEEE Vehicular Technology Conference in Boston, September 2026',
      images: ['/F1Tenth2.png','/F1Tenth.png'],
      captions: ['Racecar','AutoDrive Simulator View']
    },
    {
      id: 5,
      title: 'Robotic Arm',
      description: 'Designed a multi-axis robotic camera arm that meets key engineering targets for reach, payload, speed, and precision, while remaining lightweight, modular, and cost-effective for independent cinematographers. The system achieves a working reach of roughly 0.75m, supports a ~1 kg camera payload, and maintains motion accuracy within ±0.5 mm, outperforming the original tolerance goals. To satisfy usability constraints, the total assembly was kept under roughly forty-five kilograms, and a total material cost ~$5,500 (<$8,000 target). I focused on designing the end effector in SolidWorks and specifying materials and components for the entire design to meet performance targets. Created a compact two-axis pan-tilt mechanism, selected lightweight aluminum and carbon-fiber elements to reduce inertia, and determined stepper motors and gearing capable of delivering appropriate torque for rapid, precise orientation of the camera.',
      images: [
        '/Solidworks 1.png',
        '/Solidworks 2.png',
        '/243 Robot Project Project Management.png'
      ],
      captions: ['Finished Robotic arm assembly', 'Exploded View + Bill of Materials', 'Project Management Tools']
    },
    {
      id: 6,
      title: 'Spotify Playlist Cleaner',
      description: 'Swipe right to keep, left to remove. Filter by playlist, date, artist, and more. In progress.',
      images: ['/Spotify Logo.png'],
      captions: ['Coming soon']
    }
  ]

  return (
    <>
      <section id="projects" className="min-h-screen py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-16">Projects</h2>
          
          <div className="grid grid-cols-1 gap-6">
            {projects.map((project) => {
              const currentIndex = currentImageIndex[project.id] || 0
              return (
                <div key={project.id}>
                  <div className="rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border-4 border-gray-800 dark:border-gray-300">
                    <div className="bg-gradient-to-br from-cyan-200/30 via-blue-200/30 to-teal-200/30 dark:from-slate-950/30 dark:via-blue-900/30 dark:to-cyan-900/30 backdrop-blur-lg rounded-xl overflow-hidden">
                      <div className="flex flex-col md:flex-row">
                        {/* Left side - Text content */}
                        <div className="md:w-1/2 p-8 flex flex-col justify-center">
                          <h3 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-6">
                            {project.title}
                          </h3>
                          <p className="text-black dark:text-gray-300 text-lg font-medium white-space-pre-line">
                            {project.description}
                          </p>
                        </div>
                        
                        {/* Right side - Image carousel */}
                        <div className="md:w-1/2 flex flex-col">
                          {/* Fixed height image container with consistent padding */}
                          <div className="flex items-center justify-center p-4 h-[550px]">
                            <img 
                              src={project.images[currentIndex]} 
                              alt={project.captions[currentIndex]}
                              className={`max-h-full object-contain ${
                                project.id === 6 ? 'w-[400px]' : 'max-w-full'
                              }`}
                            />
                          </div>
                          
                          {/* Caption and navigation controls - consistent spacing below image */}
                          <div className="px-8 pb-4">
                            <div className="flex items-center justify-between gap-4">
                              {/* Left arrow */}
                              {project.images.length > 1 ? (
                                <button
                                  onClick={(e) => prevImage(project.id, project.images.length, e)}
                                  className="flex-shrink-0 text-gray-900 dark:text-gray-100 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                                  aria-label="Previous image"
                                >
                                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                                  </svg>
                                </button>
                              ) : (
                                <div className="w-6" />
                              )}
                              
                              {/* Caption text */}
                              <p className="text-base md:text-lg font-semibold text-gray-900 dark:text-gray-100 text-center flex-1">
                                {project.captions[currentIndex]}
                              </p>
                              
                              {/* Right arrow */}
                              {project.images.length > 1 ? (
                                <button
                                  onClick={(e) => nextImage(project.id, project.images.length, e)}
                                  className="flex-shrink-0 text-gray-900 dark:text-gray-100 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                                  aria-label="Next image"
                                >
                                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                                  </svg>
                                </button>
                              ) : (
                                <div className="w-6" />
                              )}
                            </div>
                            
                            {/* Image indicators */}
                            {project.images.length > 1 && (
                              <div className="flex justify-center gap-2 mt-3">
                                {project.images.map((_, idx) => (
                                  <button
                                    key={idx}
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      setCurrentImageIndex(prev => ({ ...prev, [project.id]: idx }))
                                    }}
                                    className={`h-2 rounded-full transition-all ${
                                      idx === currentIndex 
                                        ? 'bg-gray-900 dark:bg-gray-100 w-6' 
                                        : 'bg-gray-400 dark:bg-gray-600 w-2 hover:bg-gray-600 dark:hover:bg-gray-400'
                                    }`}
                                    aria-label={`Go to image ${idx + 1}`}
                                  />
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* 3D Viewer for Robotic Arm Project */}
                  {project.id === 5 && Canvas && components && (
                    <>
                      <h4 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100 mt-8 mb-4">Final 3D Model:</h4>
                      <div className="w-full h-[500px] bg-gradient-to-br from-gray-100 to-gray-200 dark:from-slate-900 dark:to-slate-800 rounded-xl shadow-2xl overflow-hidden">
                      <Canvas>
                        <Suspense fallback={null}>
                          <components.PerspectiveCamera makeDefault position={[3, 3, 3]} />
                          <ambientLight intensity={0.5} />
                          <directionalLight position={[10, 10, 5]} intensity={1} />
                          
                          {/* Axes Helper - Red=X, Green=Y, Blue=Z */}
                          <axesHelper args={[2]} />
                          
                          {/* Grid Helper */}
                          <gridHelper args={[10, 10, '#888888', '#444444']} />
                          
                          {/* Robot Arm Model */}
                          <RobotArmModel />
                          
                          <components.OrbitControls />
                        </Suspense>
                      </Canvas>
                    </div>
                    </>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </>
  )
}

export default Projects
