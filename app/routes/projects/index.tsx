import type { Project } from '~/types'
import type { Route } from './+types'
import ProjectCard from '~/components/ProjectCard'
import { useState } from 'react'
import Pagination from '~/components/Pagination'

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

  const [currentPage, setCurrentPage] = useState(1)

  const PROJECTS_PER_PAGE = 4
  const totalPages = Math.ceil(projects.length / PROJECTS_PER_PAGE)

  const lastPageIndex = currentPage * PROJECTS_PER_PAGE
  const firstPageIndex = lastPageIndex - PROJECTS_PER_PAGE
  const currentProjects = projects.slice(firstPageIndex, lastPageIndex)

  return (
    <>
      <h2 className="text-3xl text-white font-bold mb-8">Projects</h2>

      <div className="grid gap-6 sm:grid-cols-2">
        {currentProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </>
  )
}
