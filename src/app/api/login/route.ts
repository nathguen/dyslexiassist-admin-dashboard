import { User } from "@prisma/client";
import { z } from "zod";

const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export async function POST(request: Request) {
  const { email: emailValue, password: passwordValue } = await request.json();

  const { email, password } = LoginSchema.parse({
    email: emailValue,
    password: passwordValue,
  });

  const userResp = await fetch("http://localhost:4000/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!userResp.ok) {
    return new Response("Invalid username or password", {
      status: 401,
      headers: {
        "Set-Cookie": "sessionID=; Max-Age=0",
      },
    });
  }

  const respData = await userResp.json();

  const token: string = respData.token;
  const user: User = respData.user;

  // check that the user has admin privileges
  if (user.role !== "ADMIN") {
    return new Response("You do not have permission to access this page", {
      status: 403,
      headers: {
        "Set-Cookie": "sessionID=; Max-Age=0",
      },
    });
  }

  return new Response("", {
    status: 200,
    headers: {
      "Set-Cookie": `sessionID=${token}; Max-Age=604800;`,
    },
  });
}
