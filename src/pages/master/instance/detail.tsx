import { instanceApi } from '@/api'
import { INSTANCE_PROVIDER } from '@/api/instance/instance.model'
import {
  DataTableSheetDetailContainer,
  DataTableSheetDetailContent,
} from '@/components/jx-data-table/data-table-detail'
import { Typography } from '@/components/typography'
import { Badge } from '@/components/ui/badge'
import { Label } from '@/components/ui/label'
import { useQuery } from '@tanstack/react-query'

interface IProps {
  instanceId?: string
}

export const InstanceDetail: React.FC<IProps> = props => {
  const { instanceId } = props

  const { data, isFetching } = useQuery({
    queryKey: [instanceId],
    queryFn: () => {
      if (!instanceId || !Number(instanceId)) {
        return Promise.resolve(null)
      }

      return instanceApi.get(Number(instanceId))
    },
  })

  return (
    <DataTableSheetDetailContainer title="Instance Detail">
      <DataTableSheetDetailContent>
        {isFetching && <div>loading...</div>}
        {!isFetching && !data && <div>데이터가 없습니다.</div>}

        {!isFetching && data && (
          <>
            <div className="grid grid-cols-4 items-center">
              <Label>Name</Label>
              <Typography.P>{data.name}</Typography.P>
            </div>
            <div className="grid grid-cols-4 items-center">
              <Label>Provider</Label>
              <div>
                <Badge className="text-md font-mono" variant="outline">
                  {data.provider}
                </Badge>
              </div>
            </div>
            {data.provider === INSTANCE_PROVIDER.LOCAL && (
              <div className="grid grid-cols-4 items-center">
                <Label>IP Address</Label>
                <div>
                  <Typography.Code className="col-span-3 inline-block px-3 bg-gray-300">
                    {data.config.ipAddress}
                  </Typography.Code>
                </div>
              </div>
            )}
            {data.provider === INSTANCE_PROVIDER.LOCAL && (
              <div className="grid grid-cols-4 items-center">
                <Label>Mac Address</Label>
                <div className="col-span-3">
                  <Typography.Code className="inline-block px-3 bg-gray-300">
                    {data.config.macAddress}
                  </Typography.Code>
                </div>
              </div>
            )}
          </>
        )}
      </DataTableSheetDetailContent>
    </DataTableSheetDetailContainer>
  )
}
