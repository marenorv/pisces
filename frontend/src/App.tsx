import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Count } from '@components/Count.tsx'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Count />
    </QueryClientProvider>
  )
}

export default App
