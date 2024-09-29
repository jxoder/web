import { observer } from 'mobx-react-lite'
import { useStore } from '../../../hook/useStore'
import React from 'react'
import TextInput from '../../../components/base/TextInput'
import SelectBox from '../../../components/base/SelectBox'

const AiImagePage: React.FC = observer(() => {
  const store = useStore()

  React.useEffect(() => {
    store.comfy.getWorkflows()
  }, [store])
  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
        {/* input Fields */}
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white">
              Inputs...
            </h3>
          </div>
          {/* input.. */}
          <div className="flex flex-col gap-5.5 p-6.5">
            <SelectBox
              options={[
                { label: 'hello', value: 'hello' },
                { label: 'world', value: 'world' },
              ]}
              defaultValue={{ label: 'world', value: 'world' }}
              onSelected={value => console.log(value)}
            />
            <TextInput label="prompt" />
          </div>
        </div>
        {/* preview ... */}
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white">
              preview ...
            </h3>
          </div>
          {/* input.. */}
          <div className="flex flex-col gap-5.5 p-6.5">//</div>
        </div>
      </div>
    </div>
  )
})

export default AiImagePage
