import {
  ICreateInstancePayload,
  ILocalInstanceConfig,
  INSTANCE_PROVIDER,
} from '@/api/instance/instance.model'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import React from 'react'
import { Textarea } from '@/components/ui/textarea'
import { instanceApi } from '@/api'
import { Loader2 } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import { safeParseError } from '@/utils'
import {
  DataTableSheetDetailContainer,
  DataTableSheetDetailContent,
  DataTableSheetDetailFooter,
} from '@/components/jx-data-table/data-table-detail'

interface IProps {
  onSuccess?: () => void
}

export const CreateInstance: React.FC<IProps> = props => {
  const { onSuccess } = props
  const { toast } = useToast()
  const [provider, setProvider] = React.useState<INSTANCE_PROVIDER | null>(null)

  const [payload, setPayload] = React.useState<Partial<ICreateInstancePayload>>(
    {},
  )
  const [loading, setLoading] = React.useState(false)

  return (
    <DataTableSheetDetailContainer title="Create Instance">
      <DataTableSheetDetailContent>
        <div className="grid grid-cols-4 items-center">
          <Label>Name</Label>
          <Input
            className="col-span-3"
            onChange={e =>
              setPayload(prev => ({
                ...prev,
                name: e.target.value,
              }))
            }
          />
        </div>
        <div className="grid grid-cols-4 items-center">
          <Label htmlFor="provider">Provider</Label>
          <Select
            value={provider ?? undefined}
            onValueChange={value => {
              setProvider(value as INSTANCE_PROVIDER)
              setPayload(prev => ({
                ...prev,
                provider: value as INSTANCE_PROVIDER,
              }))
            }}
          >
            <SelectTrigger className="col-span-3">
              <SelectValue placeholder="Select a provider" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={INSTANCE_PROVIDER.LOCAL}>local</SelectItem>
              <SelectItem value={INSTANCE_PROVIDER.AWS}>aws</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {!!provider && <Separator orientation="horizontal" className="mt-2" />}
        {provider === INSTANCE_PROVIDER.LOCAL && (
          <>
            <div>Local Config</div>
            <div className="grid grid-cols-4 items-center">
              <Label>IP Address</Label>
              <Input
                className="col-span-3"
                onChange={e =>
                  setPayload(prev => ({
                    ...prev,
                    config: {
                      ...prev.config,
                      ipAddress: e.target.value,
                    } as ILocalInstanceConfig,
                  }))
                }
              />
            </div>
            <div className="grid grid-cols-4 items-center">
              <Label>Mac Address</Label>
              <Input
                className="col-span-3"
                placeholder="00-00-00-00-00-00"
                onChange={e =>
                  setPayload(prev => ({
                    ...prev,
                    config: {
                      ...prev.config,
                      macAddress: e.target.value,
                    } as ILocalInstanceConfig,
                  }))
                }
              />
            </div>
            <div className="grid grid-cols-4 items-center">
              <Label>SSH Key</Label>
              <Textarea
                rows={4}
                className="col-span-3"
                placeholder="input ssh private key"
                onChange={e =>
                  setPayload(prev => ({
                    ...prev,
                    config: {
                      ...prev.config,
                      sshPrivateKey: e.target.value,
                    } as ILocalInstanceConfig,
                  }))
                }
              />
            </div>
          </>
        )}
        {provider === INSTANCE_PROVIDER.AWS && (
          <>
            <div>AWS Config</div>
            <div>Not implemented</div>
          </>
        )}
      </DataTableSheetDetailContent>
      <DataTableSheetDetailFooter>
        <Button
          onClick={async () => {
            setLoading(true)
            await instanceApi
              .create(payload as ICreateInstancePayload)
              .then(_res => {
                toast({
                  title: 'success',
                  description: 'Instance created',
                  variant: 'success',
                  duration: 1000,
                })
                onSuccess?.()
              })
              .catch(e => {
                toast({
                  title: 'Failed to create instance',
                  description: safeParseError(e),
                  variant: 'destructive',
                  duration: 1000,
                })
              })
              .finally(() => {
                setLoading(false)
              })
          }}
          disabled={loading}
        >
          {loading && <Loader2 className="w-4 h-4 animate-spin" />} Create
        </Button>
      </DataTableSheetDetailFooter>
    </DataTableSheetDetailContainer>
  )
}
