"use client";

import { Button, TextField } from "@radix-ui/themes";
import axios from "axios";
import { RedirectType, redirect } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleLogin = async (formData: FormData) => {
    const email = formData.get("email");
    const password = formData.get("password");

    let errorMessage = "";

    try {
      setLoading(true);
      await axios.post("/api/login", {
        email,
        password,
      });
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        errorMessage = error.response.data;
      } else {
        errorMessage = "An error occurred. Please try again.";
      }
    } finally {
      setLoading(false);
    }

    if (errorMessage === "") {
      redirect("/dashboard", RedirectType.replace);
    } else {
      setErrorMessage(errorMessage);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-3xl mb-4">Operation Read Admin Login</h1>
      <form
        className="flex flex-col gap-2 w-full max-w-xl"
        action={handleLogin}
      >
        <TextField.Root
          radius="full"
          placeholder="Username"
          size="3"
          name="email"
          required
        />

        <TextField.Root
          radius="full"
          placeholder="Password"
          size="3"
          name="password"
          type="password"
          required
        />

        <div className="text-red-500">{errorMessage}</div>

        <div className="w-full flex flex-row justify-end">
          <Button
            size="2"
            radius="full"
            type="submit"
            disabled={loading}
            loading={loading}
          >
            Submit
          </Button>
        </div>
      </form>
    </main>
  );
}
