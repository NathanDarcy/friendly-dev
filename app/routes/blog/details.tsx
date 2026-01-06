import type { PostMeta } from '~/types'
import type { Route } from './+types/details'

export type BlogPostDetailsPageProps = {
  loaderData: {
    postMeta: PostMeta
    markdown: string
  }
}

export async function loader({ request, params }: Route.LoaderArgs) {
  const { slug } = params

  const url = new URL('/posts-meta.json', request.url)

  const response = await fetch(url.href)

  if (!response.ok) {
    throw new Error('Failed to fetch data')
  }

  const index = await response.json()
  const postMeta = index.find((post: PostMeta) => post.slug === slug)

  if (!postMeta) {
    throw new Response('Not found', { status: 404 })
  }

  const markdown = await import(`../../posts/${slug}.md?raw`)

  return {
    postMeta,
    markdown: markdown.default,
  }
}

export default function BlogPostDetailsPage({
  loaderData,
}: BlogPostDetailsPageProps) {
  const { postMeta, markdown } = loaderData
  console.log(postMeta, markdown)

  return <>Blog</>
}
