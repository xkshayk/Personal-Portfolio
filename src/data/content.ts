// All site copy lives here. Edit text/images in this file; components only handle layout.
// Image paths point at /public/media (web-optimised copies of the originals in /public).

export const RESUME_URL = '/Akshay_Kolwalkar_Resume.pdf'
export const EMAIL = 'akshay.kolwalkar@mail.utoronto.ca'
export const LINKEDIN = 'https://linkedin.com/in/akshay-kolwalkar'
export const GITHUB = 'https://github.com/xkshayk'

export interface Figure {
  src: string
  caption: string
  /** 'contain' for screenshots/plots that must not be cropped */
  fit?: 'cover' | 'contain'
}

export interface Experience {
  id: string
  org: string
  orgShort?: string
  role: string
  dates: string
  location: string
  summary: string
  bullets: string[]
  stack: string[]
  /** id of the matching case study further down the page */
  caseStudy?: string
  /** small labelled numbers shown beside the entry */
  results?: { value: string; label: string }[]
}

export const highlights = [
  { value: '23%', label: 'faster simulated lap times', where: 'LARRI · F1TENTH', href: '#case-f1tenth' },
  { value: '85%', label: 'fewer simulated collisions', where: 'LARRI · SAC policy', href: '#case-f1tenth' },
  { value: '0.62°', label: 'final pointing error, 6,000 s mission', where: 'UTAT · ADCS sim', href: '#case-adcs' },
  { value: '2', label: 'awards out of 140 participants', where: 'NASA Space Apps Toronto', href: '#case-neoscope' },
]

export const experience: Experience[] = [
  {
    id: 'larri',
    org: 'Louisville Automation and Robotics Research Institute',
    orgShort: 'LARRI',
    role: 'Student Researcher',
    dates: 'Aug 2025 – Present',
    location: 'Louisville, KY',
    summary:
      'Autonomous racing research with Dr. Sabur Baidya, building toward the 2027 F1TENTH competition.',
    bullets: [
      'Improved **simulated lap times by 23%** over the previous year’s autonomous model through autonomous-driving algorithm development.',
      'Reduced **simulated collision rate by 85%** with Soft Actor-Critic (SAC) policies in PyTorch and Gym, evaluated in AutoDRIVE 3D simulation.',
      'Support an **NVIDIA Jetson NX** race-car platform with ROS 2, RViz and Docker: simulation, vehicle-state visualisation and environment setup for policy evaluation.',
    ],
    stack: ['PyTorch', 'Gym', 'SAC', 'ROS 2', 'RViz', 'Docker', 'AutoDRIVE', 'Jetson NX'],
    caseStudy: 'case-f1tenth',
  },
  {
    id: 'ge',
    org: 'GE Appliances',
    role: 'Manufacturing Production Intern',
    dates: 'Jun 2025 – Aug 2025',
    location: 'Louisville, KY',
    summary:
      'Worked on the production floor, then used a year of plant data to propose process, quality and maintenance changes to the area’s manufacturing engineers.',
    bullets: [
      'Analysed **12 months of plant performance data** and proposed assembly-process designs projected to **increase units produced by 6%**.',
      'Developed production-quality recommendations with a **projected 16% reduction in defect rate**, presented to area manufacturing engineers for technical review.',
      'Proposed equipment-maintenance improvements estimated to **cut routine maintenance time by 12%**, drawing on hands-on operation and maintenance experience.',
    ],
    stack: ['Plant data analysis', 'Process design', 'Quality', 'Maintenance'],
    results: [
      { value: '+6%', label: 'units produced (projected)' },
      { value: '−16%', label: 'defect rate (projected)' },
      { value: '−12%', label: 'maintenance time (est.)' },
    ],
  },
  {
    id: 'utat',
    org: 'University of Toronto Aerospace Team, Space Systems',
    orgShort: 'UTAT',
    role: 'Attitude Determination & Control Systems',
    dates: 'May 2025 – Present',
    location: 'Toronto, ON',
    summary:
      'Building a MATLAB/Simulink simulator to test how the FINCH CubeSat points itself.',
    bullets: [
      'Developed a **MATLAB/Simulink CubeSat ADCS simulator** integrating orbit dynamics, sensors, attitude estimation and control, with **4 reaction wheels and 3 magnetorquers**, quaternion kinematics and modelled actuator limits.',
      'Executed a **6,000-second mission with 600,001 states**; corrected star-tracker noise orientation and verified quaternion normalisation, angular-momentum conservation and timestep stability with regression diagnostics.',
      'Built a **TypeScript/Three.js telemetry replay** preserving epochs, mode events and delivered actuator torque; passes **15 unit tests and 10 desktop/mobile interaction tests** on exported MATLAB data.',
    ],
    stack: ['MATLAB', 'Simulink', 'TypeScript', 'Three.js', 'SpiceyPy', 'STK 12'],
    caseStudy: 'case-adcs',
  },
  {
    id: 'utfr',
    org: 'University of Toronto Formula Racing',
    orgShort: 'UTFR',
    role: 'Aerodynamics & Vehicle Dynamics Team Member',
    dates: 'Dec 2025 – Present',
    location: 'Toronto, ON',
    summary: 'Part of the aero and vehicle dynamics groups on the UT27 car, from wing and undertray studies to the driver-in-the-loop simulator.',
    bullets: [
      'Contribute to UT27 aerodynamics discussions across **front wing, undertray and rear wing**, using team CATIA and STAR-CCM+ studies to assess downforce, drag and aero balance.',
      'Support technical review of **mesh-independence and flap-angle studies** across straight-line and cornering conditions, informing aero-package refinement and simulation reliability.',
      'Contribute to the UT27 **driver-in-the-loop (DiL) simulator** on **VI-Grade DriveSim and rFpro**, integrating Simulink powertrain models and **UM14+ tyres**, and correcting steering-torque and tyre-fit terms (Mz vs camber, QCZ1) flagged in driver feedback and FRF/slalom comparisons.',    ],
    stack: ['CATIA', 'STAR-CCM+', 'CFD', 'Simulink', 'VI-Grade DriveSim', 'rFpro'],
  },
]

