    import { useState } from 'react'
import ProjectModal from './ProjectModal'

interface Project {
  id: number
  title: string
  description: string
  images: string[]
  captions: string[]
}

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  const projects: Project[] = [
    {
      id: 1,
      title: 'NASA Space Apps - Meteor Madness',
      description: ' NEOScope is a near Earth object visualization tool for viewing orbital paths of potentially hazardous asteroids, the consequences of their impact with Earth, and for simulating potential mitigation strategies. We used NASA databases such as the Small- Body Database Query and Sentry: Earth Impacts to filter over 1.5 million data points and extract the data required to map the trajectories and calculate impact magnitudes of 40 asteroids using Euclidean Keplerian Orbital mechanics.',
      images: [
        '/src/resources/3D Viz.png',
        '/src/resources/Impact Sim.png',
        '/src/resources/NASA Space Apps Website Pic 3.png'
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
      description: 'Using STK 12, MATLAB, and Pandas + NumPy to generate satellite attitude profiles that keep a specified body face (camera) continuously pointed away from the Sun while allowing controlled roll rotations around the Sun direction. It computes Sun position vectors in the ICRF frame for given dates, constructs rotation matrices/quaternions that maintain direction opposite to the Sun with parameterized roll angles, and outputs the data in both CSV and STK-compatible formats.',
      images: ['/src/resources/UTAT Picture.png'],
      captions: ['Orbital trajectory visualization', 'Simulation control panel']
    },
    {
      id: 3,
      title: 'Prosthetic Leg Redesign',
      description: 'Incorporated variable stiffness actuators into prosthetic leg design to add adjustable tension capabilities while significantly reducing overall weight and cost compared to market alternatives.',
      images: [
        '/src/resources/Prosthetic Leg Proj Pic 1.png',
        '/src/resources/Prosthetic Leg Proj Results.png'
      ],
      captions: ['Prototype', 'Results']
    },
    {
      id: 4,
      title: 'F1Tenth Competition',
      description: 'Using Autodrive, ROS2, and Reinforcement Learning to develop an autonomous racing vehicle for the F1Tenth competition.',
      images: ['/src/resources/F1Tenth.png'],
      captions: ['Vehicle on track']
    },
    {
      id: 5,
      title: 'Robotic Arm',
      description: 'Formulating and 3D designing a 6-DOF robotic arm using Solidworks',
      images: [
        '/src/resources/Solidworks 1.png',
        '/src/resources/Solidworks 2.png'
      ],
      captions: ['Robotic arm assembly', 'Drawings']
    },
    {
      id: 6,
      title: 'Spotify Playlist Cleaner',
      description: 'Swipe right to keep, left to remove. Filter by playlist, date, artist, and more. In progress.',
      images: ['/src/resources/Spotify Logo.png'],
      captions: ['Coming soon']
    }
  ]

  return (
    <>
      <section id="projects" className="min-h-screen py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-16">Projects</h2>
          
          <div className="grid grid-cols-1 gap-6">
            {projects.map((project) => (
              <button
                key={project.id}
                onClick={() => setSelectedProject(project)}
                className="group rounded-xl shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 text-left overflow-hidden"
              >
                <div className="bg-gradient-to-br from-cyan-200/30 via-blue-200/30 to-teal-200/30 dark:from-slate-950/30 dark:via-blue-900/30 dark:to-cyan-900/30 backdrop-blur-lg border border-white/20 dark:border-cyan-700/20 rounded-xl overflow-hidden">
                  <div className="flex flex-col md:flex-row min-h-[260px]">
                    <div className="md:w-2/5 bg-gradient-to-br from-cyan-200/40 to-blue-200/40 dark:from-slate-800/40 dark:to-blue-800/40 flex items-center justify-center">
                      <img 
                        src={project.images[0]} 
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="md:w-3/5 p-8 flex flex-col justify-start">
                      <h3 className="text-4xl font-bold text-gray-900 dark:text-gray-100 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors mb-6">
                        {project.title}
                      </h3>
                      <p className="text-black dark:text-gray-300 text-lg font-medium line-clamp-6">
                        {project.description}
                      </p>
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </>
  )
}

export default Projects
