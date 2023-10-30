"use client";

import { SessionProvider } from 'next-auth/react';

const Provider = ({ children, session }) => {
  return (
    <SessionProvider session={ session }>
      <div className="page-container min-h-screen">
        { children }
      </div>
    </SessionProvider>
  )
}

export default Provider;