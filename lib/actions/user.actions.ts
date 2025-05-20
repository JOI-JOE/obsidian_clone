"use server";

import { clerkClient } from "@clerk/nextjs/server";
import type { User as ClerkUser } from "@clerk/nextjs/server";
import { getUserColor } from "../utils";

export const getClerkUsers = async ({ userIds }: { userIds: string[] }) => {
  try {
    const client = await clerkClient();

    const { data } = await client.users.getUserList({
      userId: userIds,
    });

    const users = data.map((user: ClerkUser) => ({
      id: user.id,
      name:
        `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim() ||
        "Unknown User",
      email: user.emailAddresses[0]?.emailAddress ?? "",
      avatar: user.imageUrl,
      color: getUserColor(user.id),
    }));

    // Sắp xếp theo thứ tự userIds truyền vào (dựa theo id, không phải email)
    const sortedUsers = userIds.map((id) =>
      users.find((user) => user.id === id)
    );

    return sortedUsers;
  } catch (error) {
    console.error(`Error fetching users:`, error);
    return [];
  }
};
