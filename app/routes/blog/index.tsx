import type { PostMeta } from '~/types'
import type { Route } from './+types/index'
import PostCard from '~/components/PostCard'
import { useState } from 'react'
import Pagination from '~/components/Pagination'
import PostFilter from '~/components/PostFilter'

export async function loader({
  request,
}: Route.LoaderArgs): Promise<{ posts: PostMeta[] }> {
  const url = new URL('./posts-meta.json', request.url)

  const response = await fetch(url.href)

  if (!response.ok) {
    throw new Error('Failed to fetch data')
  }

  const data = await response.json()

  data.sort((a: PostMeta, b: PostMeta) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime()
  })

  return {
    posts: data,
  }
}

export default function BlogPage({ loaderData }: Route.ComponentProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const POSTS_PER_PAGE = 5

  const { posts } = loaderData

  const filteredPosts = posts.filter((post) => {
    const query = searchQuery.toLowerCase()

    return (
      post.title.toLowerCase().includes(query) ||
      post.excerpt.toLowerCase().includes(query)
    )
  })

  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE)
  const lastPageIndex = currentPage * POSTS_PER_PAGE
  const firstPageIndex = lastPageIndex - POSTS_PER_PAGE
  const currentPosts = filteredPosts.slice(firstPageIndex, lastPageIndex)

  return (
    <div className="max-w-3xl mx-auto mt-10 px-6 py-6 bg-gray-900">
      <h2 className="text-3xl text-white font-bold mb-8">Blog</h2>

      <PostFilter
        searchQuery={searchQuery}
        onSearchChange={(query) => {
          setSearchQuery(query)
          setCurrentPage(1)
        }}
      />

      <div className="space-y-8">
        {currentPosts.length === 0 ? (
          <p className="text-gray-400 text-center"> No Posts Found</p>
        ) : (
          currentPosts.map((post) => <PostCard key={post.slug} post={post} />)
        )}
      </div>

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => {
            setCurrentPage(page)
          }}
        />
      )}
    </div>
  )
}
