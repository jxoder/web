interface IProps {
  loading?: boolean
  children?: React.ReactNode
}

const LoadableContainer: React.FC<IProps> = props => {
  const { loading, children } = props
  return (
    <>
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-primary border-t-transparent"></div>
        </div>
      )}
      {children}
    </>
  )
}

export default LoadableContainer
