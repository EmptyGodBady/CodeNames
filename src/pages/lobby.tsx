import { useRouter } from "next/router";
import { FormEvent, useState } from "react";
import createUser from "../../requesters/createUser";
import LobbyForm from "@/components/lobby/lobbyForm";

export default function Page() {
  const [name, setName] = useState("");

  const router = useRouter();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await createUser(name);

    localStorage.setItem("name", name);
    router.push("/game");
  };

  return (
    <main className="min-h-screen bg-neutral-500 flex flex-col justify-center items-center">
      <LobbyForm setName={setName} name={name} handleSubmit={handleSubmit} />
    </main>
  );
}
