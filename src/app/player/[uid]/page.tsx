// src/app/player/[uid]/page.tsx
import { EnkaResponse } from "@/types/enka";
import {
  getCharacterName,
  getCharacterData,
  getElementColor,
} from "@/lib/enka-utils";
import Image from "next/image";

async function getEnkaData(uid: string): Promise<EnkaResponse> {
  const res = await fetch(`https://enka.network/api/uid/${uid}/`, {
    headers: {
      // Sangat disarankan mengganti dengan nama proyek Anda atau email
      "User-Agent":
        "NextJsGenshinShowcase/1.0 (Contact: developer@example.com)",
    },
    next: { revalidate: 600 },
  });

  if (!res.ok) {
    if (res.status === 404) throw new Error("UID tidak ditemukan (404)");
    if (res.status === 429)
      throw new Error(
        "Terlalu banyak permintaan (429). Mohon tunggu beberapa saat."
      );
    if (res.status === 424)
      throw new Error(
        "Sistem sedang maintenance atau sedang ada pembaruan data."
      );
    if (res.status === 400) throw new Error("Format UID tidak valid (400).");
    throw new Error(`Gagal mengambil data dari Enka (Status: ${res.status})`);
  }

  const data = await res.json();

  // Kasus di mana pemain ditemukan, tapi showcase dimatikan/kosong
  if (!data.avatarInfoList || data.avatarInfoList.length === 0) {
    throw new Error(
      "Showcase karakter tidak aktif. Aktifkan 'Tampilkan Detail Karakter' di profil dalam game."
    );
  }

  return data;
}

export default async function PlayerPage({
  params,
}: {
  params: Promise<{ uid: string }>;
}) {
  const { uid } = await params; // Fix Next.js 15
  const data = await getEnkaData(uid);

  return (
    <div className="min-h-screen bg-[#0a0a0b] text-white p-8">
      <header className="mb-12">
        <h1 className="text-5xl font-black">{data.playerInfo.nickname}</h1>
        <div className="flex gap-4 mt-2 text-slate-400 italic">
          <span>AR {data.playerInfo.level}</span>
          {data.playerInfo.signature && (
            <span>&quot;{data.playerInfo.signature}&quot;</span>
          )}
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {data.avatarInfoList?.map((char) => {
          const meta = getCharacterData(char.avatarId);
          return (
            <div
              key={char.avatarId}
              className={`relative overflow-hidden rounded-3xl border-2 bg-gradient-to-br p-6 transition-transform hover:scale-105 ${getElementColor(
                meta?.SideIconName || ""
              )}`}
            >
              <div className="relative z-10">
                <h2 className="text-2xl font-bold">
                  {getCharacterName(char.avatarId)}
                </h2>
                <p className="text-sm opacity-70">
                  Lv. {char.propMap["4001"]?.val || "1"}
                </p>

                <div className="mt-4 space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span>Crit Rate</span>
                    <span>{(char.fightPropMap["20"] * 100).toFixed(1)}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Crit DMG</span>
                    <span>{(char.fightPropMap["22"] * 100).toFixed(1)}%</span>
                  </div>
                </div>
              </div>

              {meta && (
                <div className="absolute -bottom-4 -right-4 w-32 h-32 opacity-30">
                  <Image
                    src={`https://enka.network/ui/${meta.IconName}.png`}
                    alt="icon"
                    width={128}
                    height={128}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
