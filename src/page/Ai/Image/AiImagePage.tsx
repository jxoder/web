import { observer } from 'mobx-react-lite'
import { useStore } from '../../../hook/useStore'
import React from 'react'
import TextInput from '../../../components/base/TextInput'
import SelectBox from '../../../components/base/SelectBox'
import TextAreaInput from '../../../components/base/TextareaInput'
import LoadableContainer from '../../../container/LoadableContainer'
import NumberInput from '../../../components/base/NumberInput'
import { FORM_TYPE } from '../../../interface/comfy.interface'

const AiImagePage: React.FC = observer(() => {
  const store = useStore()

  const [type, setType] = React.useState<string>()

  React.useEffect(() => {
    store.comfy.getWorkflows()
  }, [store])

  return (
    <LoadableContainer loading={store.comfy.loading}>
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
            <div className="flex flex-col gap-1.5 p-5.5">
              <SelectBox
                options={store.comfy.workflows.map(wf => ({
                  label: wf.type,
                  value: wf.type,
                }))}
                onSelected={value => setType(value)}
              />
              {store.comfy.workflows
                .find(wf => wf.type === type)
                ?.forms.map((form, index) => {
                  switch (form.type) {
                    case FORM_TYPE.TEXT:
                      return (
                        <TextInput
                          key={`${index}-${form.name}`}
                          label={form.label ?? form.name}
                        />
                      )
                    case FORM_TYPE.SELECT:
                      return (
                        <SelectBox
                          key={`${index}-${form.name}`}
                          label={form.label}
                          options={form.values!}
                          onSelected={value => console.log(value)}
                        />
                      )
                    case FORM_TYPE.TEXTAREA:
                      return (
                        <TextAreaInput
                          key={`${index}-${form.name}`}
                          label={form.label ?? form.name}
                          rows={4}
                        />
                      )
                    case FORM_TYPE.NUMBER:
                      return (
                        <NumberInput
                          key={`${index}-${form.name}`}
                          label={form.label ?? form.name}
                          defaultValue={form.defaultValue as number}
                          max={1024}
                          onChange={value => console.log(value)}
                        />
                      )
                  }
                })}
              {/* <TextInput label="prompt" /> */}
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
    </LoadableContainer>
  )
})

export default AiImagePage
