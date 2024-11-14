import { ReactNode } from 'react';
import { SideBar } from './SideBar';

function Layout(props: { children: ReactNode }) {
  // prop destruction
  const { children } = props;
  // lib hooks
  // state, ref hooks
  // query hooks
  // calculated values
  // effects
  // handlers
  return (
    <div className="flex h-screen">
      <SideBar />
      <main className="flex-1 p-4 bg-gray-50 overflow-auto">{children}</main>
    </div>
  );
}

export { Layout };
