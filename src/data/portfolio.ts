export type ProjectCategory = 'Space' | 'Autonomy' | 'Hardware' | 'Software'

export interface ProjectMetric {
  value: string
  label: string
}

export interface PortfolioProject {
  id: number
  slug: string
  title: string
  category: ProjectCategory
  status: string
  date: string
  summary: string
  description: string
  metrics: ProjectMetric[]
  tools: string[]
  images: string[]
  captions: string[]
  imageAlt: string[]
  featured?: boolean
  hasModel?: boolean
}

export const projects: PortfolioProject[] = [
  {
    id: 1,
    slug: 'meteor-madness',
    title: 'Meteor Madness',
    category: 'Space',
    status: '2× award winner',
    date: 'NASA Space Apps · 2025',
    summary:
      'A near-Earth-object visualization and impact simulator that turns a huge NASA dataset into something people can explore.',
    description:
      'NEOScope maps the orbital paths of potentially hazardous asteroids, estimates the consequences of an Earth impact, and lets users explore mitigation strategies. Our team filtered more than 1.5 million records from NASA’s Small-Body Database Query and Sentry: Earth Impact Monitoring, then used Keplerian orbital mechanics to visualize 40 asteroids. The project won Local Impact and Most Inspirational at the 2025 NASA Space Apps Hackathon in Toronto.',
    metrics: [
      { value: '1.5M+', label: 'records filtered' },
      { value: '40', label: 'asteroids mapped' },
      { value: '2×', label: 'local awards' },
    ],
    tools: ['Orbital mechanics', 'NASA SBDB', 'Sentry data', '3D visualization'],
    images: ['/3D Viz.png', '/Impact Sim.png', '/NASA Space Apps Website Pic 3.png'],
    captions: ['Interactive orbit visualization', 'Asteroid impact simulation', 'The team and our two local awards'],
    imageAlt: [
      'NEOScope interface visualizing asteroid orbits around the solar system',
      'NEOScope asteroid impact simulation interface',
      'NASA Space Apps team with the project awards',
    ],
    featured: true,
  },
  {
    id: 2,
    slug: 'finch-attitude-planning',
    title: 'FINCH Attitude Planning',
    category: 'Space',
    status: 'In development',
    date: 'UTAT Space Systems · Now',
    summary:
      'Attitude planning and guidance for a 3U CubeSat switching between solar-power generation and crop-imaging modes.',
    description:
      'This guidance package supports the University of Toronto Aerospace Team’s FINCH mission. It generates spacecraft attitude profiles for two operating modes: sun-pointing for power generation and target tracking for hyperspectral crop imaging. The Python pipeline uses SpiceyPy with NASA SPICE DE440 ephemerides, ICRF/J2000 coordinates, Hamiltonian scalar-first quaternions, hourly ephemeris caching, safety constraints, and STK attitude-file output. FINCH is targeting a Q3 2028 launch.',
    metrics: [
      { value: '3U', label: 'CubeSat platform' },
      { value: '2', label: 'attitude modes' },
      { value: "Q3 ’28", label: 'launch target' },
    ],
    tools: ['Python', 'SpiceyPy', 'DE440', 'Quaternions', 'STK'],
    images: ['/UTAT Picture.png', '/UTAT Picture 2.png'],
    captions: ['Orbital trajectory visualization', 'FINCH CubeSat assembly'],
    imageAlt: [
      'FINCH satellite orbital trajectory visualization',
      'FINCH CubeSat hardware being assembled',
    ],
    featured: true,
  },
  {
    id: 3,
    slug: 'robotic-camera-arm',
    title: 'Robotic Camera Arm',
    category: 'Hardware',
    status: 'Design complete',
    date: 'Mechanical design',
    summary:
      'A modular multi-axis camera arm designed for independent cinematographers—and built around real payload, speed, and precision targets.',
    description:
      'The design supports a 1 kg+ camera payload while targeting motion accuracy within ±0.5 mm. I focused on the SolidWorks end effector, system-level material and component selection, and a compact two-axis pan-tilt mechanism. Lightweight aluminum and carbon-fiber elements reduce inertia, while the motor and gearing selections balance torque, speed, and precise camera orientation.',
    metrics: [
      { value: '±0.5 mm', label: 'motion accuracy' },
      { value: '1 kg+', label: 'camera payload' },
      { value: '2-axis', label: 'pan-tilt head' },
    ],
    tools: ['SolidWorks', 'Stepper motors', 'Material selection', 'Design for assembly'],
    images: ['/Solidworks 1.png', '/Solidworks 2.png', '/243 Robot Project Project Management.png'],
    captions: ['Finished robotic-arm assembly', 'Exploded view and bill of materials', 'Project-management plan'],
    imageAlt: [
      'SolidWorks rendering of the complete robotic camera arm',
      'Exploded SolidWorks view of the robotic camera arm',
      'Project-management plan for the robotic camera arm',
    ],
    hasModel: true,
  },
  {
    id: 4,
    slug: 'f1tenth',
    title: 'F1TENTH Autonomous Racing',
    category: 'Autonomy',
    status: 'Race preparation',
    date: 'Competition · 2026',
    summary:
      'Path planning, perception, and reinforcement learning for a 1/10-scale racecar running on an NVIDIA Jetson NX.',
    description:
      'The team is developing an autonomous racecar with AutoDrive, ROS 2, and reinforcement learning. The stack combines path planning, computer vision, and controls with a Soft Actor-Critic agent in PyTorch, ROS 2 RViz and Gym, plus Docker containerization for competition. The target event is the IEEE Vehicular Technology Conference in Boston in September 2026.',
    metrics: [
      { value: '1/10', label: 'vehicle scale' },
      { value: 'SAC', label: 'learning method' },
      { value: "Sep ’26", label: 'target race' },
    ],
    tools: ['ROS 2', 'PyTorch', 'AutoDrive', 'Docker', 'Jetson NX'],
    images: ['/F1Tenth2.png', '/F1Tenth.png'],
    captions: ['F1TENTH racecar hardware', 'AutoDrive simulator view'],
    imageAlt: [
      'F1TENTH autonomous racecar with sensors and NVIDIA hardware',
      'AutoDrive simulation environment for the F1TENTH car',
    ],
  },
  {
    id: 5,
    slug: 'prosthetic-leg',
    title: 'Variable-Stiffness Prosthetic',
    category: 'Hardware',
    status: 'Prototype tested',
    date: 'Biomechanics',
    summary:
      'A lower-cost prosthetic-leg concept with variable stiffness, developed from gait research through physical testing.',
    description:
      'Our redesign used variable-stiffness actuation to add adjustable tension while reducing weight and cost against market alternatives. We studied gait biomechanics, modeled the concept in Onshape, fabricated a prototype, and tested its behavior under simulated walking conditions. The basic prototype produced an adjustable load-stiffness range from 0.7 to 4.4 pounds of force—a 500% span.',
    metrics: [
      { value: '500%', label: 'stiffness span' },
      { value: '0.7–4.4', label: 'lbf test range' },
      { value: '1', label: 'working prototype' },
    ],
    tools: ['Onshape', 'Biomechanics', 'Physical prototyping', 'Test design'],
    images: ['/Prosthetic Leg Proj Pic 1.png', '/Prosthetic Leg Proj Results 2.png', '/Prosthetic Leg Proj Results 3.png'],
    captions: ['Variable-stiffness prototype', 'Spring angles tested', 'Constant-displacement results'],
    imageAlt: [
      'Physical prototype of the variable-stiffness prosthetic-leg mechanism',
      'Diagram of spring angles evaluated during testing',
      'Chart of the prosthetic prototype test results',
    ],
  },
  {
    id: 6,
    slug: 'playlist-cleaner',
    title: 'Playlist Cleaner',
    category: 'Software',
    status: 'In progress',
    date: 'Side project',
    summary:
      'A faster way to clean up a Spotify playlist: swipe to keep or remove, then filter by playlist, date, or artist.',
    description:
      'The interaction is intentionally simple: swipe right to keep a track and left to remove it. Filtering by playlist, date, artist, and other attributes is planned so a large music library can be reviewed in focused passes. The project is currently in progress.',
    metrics: [
      { value: '← / →', label: 'remove or keep' },
      { value: 'Fast', label: 'review loop' },
      { value: 'WIP', label: 'current status' },
    ],
    tools: ['Interaction design', 'Music-library filtering'],
    images: ['/Spotify Logo.png'],
    captions: ['Product concept in progress'],
    imageAlt: ['Spotify mark used as a placeholder for the playlist-cleaner project'],
  },
]

