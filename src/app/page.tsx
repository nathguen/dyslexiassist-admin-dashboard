import Image from "next/image";
import { Flex, Text, Button, TextField } from '@radix-ui/themes';
import { FaSearch } from "react-icons/fa";
import { FormEvent } from 'react'

export default function Home() {
  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // grab the submit stuff

    const formData = new FormData(e.currentTarget)
    const response = await fetch('/api/submit', {
      method: 'POST',
      body: formData,
    })
 
    // Handle response if necessary
    const data = await response.json()

    console.log({
      event: formData,
      data,
    })
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <form className="flex flex-col gap-2 w-full max-w-xl" onSubmit={onSubmit}>
        <TextField.Root radius="full" placeholder="Username" size="3" name="username" />
        <TextField.Root radius="full" placeholder="Password" size="3" name="password" type="password" />

        <div className="w-full flex flex-row justify-end">
          <Button className="w-1/2" radius="full" type="submit">Submit</Button>
        </div>
      </form>
    </main>
  );
}
