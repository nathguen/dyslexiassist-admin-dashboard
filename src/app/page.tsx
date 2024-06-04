import { Button, TextField } from "@radix-ui/themes";
import { redirect } from "next/navigation";

export default function Home() {
  async function login(formData: FormData) {
    "use server";

    let dataError = false;

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
    } catch (error) {
      dataError = true;
      console.error(error);
    }

    if (!dataError) {
      redirect("/dashboard");
    }

    // mutate data
    // revalidate cache
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <form className="flex flex-col gap-2 w-full max-w-xl" action={login}>
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

        <div className="w-full flex flex-row justify-end">
          <Button className="w-1/2" radius="full" type="submit">
            Submit
          </Button>
        </div>
      </form>
    </main>
  );
}
