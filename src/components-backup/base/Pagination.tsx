import React from 'react'

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const ChevronLeftIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
        clipRule="evenodd"
      />
    </svg>
  )

  const ChevronRightIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
        clipRule="evenodd"
      />
    </svg>
  )

  const getPageNumbers = () => {
    const pageNumbers = []
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i)
      }
    } else {
      pageNumbers.push(1)
      if (currentPage > 3) {
        pageNumbers.push('...')
      }
      const start = Math.max(2, currentPage - 1)
      const end = Math.min(totalPages - 1, currentPage + 1)
      for (let i = start; i <= end; i++) {
        pageNumbers.push(i)
      }
      if (currentPage < totalPages - 2) {
        pageNumbers.push('...')
      }
      pageNumbers.push(totalPages)
    }
    return pageNumbers
  }

  return (
    <nav className="flex justify-center items-center space-x-1">
      <button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        className="p-2 rounded-md text-gray-600 hover:bg-blue-100"
        disabled={currentPage === 1}
      >
        <ChevronLeftIcon />
      </button>
      {getPageNumbers().map((number, index) => (
        <button
          key={index}
          onClick={() => typeof number === 'number' && onPageChange(number)}
          className={`w-10 h-10 flex items-center justify-center rounded-md ${
            currentPage === number
              ? 'bg-blue-600 text-white'
              : 'text-gray-600 hover:bg-blue-100'
          } ${typeof number !== 'number' ? 'cursor-default' : ''}`}
          disabled={typeof number !== 'number'}
        >
          {number}
        </button>
      ))}
      <button
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        className="p-2 rounded-md text-gray-60  hover:bg-blue-100"
        disabled={currentPage === totalPages}
      >
        <ChevronRightIcon />
      </button>
    </nav>
  )
}

export default Pagination