export interface CaseStudy {
  id: string
  title: string
  context: string
  dates: string
  intro: string[]
  /** short label/value facts shown in the side column */
  facts: { label: string; value: string }[]
  stack: string[]
  figures: Figure[]
  /** optional extra block rendered by the CaseStudies component */
  special?: 'adcs-replay' | 'f1tenth-results' | 'robot-arm-3d'
  sub?: { title: string; body: string; figures: Figure[] }
  note?: string
}

export const caseStudies: CaseStudy[] = [
  {
    id: 'case-f1tenth',
    title: 'Teaching a 1/10-scale race car to drive itself',
    context: 'LARRI · F1TENTH autonomous racing',
    dates: '2025 – now',
    intro: [
      'F1TENTH cars are 1/10-scale race cars with a LiDAR, an IMU and an NVIDIA Jetson on board. Everything has to be autonomous, and everything has to run in a competition-mandated Docker container.',
      'My work is the driving policy. I train Soft Actor-Critic agents in PyTorch against a Gym interface, evaluate them in the AutoDRIVE 3D simulator, and visualise vehicle state in RViz over ROS 2. Faster laps and fewer crashes pull against each other, so most of the work is getting the policy to find pace without taking on risk.',
    ],
    facts: [
      { label: 'Simulated lap time', value: '−23% vs last year' },
      { label: 'Simulated collision rate', value: '−85%' },
      { label: 'Compute', value: 'NVIDIA Jetson NX' },
      { label: 'Target', value: 'F1TENTH 2027' },
    ],
    stack: ['PyTorch', 'SAC', 'Gym', 'ROS 2', 'RViz', 'Docker', 'AutoDRIVE'],
    special: 'f1tenth-results',
    figures: [
      { src: '/media/f1tenth-car.webp', caption: 'The research car on the bench, with a Hokuyo LiDAR and the Jetson compute stack.' },
      { src: '/media/f1tenth-autodrive.webp', caption: 'AutoDRIVE simulator with LiDAR rays visible, where policies are trained and evaluated.', fit: 'contain' },
    ],
  },
  {
    id: 'case-adcs',
    title: 'A CubeSat attitude simulator, end to end',
    context: 'UTAT Space Systems · FINCH mission',
    dates: '2025 – now',
    intro: [
      'FINCH is UTAT’s 3U CubeSat for hyperspectral imaging of crop residue. Before anyone trusts flight software, the team needs a model of how the spacecraft actually turns: orbit, sensors, estimator, controller and actuators, all in one closed loop.',
      'I built that loop in MATLAB/Simulink. It propagates a 500 km, 51.6° orbit with J2, samples a star tracker, fine sun sensor, magnetometer, IMU and GNSS at their own rates, and drives four pyramid-mounted reaction wheels and three magnetorquers through detumble, coarse and fine pointing modes, with torque, momentum and dipole limits enforced.',
      'Below is the real exported run, not an animation I made up. Scrub through it: the solid box is the true attitude and the outline is where the controller is trying to point.',
    ],
    facts: [
      { label: 'Initial pointing error', value: '96.2°' },
      { label: 'Final pointing error', value: '0.62°' },
      { label: 'Max error, final 60 s', value: '0.71°' },
      { label: 'Final body rate', value: '0.081 °/s' },
      { label: 'Quaternion norm drift', value: '2.2 × 10⁻¹⁶' },
      { label: 'Peak wheel speed', value: '122 RPM (2% of limit)' },
    ],
    stack: ['MATLAB', 'Simulink', 'Quaternions', 'TypeScript', 'Three.js'],
    special: 'adcs-replay',
    figures: [
      { src: '/media/adcs-web-replay.webp', caption: 'Telemetry replay I wrote in TypeScript/Three.js, playing back the same 6,000 s MATLAB export.', fit: 'contain' },
      { src: '/media/adcs-wheels-control.webp', caption: 'Wheel momentum, reaction-wheel torque, magnetorquer dipole and per-wheel torque across the mission.', fit: 'contain' },
      { src: '/media/adcs-rates.webp', caption: 'Body rates through detumble and pointing.', fit: 'contain' },
    ],
    note: 'Star-tracker availability in this default scenario is low (0.35%), and the mode logic switches more often than it should. Both are next on my list.',
    sub: {
      title: 'Also on the team: attitude planning for FINCH',
      body: 'I also wrote an attitude planning package in Python. It uses NASA SPICE (SpiceyPy, DE440 kernels, J2000 frame) to generate scalar-first quaternion profiles for two modes, sun-pointing for power and target tracking for crop imaging, with mode-switching logic constrained by battery state, slew rate and sensor exclusion zones. The output is STK attitude files the team can load directly.',
      figures: [
        { src: '/media/finch-orbit.webp', caption: 'Generated attitude profile loaded into STK 12.', fit: 'contain' },
        { src: '/media/finch-cubesat.webp', caption: 'FINCH 3U CubeSat assembly.', fit: 'contain' },
      ],
    },
  },
  {
    id: 'case-neoscope',
    title: 'NEOScope: asteroid impacts you can play with',
    context: 'NASA Space Apps Toronto · Local Impact & Most Inspirational awards',
    dates: 'Oct 2025',
    intro: [
      'Two days, one teammate, and NASA’s small-body databases. NEOScope lets you pick a near-Earth object, see its orbit in 3D, simulate what happens if it hits, and try mitigation strategies like laser deflection.',
      'My part: I processed 40,000+ NEO records with NumPy and pandas, modelled 40 asteroid orbits with Keplerian mechanics, and used atmospheric-entry calculations for impact effects. I also integrated the React/Three.js front end with a Python/Flask backend that pulls from NASA’s Small-Body Database and Sentry APIs.',
    ],
    facts: [
      { label: 'Built in', value: '2 days' },
      { label: 'NEO records processed', value: '40,000+' },
      { label: 'Orbits modelled', value: '40' },
      { label: 'Awards', value: 'Local Impact, Most Inspirational' },
      { label: 'Participants', value: '140 in person' },
    ],
    stack: ['Python', 'Flask', 'NumPy', 'pandas', 'React', 'Three.js', 'NASA SBDB / Sentry'],
    figures: [
      { src: '/media/neoscope-orbits.webp', caption: '3D view of the 40 modelled asteroid orbits.', fit: 'contain' },
      { src: '/media/neoscope-impact.webp', caption: 'Impact simulation over Toronto: entry velocity, impact energy and equivalent earthquake magnitude.', fit: 'contain' },
      { src: '/media/laser-deflection.webp', caption: 'Mitigation mode: laser deflection pushes the asteroid onto a new trajectory.', fit: 'contain' },
      { src: '/media/neoscope-awards.webp', caption: 'With my teammate and both awards at the Bombardier Centre hangar.' },
    ],
  },
  {
    id: 'case-arm',
    title: 'Robotic camera arm for independent filmmakers',
    context: 'Team design project',
    dates: '',
    intro: [
      'The brief: a multi-axis camera arm that matches pro-grade specs for reach, payload, speed and precision while staying light, modular and affordable for a solo cinematographer.',
      'I owned the end effector, a compact two-axis pan-tilt head, and the materials and component selection for the full arm. That meant aluminium and carbon-fibre members to keep inertia down, and sizing stepper motors and gearing against the estimated loads so the camera could be oriented quickly and precisely.',
    ],
    facts: [
      { label: 'Camera payload', value: '~1 kg+' },
      { label: 'Positional accuracy', value: '±0.5 mm (design)' },
      { label: 'My part', value: 'End effector, materials, motors' },
    ],
    stack: ['SolidWorks', 'Motor & gear sizing', 'Material selection'],
    special: 'robot-arm-3d',
    figures: [
      { src: '/media/arm-exploded-bom.webp', caption: 'Exploded view with bill of materials.', fit: 'contain' },
      { src: '/media/arm-project-mgmt.webp', caption: 'Project management: schedule and task tracking.', fit: 'contain' },
    ],
  },
  {
    id: 'case-prosthetic',
    title: 'Variable-stiffness prosthetic leg',
    context: 'Design & prototype',
    dates: '',
    intro: [
      'I added variable-stiffness actuators to a prosthetic leg design so its tension can be adjusted, while cutting weight and cost compared with market alternatives.',
      'I started from gait biomechanics research, modelled and simulated the design in Onshape, then built and tested a prototype under simulated walking loads.',
    ],
    facts: [{ label: 'Adjustable stiffness range', value: '0.7 – 4.4 lbf' }],
    stack: ['Onshape', 'Prototyping', 'Biomechanics'],
    figures: [
      { src: '/media/prosthetic-prototype.webp', caption: 'Prototype.', fit: 'contain' },
      { src: '/media/prosthetic-spring-angles.webp', caption: 'Spring angles tested.', fit: 'contain' },
      { src: '/media/prosthetic-force-results.webp', caption: 'Force at constant displacement for each spring setup.', fit: 'contain' },
    ],
  },
]

