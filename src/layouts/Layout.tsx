import { ReactNode } from 'react';
import { SideBar } from './SideBar';
import { Toaster } from '@shared/ui';

function Layout(props: { children: ReactNode }) {
  // prop destruction
  const { children } = props;
  // lib hooks
  // state, ref hooks
  // form hooks
  // query hooks
  // calculated values
  // effects
  // handlers
  return (
    <div className="flex h-screen">
      <SideBar />
      <main className="flex-1 p-4 bg-gray-50 overflow-auto w-full h-full">{children}</main>
      <Toaster />
    </div>
  );
}

export { Layout };
