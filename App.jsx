import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import AppNavigation from './src/navigations';

function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <AppNavigation />
    </QueryClientProvider>
  );
}

export default App;