export const skills = [
  { group: 'Design & analysis', items: ['SolidWorks (CSWA)', 'MATLAB', 'Simulink', 'STK 12', 'SPICE / SpiceyPy', 'CATIA', 'STAR-CCM+', 'VI-Grade DriveSim', 'rFpro', 'Machining certificate'] },
  { group: 'Programming & data', items: ['Python', 'C++', 'TypeScript', 'PyTorch', 'NumPy', 'pandas', 'Docker', 'Regression testing'] },
  { group: 'Robotics & controls', items: ['ROS 2', 'RViz', 'AutoDRIVE', 'Gym', 'Jetson NX', 'SAC reinforcement learning', 'Attitude estimation'] },
]

export const coursework =
  'Fluid Mechanics I, Thermodynamics, Heat & Mass Transfer, Kinematics & Dynamics of Machines, Mechanics of Solids I–II, Numerical Analysis & Computational Methods, Manufacturing Engineering'

export const timeline = [
  { year: '2006', text: 'Born' },
  { year: '2013', text: 'Wanted to be Messi' },
  { year: '2019', text: 'Wanted to be Kevin Durant' },
  { year: '2025', text: 'Want to fly jets' },
]

export const photos: (Figure & { type?: 'video' })[] = [
  { src: '/media/photo-aps111.webp', caption: 'APS111 team project' },
  { src: '/media/photo-sr71.webp', caption: 'SR-71 Blackbird (with a cameo from my mom)' },
  { src: '/media/photo-space-center-houston.webp', caption: 'Space Center Houston' },
  { src: '/media/photo-f117.webp', caption: 'F-117 Nighthawk' },
  { src: '/media/photo-vex-team.webp', caption: 'VEX robotics team' },
  { src: '/VEX Team Demonstration.MP4', caption: 'VEX robot demo', type: 'video' },
  { src: '/media/photo-hosa-ilc.webp', caption: 'HOSA International Leadership Conference, Houston 2024' },
  { src: '/media/photo-cna-training.webp', caption: 'CNA training at Norton Healthcare' },
  { src: '/media/photo-test-vitals.webp', caption: 'Test vitals' },
]
