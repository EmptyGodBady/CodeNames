import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#114357] flex flex-col justify-evenly items-center">
      <p className="text-white text-8xl">CodeNames</p>
      <button className="w-[100px] h-[75px] bg-slate-600">
        <Link href="/lobby">Play</Link>
      </button>
    </main>
  );
}
