"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [uid, setUid] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (uid.length >= 9) router.push(`/player/${uid}`);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[url('https://res.cloudinary.com/genshin/image/upload/v1/map/tevyat.jpg')] bg-cover bg-center">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>

      <div className="relative z-10 w-full max-w-md p-8 text-center">
        <h1 className="mb-8 text-5xl font-black tracking-tighter text-white drop-shadow-2xl">
          GENSHIN <span className="text-yellow-400">SHOWCASE</span>
        </h1>

        <form onSubmit={handleSearch} className="flex flex-col gap-4">
          <input
            type="number"
            placeholder="Masukkan UID Pemain..."
            className="w-full rounded-2xl bg-white/10 p-5 text-center text-xl text-white outline-none ring-2 ring-white/20 transition-all focus:ring-yellow-400/50"
            value={uid}
            onChange={(e) => setUid(e.target.value)}
          />
          <button
            type="submit"
            className="w-full rounded-2xl bg-yellow-400 p-4 font-bold text-black transition-transform hover:scale-105 active:scale-95"
          >
            LIHAT STATISTIK
          </button>
        </form>
      </div>
    </main>
  );
}
