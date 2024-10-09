import React from 'react'

interface IProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    'type' | 'onChange' | 'value' | 'min' | 'max' | 'step'
  > {
  label?: string
  value?: number
  step?: number
  max?: number
  min?: number
  onChange?: (value: number) => void
}

export const RangeNumberInput: React.FC<IProps> = props => {
  const { onChange, ...rest } = props

  return (
    <div>
      {!!props.label && (
        <label className="mb-3 block text-black dark:text-white">
          {props.label}
        </label>
      )}
      <div className="flex items-top">
        <div className="w-full">
          <input
            type="range"
            className="w-full focus:border-primary cursor-pointer dark:accent-bodydark1"
            onChange={e => onChange?.(parseInt(e.target.value))}
            {...rest}
          />
          {props.step && props.step > 1 && props.min && props.max && (
            <div className="w-full flex justify-between">
              {Array.from({
                length: (props.max - props.min) / props.step! + 1,
              }).map((_, index) => (
                <span className="text-xs" key={index}>
                  {props.min! * (index + 1)}
                </span>
              ))}
            </div>
          )}
        </div>

        {!props.step ||
          (props.step === 1 && <div className="ml-3">{props.value}</div>)}
      </div>
    </div>
  )
}
