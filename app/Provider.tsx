"use client";

import {
  LiveblocksProvider,
  ClientSideSuspense,
} from "@liveblocks/react/suspense";
import Loader from "@/components/Loader";
import { ReactNode } from "react";

const Provider = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <LiveblocksProvider authEndpoint="/api/liveblocks-auth">
        <ClientSideSuspense fallback={<Loader />}>
          <div>{children}</div>
        </ClientSideSuspense>
      </LiveblocksProvider>
    </div>
  );
};

export default Provider;
