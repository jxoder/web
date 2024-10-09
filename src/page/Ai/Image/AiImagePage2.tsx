import { observer } from 'mobx-react-lite'
import React from 'react'
import { useStore } from '../../../hook/useStore'
import LoadableContainer from '../../../container/LoadableContainer'
import { SelectBox } from '../../../components/base/SelectBox'
import { WORKFLOW_FORM_INPUT_TYPE } from '../../../interface/ai-image/workflow-input.interface'
import { TextInput } from '../../../components/base/TextInput'
import { TextAreaInput } from '../../../components/base/TextAreaInput'
import { NumberInput } from '../../../components/base/NumberInput'
import { RangeNumberInput } from '../../../components/base/RangeNumberInput'

export const AiImagePage2: React.FC = observer(() => {
  const store = useStore()
  const aiImageStore = store.aiImage

  React.useEffect(() => {
    aiImageStore.init()

    return () => {
      aiImageStore.reset()
    }
  }, [aiImageStore])

  return (
    <LoadableContainer loading={store.aiImage.loading}>
      <div className="container mx-auto">
        <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
          {/* input container */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="flex justify-between items-center border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h1>Input...</h1>
              <button
                className="w-24 h-4 flex items-center justify-center cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
                // onClick={handleSubmit}
              >
                Generate
              </button>
            </div>
            {/* form container */}
            <div className="flex flex-col min-h-100 gap-1.5 p-5.5">
              {/* if not exists workflows */}
              {aiImageStore.workflows.length === 0 && (
                <div>
                  <p>No data</p>
                </div>
              )}
              {/* select workflow type */}
              {aiImageStore.workflows.length > 0 && (
                <div>
                  <SelectBox
                    options={aiImageStore.workflows.map(w => ({
                      label: w.name,
                      value: w.type,
                    }))}
                    defaultValue={
                      aiImageStore.selectedWorkflow?.type ?? undefined
                    }
                    onSelected={value => aiImageStore.selectWorkflow(value)}
                  />
                </div>
              )}
              <div className="h-2" />
              {aiImageStore.selectedWorkflow &&
                aiImageStore.selectedWorkflow.forms.map((form, index) => {
                  switch (form.type) {
                    case WORKFLOW_FORM_INPUT_TYPE.TEXT:
                      return (
                        <TextInput
                          key={`${index}-${form.name}`}
                          label={form.label}
                          value={aiImageStore.getWorkflowPayload(form.name)}
                          required={form.required}
                          onChange={value =>
                            aiImageStore.setWorkflowPayload(form.name, value)
                          }
                        />
                      )
                    case WORKFLOW_FORM_INPUT_TYPE.TEXTAREA:
                      return (
                        <TextAreaInput
                          key={`${index}-${form.name}`}
                          label={form.label}
                          required={form.required}
                          value={aiImageStore.getWorkflowPayload(form.name)}
                          onChange={value =>
                            aiImageStore.setWorkflowPayload(form.name, value)
                          }
                        />
                      )

                    case WORKFLOW_FORM_INPUT_TYPE.NUMBER:
                      return (
                        <NumberInput
                          key={`${index}-${form.name}`}
                          label={form.label}
                          required={form.required}
                          value={aiImageStore.getWorkflowPayload(form.name)}
                          onChange={value =>
                            aiImageStore.setWorkflowPayload(form.name, value)
                          }
                        />
                      )
                    case WORKFLOW_FORM_INPUT_TYPE.SELECT:
                      return (
                        <SelectBox
                          key={`${index}-${form.name}`}
                          label={form.label}
                          required={form.required}
                          defaultValue={aiImageStore.getWorkflowPayload(
                            form.name,
                          )}
                          options={form.options}
                          onSelected={value =>
                            aiImageStore.setWorkflowPayload(form.name, value)
                          }
                        />
                      )
                    case WORKFLOW_FORM_INPUT_TYPE.RANGE:
                      return (
                        <RangeNumberInput
                          key={`${index}-${form.name}`}
                          label={form.label}
                          value={aiImageStore.getWorkflowPayload(form.name)}
                          onChange={value =>
                            aiImageStore.setWorkflowPayload(form.name, value)
                          }
                          step={form.step}
                          min={form.min}
                          max={form.max}
                        />
                      )
                    default:
                      return <div key={index}>Unknown type</div>
                  }
                })}
            </div>
          </div>
          {/* preview  */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                preview
              </h3>
            </div>
            {/* preview image */}
          </div>
        </div>
      </div>
    </LoadableContainer>
  )
})
