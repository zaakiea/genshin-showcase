import { EnkaResponse } from "@/types/enka";
import {
  getCharacterName,
  getElementColor,
  getCharacterData,
} from "@/lib/enka-utils";

async function getEnkaData(uid: string): Promise<EnkaResponse> {
  const res = await fetch(`https://enka.network/api/uid/${uid}/`, {
    next: { revalidate: 600 },
  });
  if (!res.ok) throw new Error("Profil tidak ditemukan");
  return res.json();
}

export default async function PlayerPage({
  params,
}: {
  params: Promise<{ uid: string }>;
}) {
  const { uid } = await params;
  const data = await getEnkaData(uid);

  return (
    <div className="min-h-screen bg-[#0a0a0b] p-6 lg:p-12">
      {/* Header Profil */}
      <div className="mb-12 flex flex-col items-center gap-4 text-center md:items-start md:text-left">
        <h1 className="text-6xl font-black text-white">
          {data.playerInfo.nickname}
        </h1>
        <div className="flex gap-4">
          <span className="rounded-full bg-yellow-400/10 px-4 py-1 font-bold text-yellow-400 border border-yellow-400/20">
            Adventure Rank {data.playerInfo.level}
          </span>
          <span className="text-slate-500 italic">
            &quot;{data.playerInfo.signature}&quot;
          </span>
        </div>
      </div>

      {/* Grid Karakter */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {data.avatarInfoList?.map((char) => {
          const charMeta = getCharacterData(char.avatarId);
          return (
            <div
              key={char.avatarId}
              className={`group relative overflow-hidden rounded-[2rem] border-2 bg-gradient-to-br p-6 transition-all hover:-translate-y-2 ${getElementColor(
                charMeta?.SideIconName.split("_")[2] || "Geo"
              )}`}
            >
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-2xl font-bold text-white leading-tight">
                    {getCharacterName(char.avatarId)}
                  </h2>
                  <span className="text-white/60 font-mono text-sm">
                    Lv. {char.propMap["4001"].val}
                  </span>
                </div>

                {/* Statistik Sederhana */}
                <div className="space-y-3">
                  <StatRow
                    label="Crit Rate"
                    value={(char.fightPropMap["20"] * 100).toFixed(1) + "%"}
                  />
                  <StatRow
                    label="Crit DMG"
                    value={(char.fightPropMap["22"] * 100).toFixed(1) + "%"}
                  />
                  <StatRow
                    label="Energy Recharge"
                    value={(char.fightPropMap["23"] * 100).toFixed(1) + "%"}
                  />
                  <StatRow
                    label="Attack"
                    value={Math.round(char.fightPropMap["2001"]).toString()}
                  />
                </div>
              </div>

              {/* Dekorasi Latar Belakang */}
              <div className="absolute -bottom-4 -right-4 h-32 w-32 opacity-20 grayscale transition-all group-hover:opacity-40 group-hover:grayscale-0">
                <img
                  src={`https://enka.network/ui/${charMeta?.IconName}.png`}
                  alt="bg"
                  className="object-contain"
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function StatRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between border-b border-white/5 pb-1">
      <span className="text-sm text-white/50">{label}</span>
      <span className="font-bold text-white">{value}</span>
    </div>
  );
}
