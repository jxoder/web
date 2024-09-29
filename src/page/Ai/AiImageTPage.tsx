import React, { useState } from 'react'

const AiImageTPage: React.FC = () => {
  const [prompt, setPrompt] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [generatedImages, setGeneratedImages] = useState([])

  const handleSubmit = async e => {
    e.preventDefault()
    setIsLoading(true)
    // 실제 이미지 생성 API 호출 로직을 여기에 구현해야 합니다.
    setTimeout(() => {
      const newImageUrl = `https://picsum.photos/seed/${prompt}/400/400`
      setImageUrl(newImageUrl)
      setGeneratedImages(prev => [newImageUrl, ...prev])
      setIsLoading(false)
    }, 2000)
  }

  return (
    <div className="container mx-auto">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* input form */}
        <div className="w-full lg:w-1/2 bg-green-100 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">
            이미지 생성을 위한 form
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <textarea
              value={prompt}
              onChange={e => setPrompt(e.target.value)}
              placeholder="이미지에 대한 상세한 설명을 입력하세요..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={4}
              required
            />
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 flex items-center justify-center"
              disabled={isLoading}
            >
              {isLoading ? '생성 중...' : '이미지 생성'}
            </button>
          </form>
        </div>
        {/* image preview */}
        <div className="w-full lg:w-1/2 bg-green-100 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">
            이미지 생성 로딩 및 preview
          </h2>
          <div className="aspect-w-1 aspect-h-1 bg-white rounded-lg overflow-hidden">
            {isLoading ? (
              <div className="flex items-center justify-center h-full">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : imageUrl ? (
              <img
                src={imageUrl}
                alt="Generated"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500 text-center p-4">
                이미지를 생성하면 여기에 표시됩니다
              </div>
            )}
          </div>
        </div>
      </div>
      {/* preview loading... */}
      <div className="mt-8 bg-green-100 p-4 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">
          이전 생성됐던 이미지 프리뷰
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {generatedImages.map((img, index) => (
            <div key={index} className="aspect-w-1 aspect-h-1">
              <img
                src={img}
                alt={`Generated ${index + 1}`}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AiImageTPage
