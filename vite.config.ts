import { copyFileSync, mkdirSync, rmSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import type { Plugin } from 'vite'
import react from '@vitejs/plugin-react'

const projectRoot = fileURLToPath(new URL('.', import.meta.url))

// Only these runtime assets belong in the deployed site. The repository also
// contains source CAD files that are useful project records but should not be
// copied into the public build.
const deployedAssets = [
  '243 Robot Project Project Management.png',
  '3D Viz.png',
  'Akshay Aquarium.png',
  'Akshay Kolwalkar Resume Final.pdf',
  'APS111 Team Project.jpg',
  'CNAME',
  'F-117 Nighthawk.png',
  'F1Tenth.png',
  'F1Tenth2.png',
  'fighter-jet-logo.png',
  'fighter-jet-logo.svg',
  'Houston HOSA ILC 2024.png',
  'Impact Sim.png',
  'NASA Space Apps Website Pic 3.png',
  'og.png',
  'Prosthetic Leg Proj Pic 1.png',
  'Prosthetic Leg Proj Results 2.png',
  'Prosthetic Leg Proj Results 3.png',
  'robot_arm_assembly.glb',
  'Solidworks 1.png',
  'Solidworks 2.png',
  'Space Center Houston.png',
  'Spotify Logo.png',
  'Sr-71 Blackbird (with mom cameo).png',
  'UTAT Picture 2.png',
  'UTAT Picture.png',
  'VEX Team Pic.png',
] as const

const copyDeployedAssets = (): Plugin => ({
  name: 'copy-deployed-portfolio-assets',
  apply: 'build',
  buildStart() {
    rmSync(resolve(projectRoot, 'dist'), { recursive: true, force: true })
  },
  closeBundle() {
    const outputDirectory = resolve(projectRoot, 'dist')
    const clientDirectory = resolve(outputDirectory, 'client')

    deployedAssets.forEach((asset) => {
      const source = resolve(projectRoot, 'public', asset)
      const destination = resolve(clientDirectory, asset)
      mkdirSync(dirname(destination), { recursive: true })
      copyFileSync(source, destination)
    })

    const workerDirectory = resolve(outputDirectory, 'server')
    mkdirSync(workerDirectory, { recursive: true })
    writeFileSync(
      resolve(workerDirectory, 'index.js'),
      `export default {
  async fetch(request, env) {
    const response = await env.ASSETS.fetch(request)
    if (response.status !== 404 || request.method !== 'GET') return response

    const url = new URL(request.url)
    if (url.pathname.includes('.')) return response

    url.pathname = '/index.html'
    return env.ASSETS.fetch(new Request(url, request))
  },
}\n`,
      'utf8',
    )
  },
})

export default defineConfig(({ command }) => ({
  plugins: [react(), copyDeployedAssets()],
  base: '/',
  build: {
    outDir: 'dist/client',
  },
  publicDir: command === 'build' ? false : 'public',
}))
