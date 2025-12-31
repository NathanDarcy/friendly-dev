import type { Project } from '~/types'
import type { Route } from './+types'
import ProjectCard from '~/components/ProjectCard'

export async function loader(): Promise<{
  projects: Project[]
}> {
  const response = await fetch('http:localhost:8000/projects')
  const data = await response.json()

  return {
    projects: data,
  }
}

export default function ProjectPage({ loaderData }: Route.ComponentProps) {
  const { projects } = loaderData

  return (
    <>
      <h2 className="text-3xl text-white font-bold mb-8">Projects</h2>

      <div className="grid gap-6 sm:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </>
  )
}
