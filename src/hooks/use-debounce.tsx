import React from 'react'

export const useDebounce = <T,>(value: T, delay: number = 500) => {
  const [debounce, setDebounce] = React.useState<{ input: T; value: T }>({
    input: value,
    value: value,
  })

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setDebounce(prev => ({ ...prev, value: prev.input }))
    }, delay)

    return () => {
      clearTimeout(timer)
    }
  }, [debounce.input, delay])

  const setValue = (value: T) =>
    setDebounce(prev => ({ ...prev, input: value }))

  return [debounce, setValue] as const
}
