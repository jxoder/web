import React from 'react'

interface INumberInputProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    'type' | 'defaultValue' | 'onChange'
  > {
  label?: string
  defaultValue?: number
  onChange?: (value: number) => void
}

export const NumberInput: React.FC<INumberInputProps> = props => {
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
        type="number"
        defaultValue={props.defaultValue}
        onChange={e => onChange?.(parseInt(e.target.value))}
        {...rest}
      />
    </div>
  )
}
