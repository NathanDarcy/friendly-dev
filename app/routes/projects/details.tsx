import type { Project } from '~/types'
import type { Route } from './+types/details'
import { FaArrowLeft } from 'react-icons/fa'
import { Link } from 'react-router'

// as example, using a client loader instead of server
export async function clientLoader({
  params,
}: Route.ClientLoaderArgs): Promise<Project> {
  const response = await fetch(`http://localhost:8000/projects/${params.id}`)
  if (!response.ok) {
    throw new Response('Project not found', { status: 404 })
  }
  const project: Project = await response.json()

  return project
}

export function HydrateFallback() {
  return <div>Loading...</div>
}

export default function ProjectDetailsPage({
  loaderData,
}: Route.ComponentProps) {
  const project = loaderData

  return (
    <>
      <Link
        to="/project"
        className="flex items-center text-blue-400 hover:text-blue-500 mb-6 transition"
      >
        <FaArrowLeft className="mr-2" />
      </Link>

      <div className="grid gap-8 md:grid-cols-2 items-start">
        <div>
          <img
            src={project.image}
            alt={project.title}
            className="w-full rounded-lg shadow-md"
          />
        </div>

        <div>
          <h1 className="text-3xl font-bold text-blue-400 mb-4">
            {project.title}
          </h1>

          <p className="text-gray-300 text-sm mb-4">
            {new Date(project.date).toLocaleDateString()} &#8268;{' '}
            {project.category}
          </p>

          <p className="text-gray-200 mb-6">{project.description}</p>

          <a
            href={project.url}
            target="_blank"
            className="inline-block text-white bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded transition"
          >
            View Site {'->'}
          </a>
        </div>
      </div>
    </>
  )
}
