import React from 'react'

interface ItextInputProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    'type' | 'onChange'
  > {
  label?: string
  onChange?: (value: string) => void
}

export const TextInput: React.FC<ItextInputProps> = props => {
  const { onChange, ...rest } = props
  return (
    <div>
      {!!props.label && (
        <label className="mb-3 block text-black dark:text-white">
          {props.label}
        </label>
      )}
      <input
        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
        type="text"
        onChange={e => onChange?.(e.target.value)}
        {...rest}
      />
    </div>
  )
}
