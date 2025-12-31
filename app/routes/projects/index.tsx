import type { Project } from '~/types'
import type { Route } from './+types'

export async function loader({
  request,
}: Route.LoaderArgs): Promise<{ projects: Project[] }> {
  if (request) {
    console.log(request)
  }
  const response = await fetch('http:localhost:8000/projects')
  const data = await response.json()

  return {
    projects: data,
  }
}

export default function ProjectPage({ loaderData }: Route.ComponentProps) {
  const { projects } = loaderData
  console.log(projects)
  return (
    <>
      <h2 className="text-3xl text-white font-bold mb-8">Projects</h2>
    </>
  )
}
