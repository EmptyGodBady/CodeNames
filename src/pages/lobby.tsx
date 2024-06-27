import Link from "next/link";
export default function Page() {
  return (
    <main className="min-h-screen bg-[#114357] flex flex-col justify-center items-center">
      <input type="text placeholder" placeholder="Enter your name" />
      <button>
        <Link href="/game">Create room</Link>
      </button>
    </main>
  );
}
