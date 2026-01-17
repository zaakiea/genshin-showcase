"use client";
import { motion } from "framer-motion";

export default function Loading() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#0a0a0b] text-white">
      {/* Animasi Ikon Loading Khas Genshin */}
      <motion.div
        animate={{
          rotate: 360,
          scale: [1, 1.1, 1],
        }}
        transition={{
          rotate: { duration: 2, repeat: Infinity, ease: "linear" },
          scale: { duration: 1, repeat: Infinity, ease: "easeInOut" },
        }}
        className="relative mb-6 h-20 w-20 rounded-full border-4 border-yellow-400/20 border-t-yellow-400 shadow-[0_0_20px_rgba(250,204,21,0.3)]"
      />

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        className="text-lg font-bold tracking-[0.2em] text-yellow-400 uppercase"
      >
        Menghubungkan ke Tevyat...
      </motion.p>

      <p className="mt-2 text-sm text-slate-500">
        Mengambil data dari Enka Network
      </p>
    </div>
  );
}