export interface FieldNote {
  id: number
  src: string
  alt: string
  caption: string
  size: 'wide' | 'tall' | 'standard'
}

export const fieldNotes: FieldNote[] = [
  {
    id: 1,
    src: '/Space Center Houston.png',
    alt: 'Saturn V rocket stage and engines at Space Center Houston',
    caption: 'Space Center Houston — seeing the scale up close.',
    size: 'wide',
  },
  {
    id: 2,
    src: '/APS111 Team Project.jpg',
    alt: 'Akshay with his APS111 design-project team',
    caption: 'Early design-team days in APS111.',
    size: 'standard',
  },
  {
    id: 3,
    src: '/VEX Team Pic.png',
    alt: 'VEX robotics team posing together',
    caption: 'The VEX team behind the robot.',
    size: 'standard',
  },
  {
    id: 4,
    src: '/Sr-71 Blackbird (with mom cameo).png',
    alt: 'Akshay and his mother near an SR-71 Blackbird aircraft',
    caption: 'SR-71 Blackbird, with the promised mom cameo.',
    size: 'tall',
  },
  {
    id: 5,
    src: '/F-117 Nighthawk.png',
    alt: 'Akshay standing beside an F-117 Nighthawk aircraft',
    caption: 'F-117 Nighthawk. Hard not to stare.',
    size: 'standard',
  },
  {
    id: 6,
    src: '/Houston HOSA ILC 2024.png',
    alt: 'Group photo from the 2024 HOSA International Leadership Conference in Houston',
    caption: 'Houston HOSA ILC, 2024.',
    size: 'wide',
  },
]
