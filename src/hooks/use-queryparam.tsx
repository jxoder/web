import React from 'react'
import { useSearchParams } from 'react-router-dom'

export const useQueryParamNumber = (param: string, defaultValue: number) => {
  const [searchParams, setSearchParams] = useSearchParams()

  // getter
  const getValue = () => {
    const value = searchParams.get(param)
    if (!value) return defaultValue

    const p = Number(value)
    return p ?? defaultValue ?? null
  }

  // setter
  const setValue = React.useCallback(
    (value: number | null) => {
      const params = new URLSearchParams(searchParams)
      if (value === null) {
        params.delete(param)
      } else {
        params.set(param, value.toString())
      }
      setSearchParams(params)
    },
    [searchParams, setSearchParams, param],
  )

  return [getValue(), setValue] as const
}
