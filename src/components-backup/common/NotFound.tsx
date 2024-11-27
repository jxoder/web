import React from 'react'
import { Link } from 'react-router-dom'

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8">
      <div className="text-center">
        <p className="text-6xl sm:text-8xl font-bold text-indigo-600">404</p>
        <h1 className="mt-4 text-3xl sm:text-4xl font-bold text-gray-900">
          페이지를 찾을 수 없습니다
        </h1>
        <p className="mt-4 text-lg text-gray-600">
          죄송합니다. 요청하신 페이지를 찾을 수 없습니다.
        </p>
        <div className="mt-8">
          <Link
            to="/"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {/* <HomeIcon className="mr-2 h-5 w-5" /> */}
            홈으로 돌아가기
          </Link>
        </div>
      </div>
    </div>
  )
}

export default NotFound
