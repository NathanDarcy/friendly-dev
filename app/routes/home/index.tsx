import FeaturedProjects from '~/components/FeaturedProjects'
import type { Route } from './+types'
import type { Project } from '~/types'
import AboutPreview from '~/components/AboutPreview'

export async function loader(): Promise<{ projects: Project[] }> {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/projects`)

  const data = await response.json()

  return { projects: data }
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const { projects } = loaderData

  return (
    <>
      <FeaturedProjects projects={projects} count={2} />
      <AboutPreview />
    </>
  )
}
