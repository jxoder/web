import React, { useState, useRef, useEffect, useCallback } from 'react'

interface SliderProps {
  label?: string
  initialValue?: number
  min?: number
  max?: number
  step?: number
  onChange?: (value: number) => void
}

const Slider: React.FC<SliderProps> = props => {
  const { initialValue = 0, min = 0, max = 100, step = 1, onChange } = props
  const [value, setValue] = useState<number>(initialValue)
  const [isDragging, setIsDragging] = useState<boolean>(false)
  const sliderRef = useRef<HTMLDivElement>(null)

  const handleMouseDown = () => {
    setIsDragging(true)
  }

  const handleMouseUp = useCallback(() => {
    setIsDragging(false)
  }, [])

  const handleMouseMove = useCallback(
    (event: MouseEvent) => {
      if (isDragging && sliderRef.current) {
        const rect = sliderRef.current.getBoundingClientRect()
        const x = event.clientX - rect.left
        const percentage = (x / rect.width) * 100
        const newValue =
          Math.round(((percentage / 100) * (max - min)) / step) * step + min
        const clampedValue = Math.min(Math.max(newValue, min), max)
        setValue(clampedValue)
        onChange?.(clampedValue)
      }
    },
    [isDragging, min, max, step, onChange],
  )

  useEffect(() => {
    document.addEventListener('mouseup', handleMouseUp)
    document.addEventListener('mousemove', handleMouseMove)

    return () => {
      document.removeEventListener('mouseup', handleMouseUp)
      document.removeEventListener('mousemove', handleMouseMove)
    }
  }, [handleMouseUp, handleMouseMove])

  const percentage = ((value - min) / (max - min)) * 100

  return (
    <div>
      {!!props.label && (
        <label className="mb-3 block text-black dark:text-white">
          {props.label}
        </label>
      )}
      <div className={`w-full mx-auto p-2 flex justify-center items-center`}>
        <div
          ref={sliderRef}
          className="relative w-full h-2 bg-gray-200 rounded-full cursor-pointer"
          onMouseDown={handleMouseDown}
        >
          <div
            className="absolute h-full bg-blue-500 rounded-full"
            style={{ width: `${percentage}%` }}
          ></div>
          <div
            className="absolute w-6 h-6 bg-blue-600 rounded-full shadow -top-2 -ml-3 cursor-grab active:cursor-grabbing"
            style={{ left: `${percentage}%` }}
          ></div>
        </div>
        <div className="text-center text-sm text-gray-600 ml-6">{value}</div>
      </div>
    </div>
  )
}

export default Slider
