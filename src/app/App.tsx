import { useState } from 'react';
import './App.css';
import { Button } from '@shared/ui';
import { ThemeProvider } from '@shared/libs/theme';
import { ModeToggle } from '@shared/ui';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <Button onClick={() => setCount((prev) => prev + 1)}>Click me</Button>
        <p className="text-blue">{count}</p>
        <ModeToggle />
      </ThemeProvider>
    </div>
  );
}

export { App };
