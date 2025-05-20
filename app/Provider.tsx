"use client";

import {
  LiveblocksProvider,
  ClientSideSuspense,
} from "@liveblocks/react/suspense";
import Loader from "@/components/Loader";
import { ReactNode } from "react";
import { getClerkUsers } from "@/lib/actions/user.actions";

const Provider = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <LiveblocksProvider
        authEndpoint="/api/liveblocks-auth"
        resolveUsers={async ({ userIds }) => {
          const users = await getClerkUsers({ userIds });

          console.log(users);
          return users;
        }}
      >
        <ClientSideSuspense fallback={<Loader />}>
          <div>{children}</div>
        </ClientSideSuspense>
      </LiveblocksProvider>
    </div>
  );
};

export default Provider;
