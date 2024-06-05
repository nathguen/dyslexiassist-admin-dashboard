import { User } from "@prisma/client";
import { cookies } from "next/headers";
import { prisma } from "prisma/client";

interface GetUsersResponse {
  users: User[];
  message: string;
}

export async function getUsers(): Promise<GetUsersResponse> {
  // check that the request has a sessionID cookie
  const cookieStore = cookies();
  const sessionCookie = cookieStore.get("sessionID");
  const sessionID = sessionCookie?.value || "";

  if (!sessionID) {
    return { users: [], message: "No sessionID cookie found" };
  }

  // check that the sessionID cookie is valid
  const userInfoResp = await fetch("http://localhost:4000/auth/me", {
    headers: {
      Authorization: `Bearer ${sessionID}`,
    },
  });

  if (!userInfoResp.ok) {
    return { users: [], message: "Invalid sessionID cookie" };
  }

  const userInfoData: User = await userInfoResp.json();
  const user = userInfoData;

  if (user.role !== "ADMIN") {
    return {
      users: [],
      message: "You do not have permission to access this page",
    };
  }

  const users = (await prisma.user.findMany())
    // sort by createdAt in descending order
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  return { users, message: "Successfully retrieved users" };
}
