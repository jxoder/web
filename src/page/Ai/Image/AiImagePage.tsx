import { observer } from 'mobx-react-lite'
import { useStore } from '../../../hook/useStore'
import React from 'react'
import TextInput from '../../../components/base/TextInput'
import SelectBox from '../../../components/base/SelectBox'
import TextAreaInput from '../../../components/base/TextAreaInput'
import LoadableContainer from '../../../container/LoadableContainer'
import NumberInput from '../../../components/base/NumberInput'
import { FORM_TYPE } from '../../../interface/comfy.interface'
import SlideNumberInput from '../../../components/base/SlideNumberInput'
import Loading from '../../../components/common/Loading'
import { TASK_STATUS } from '../../../interface/models/ai-image-task.interface'

const AiImagePage: React.FC = observer(() => {
  const store = useStore()

  const [type, setType] = React.useState<string>()
  const [payload, setPayload] = React.useState<Record<string, unknown>>({})

  React.useEffect(() => {
    store.comfy.getWorkflows()
    store.comfy.pollingQueue()

    // reset
    return () => {
      store.comfy.reset()
    }
  }, [store])

  React.useEffect(() => {
    if (store.comfy.workflows.length > 0) {
      setType(store.comfy.workflows[0].type)
    }
  }, [store.comfy.workflows])

  React.useEffect(() => {
    // reset payload when type changes
    setPayload({})
  }, [type])

  const handleSubmit = async () => {
    const forms = store.comfy.workflows.find(wf => wf.type === type)?.forms
    if (!forms) {
      return
    }

    const defaultPayload = forms.reduce((acc, form) => {
      switch (form.type) {
        case FORM_TYPE.TEXT:
        case FORM_TYPE.TEXTAREA:
        case FORM_TYPE.NUMBER:
          return { ...acc, [form.name]: form.defaultValue }
        case FORM_TYPE.SELECT:
          return { ...acc, [form.name]: form.values![0].value }
        case FORM_TYPE.SLIDE:
          return { ...acc, [form.name]: form.defaultValue }
      }
    }, {})

    await store.comfy.request({
      type,
      payload: { ...defaultPayload, ...payload },
    })
  }

  const handlePayload = (key: string, value: unknown) => {
    setPayload({ ...payload, [key]: value })
  }

  return (
    <LoadableContainer loading={store.comfy.loading}>
      <div className="container mx-auto">
        <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
          {/* input Fields */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="flex justify-between items-center border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Inputs...
              </h3>
              <button
                className="w-24 h-4 flex items-center justify-center cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
                onClick={handleSubmit}
              >
                Generate
              </button>
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
                    case FORM_TYPE.SELECT:
                      return (
                        <SelectBox
                          key={`${index}-${form.name}`}
                          label={form.label}
                          options={form.values!}
                          required={form.required}
                          onSelected={value => handlePayload(form.name, value)}
                        />
                      )
                    case FORM_TYPE.TEXT:
                      return (
                        <TextInput
                          key={`${index}-${form.name}`}
                          label={form.label ?? form.name}
                          value={(payload?.[form.name] as string) ?? ''}
                          onChange={value => handlePayload(form.name, value)}
                        />
                      )
                    case FORM_TYPE.TEXTAREA:
                      return (
                        <TextAreaInput
                          key={`${index}-${form.name}`}
                          label={form.label ?? form.name}
                          value={(payload?.[form.name] as string) ?? ''}
                          rows={4}
                          onChange={value => handlePayload(form.name, value)}
                        />
                      )
                    case FORM_TYPE.NUMBER:
                      return (
                        <NumberInput
                          key={`${index}-${form.name}`}
                          label={form.label ?? form.name}
                          defaultValue={form.defaultValue as number}
                          max={1024}
                          onChange={value => handlePayload(form.name, value)}
                        />
                      )
                    case FORM_TYPE.SLIDE:
                      return (
                        <SlideNumberInput
                          key={`${index}-${form.name}`}
                          label={form.label ?? form.name}
                          initialValue={form.defaultValue as number}
                          min={form.min}
                          max={form.max}
                          step={form.step}
                          onChange={value => handlePayload(form.name, value)}
                        />
                      )
                  }
                })}
            </div>
          </div>
          {/* preview ... */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                preview
              </h3>
            </div>
            {store.comfy.currentTask &&
              [TASK_STATUS.ACTIVE, TASK_STATUS.WAITING].includes(
                store.comfy.currentTask.status,
              ) && <Loading />}
            {store.comfy.currentTask?.status === TASK_STATUS.SUCCESS &&
              (store.comfy.currentTask.images ?? []).length > 0 && (
                <img src={store.comfy.currentTask.images![0].url} alt="image" />
              )}
          </div>
        </div>
      </div>
    </LoadableContainer>
  )
})

export default AiImagePage
