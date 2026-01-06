import type { Project } from '~/types'
import type { Route } from './+types'
import ProjectCard from '~/components/ProjectCard'
import { useState } from 'react'
import Pagination from '~/components/Pagination'
import { AnimatePresence, motion } from 'framer-motion'

export async function loader(): Promise<{
  projects: Project[]
}> {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/projects`)
  const data = await response.json()

  return {
    projects: data,
  }
}

export default function ProjectPage({ loaderData }: Route.ComponentProps) {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [currentPage, setCurrentPage] = useState(1)

  const { projects } = loaderData

  const categories = [
    'All',
    ...new Set(projects.map((project) => project.category)),
  ]

  const filteredProjects =
    selectedCategory === 'All'
      ? projects
      : projects.filter((project) => project.category === selectedCategory)

  const PROJECTS_PER_PAGE = 4
  const totalPages = Math.ceil(filteredProjects.length / PROJECTS_PER_PAGE)

  const lastPageIndex = currentPage * PROJECTS_PER_PAGE
  const firstPageIndex = lastPageIndex - PROJECTS_PER_PAGE
  const currentProjects = filteredProjects.slice(firstPageIndex, lastPageIndex)

  return (
    <>
      <h2 className="text-3xl text-white font-bold mb-8">Projects</h2>

      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => {
              setSelectedCategory(category)
              setCurrentPage(1)
            }}
            className={`px-3 py-1 rounded text-sm cursor-pointer 
              ${
                selectedCategory === category
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-700 text-gray-200'
              }`}
          >
            {category}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div layout className="grid gap-6 sm:grid-cols-2">
          {currentProjects.map((project) => (
            <motion.div key={project.id} layout>
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </>
  )
}
