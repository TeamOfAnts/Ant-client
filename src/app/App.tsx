import { ThemeProvider } from '@libs/theme';
import { AppRouter } from '@routes';
import { AuthProvider } from '@providers';

function App() {
  return (
    <AuthProvider>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <AppRouter />
      </ThemeProvider>
    </AuthProvider>
  );
}

export { App };
