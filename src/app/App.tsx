import { ThemeProvider } from '@libs/theme';
import { AppRouter } from '@routes';
import { AuthProvider } from '@providers';
import { QueryClient, QueryClientProvider } from '@libs/query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: true,
      retry: 3,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
          <AppRouter />
        </ThemeProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export { App };
