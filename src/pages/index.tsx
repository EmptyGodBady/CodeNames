import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-neutral-500 flex flex-col justify-evenly items-center">
      <p className="text-dark text-8xl">CodeNames</p>
      <Link href="/lobby">
        <button className="inline-block rounded bg-neutral-800 px-6 pb-2 pt-2 text-xs font-medium uppercase leading-normal text-neutral-50 shadow-dark-3 transition duration-150 ease-in-out hover:bg-neutral-700 hover:shadow-dark-2 focus:bg-neutral-700 focus:shadow-dark-2 focus:outline-none focus:ring-0 active:bg-neutral-900 active:shadow-dark-2 motion-reduce:transition-none dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong">
          Play
        </button>
      </Link>
    </main>
  );
}
