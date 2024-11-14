import { ThemeProvider } from '@shared/libs/theme';
import { AppRouter } from '../routes';

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <AppRouter />
    </ThemeProvider>
  );
}

export { App };
