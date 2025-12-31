export type PaginationProps = {
  totalPages: number
  currentPage: number
  onPageChange: (page: number) => void
}

export default function Pagination({
  totalPages,
  currentPage,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) {
    return null // show nothing
  }

  return (
    <div className="flex justify-center gap-2 mt-8">
      {Array.from({ length: totalPages }, (_, index) => {
        const baseClassName = 'px-3 py-1 cursor-pointer rounded'
        const dynamicClassName = `${currentPage === index + 1 ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-200'}`
        const className = `${baseClassName} ${dynamicClassName}`
        return (
          <button
            key={index + 1}
            onClick={() => onPageChange(index + 1)}
            className={className}
          >
            {index + 1}
          </button>
        )
      })}
    </div>
  )
}
