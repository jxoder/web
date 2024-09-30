import React from 'react'

interface ITextAreaInputProps
  extends Omit<
    React.InputHTMLAttributes<HTMLTextAreaElement>,
    'type' | 'onChange'
  > {
  label?: string
  rows?: number
  onChange?: (value: string) => void
}

const Input: React.FC<ITextAreaInputProps> = props => {
  const { onChange, ...rest } = props
  return (
    <div>
      <label className="mb-3 block text-black dark:text-white">
        {!!props.label && props.label}
      </label>
      <textarea
        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
        onChange={e => onChange?.(e.target.value)}
        {...rest}
      />
    </div>
  )
}

export default Input
