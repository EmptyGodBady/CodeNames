import { ERootEndpoints } from "@/constants/enums";
import Link from "next/link";
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
    <main className="min-h-screen bg-[#114357] flex flex-col justify-center items-center">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
        />

        <button type="submit">Create room</button>
      </form>
    </main>
  );
}
