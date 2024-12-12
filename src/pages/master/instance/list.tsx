import { JXDataTable } from '@/components/jx-data-table'
import { Sheet } from '@/components/ui/sheet'
import { useQueryParam } from 'use-query-params'
import { createColumns } from './columns'
import { instanceApi } from '@/api'
import { Button } from '@/components/ui/button'
import React from 'react'
import { CreateInstance } from './new'
import { InstanceDetail } from './detail'

export const InstancePage: React.FC = () => {
  const [token, setToken] = React.useState(1)
  const [id, setId] = useQueryParam<string | undefined>('instanceId')

  const onCreate = React.useCallback(() => {
    setToken(token + 1)
    setId(undefined)
  }, [token, setToken, setId])

  return (
    <div className="w-full h-full">
      <Sheet open={!!id} onOpenChange={() => setId(undefined)}>
        <JXDataTable
          columns={createColumns}
          listApi={(filters: object) => instanceApi.list(filters)}
          token={token.toString()}
          onSelectRow={id => setId(id)}
          toolbarRender={() => (
            <>
              <Button
                className="bg-blue-500 hover:bg-blue-600 ml-auto h-8"
                size="sm"
                onClick={() => setId('new')}
              >
                New Instance
              </Button>
            </>
          )}
        />

        {!!id && id === 'new' && <CreateInstance onSuccess={onCreate} />}
        {!!id && id !== 'new' && <InstanceDetail instanceId={id} />}
      </Sheet>
    </div>
  )
}
