import { useState } from 'react';
import './App.css';
import { Button } from '@shared/ui';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <Button onClick={() => setCount((prev) => prev + 1)}>Click me</Button>
      <p className="text-blue">{count}</p>
    </div>
  );
}

export { App };
