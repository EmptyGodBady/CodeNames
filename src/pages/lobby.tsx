import { ERootEndpoints } from "@/constants/enums";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Page() {
  const [name, setName] = useState("");
  const router = useRouter();
  const handleSubmit = async (event: any) => {
    event.preventDefault();

    const response = await fetch(ERootEndpoints.User, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    });

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem("name", name);
      router.push("/game");
      console.log("Data saved:", data);
    } else {
      console.error("Failed to save data");
    }
  };
  return (
    <main className="min-h-screen bg-neutral-500 flex flex-col justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-between h-[100px]"
      >
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          className="border border-neutral-800 bg-transparent rounded-md h-8 w-[200px] pl-1 placeholder:text-black"
        />
        <button
          type="submit"
          className=" inline-block rounded bg-neutral-800 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-neutral-50 shadow-dark-3 transition duration-150 ease-in-out hover:bg-neutral-700 hover:shadow-dark-2 focus:bg-neutral-700 focus:shadow-dark-2 focus:outline-none focus:ring-0 active:bg-neutral-900 active:shadow-dark-2 motion-reduce:transition-none dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
        >
          Create room
        </button>
      </form>
    </main>
  );
}
