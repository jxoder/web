import { observer } from 'mobx-react-lite'
import { useStore } from '../hook/useStore'
import { AuthState } from '../store/auth.store'
import { Navigate } from 'react-router-dom'
import Loading from '../components/common/Loading'

interface Props {
  children: React.ReactNode
}

const Authenticated: React.FC<Props> = observer(({ children }) => {
  const { auth } = useStore()

  if (auth.state === AuthState.loading) {
    return <Loading />
  }

  if (auth.state === AuthState.loggedOut) {
    return <Navigate to="/login" />
  }

  return children
})

export default Authenticated
