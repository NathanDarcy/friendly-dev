import type { PostMeta } from '~/types'
import type { Route } from './+types/details'
import ReactMarkdown from 'react-markdown'
import { Link } from 'react-router'

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

  return (
    <div className="max-w-3xl mx-auto px-6 py-12 bg-gray-900">
      <h1 className="text-3xl font-bold text-blue-400 mb2">{postMeta.title}</h1>

      <p className="text-sm text-gray-400 mb-6">
        {new Date(postMeta.date).toDateString()}
      </p>

      <div className="prose prose-invert max-w-none mb-12">
        <ReactMarkdown>{markdown}</ReactMarkdown>
      </div>

      <Link
        to="/blog"
        className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
      >
        {'<- '}Back to Posts
      </Link>
    </div>
  )
}
