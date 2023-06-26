'use client';

import { SessionProvider as Provider } from "next-auth/react";

const SessionProvider = ({session, children}) => {
  return (
    <Provider session={session}>
        {children}
    </Provider>
  )
}

export default SessionProvider