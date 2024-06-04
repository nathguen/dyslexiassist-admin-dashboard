import crypto from "crypto";
import type { NextApiRequest, NextApiResponse } from "next";
import { redirect } from "next/navigation";

function encrypt(data: any) {
  const algorithm = "aes-256-cbc";
  const secretKey = "vOVH6sdmpNWjRRIqCc7rdxs01lwHzfr3";
  const iv = crypto.randomBytes(16);

  const cipher = crypto.createCipheriv(algorithm, secretKey, iv);
  const encrypted = Buffer.concat([cipher.update(data), cipher.final()]);

  return {
    iv: iv.toString("hex"),
    content: encrypted.toString("hex"),
  };
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let dataError = false;

  // @ts-ignore
  const formData = req.formData();
  formData.append("email", req.body.email);
  formData.append("password", req.body);

  try {
    const data = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    const resp = await fetch("http:localhost:4000/auth/login", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const json = await resp.json();

    // if (resp.ok) {
    //   const sessionData = req.body;
    //   const encryptedSessionData = encrypt(sessionData);

    //   const cookie = serialize("sessionID", encryptedSessionData.content, {
    //     httpOnly: true,
    //     secure: process.env.NODE_ENV === "production",
    //     maxAge: 60 * 60 * 24 * 7, // One week
    //     path: "/",
    //   });
    //   res.setHeader("Set-Cookie", cookie);
    //   res.status(200).json({ message: "Successfully set cookie!" });

    //   redirect("/dashboard");
    // } else {
    //   throw new Error(json.message);
    // }
  } catch (error) {
    dataError = true;
    console.error(error);
  }

  if (!dataError) {
    redirect("/dashboard");
  }
}
