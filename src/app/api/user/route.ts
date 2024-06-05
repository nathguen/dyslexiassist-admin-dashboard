import { cookies } from "next/headers";
import { prisma } from "prisma/client";

export async function PUT(request: Request) {
  const { id, isApproved } = await request.json();

  // check that the request has a sessionID cookie
  const cookieStore = cookies();
  const sessionCookie = cookieStore.get("sessionID");
  const sessionID = sessionCookie?.value || "";

  if (!sessionID) {
    return new Response("No sessionID cookie found", {
      status: 401,
    });
  }

  // check that the sessionID cookie is valid
  const userInfoResp = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/me`,
    {
      headers: {
        Authorization: `Bearer ${sessionID}`,
      },
    }
  );

  if (!userInfoResp.ok) {
    return new Response("Invalid sessionID cookie", {
      status: 401,
      headers: {
        "Set-Cookie": "sessionID=; Max-Age=0",
      },
    });
  }

  // check that the user has admin privileges
  const userInfoData = await userInfoResp.json();
  if (userInfoData.role !== "ADMIN") {
    return new Response("You do not have permission to access this page", {
      status: 403,
    });
  }

  // update the user's approval status
  const user = await prisma.user.update({
    where: { id },
    data: { isApproved },
  });

  return new Response(JSON.stringify(user), {
    status: 200,
  });
}
