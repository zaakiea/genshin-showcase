// src/lib/enka-utils.ts
import fs from "fs";
import path from "path";
import { AvatarMap, LocaleMap } from "@/types/enka";

function readLocalJson(relativePatah: string) {
  try {
    const fullPath = path.join(process.cwd(), relativePatah);
    const content = fs.readFileSync(fullPath, "utf8");
    return JSON.parse(content);
  } catch (error) {
    console.error("Error reading JSON:", relativePatah, error);
    return {};
  }
}

export function getCharacterName(
  avatarId: number,
  locale: string = "id"
): string {
  const avatars = readLocalJson("src/data/gi/avatars.json") as AvatarMap;
  const locs = readLocalJson("src/data/loc.json") as LocaleMap;

  const charData = avatars[avatarId.toString()];
  if (!charData) return "Unknown";

  const hash = charData.NameTextMapHash.toString();
  return (locs[locale] || locs["en"])[hash] || "Unknown";
}

export function getCharacterData(avatarId: number) {
  const avatars = readLocalJson("src/data/gi/avatars.json") as AvatarMap;
  return avatars[avatarId.toString()];
}

export function getElementColor(sideIconName: string) {
  const element = sideIconName.split("_")[2]; // Mengambil 'Pyro', 'Hydro', dll
  const colors: Record<string, string> = {
    Pyro: "from-red-500/20 to-red-900/40 border-red-500/50",
    Hydro: "from-blue-500/20 to-blue-900/40 border-blue-500/50",
    Anemo: "from-emerald-400/20 to-emerald-900/40 border-emerald-400/50",
    Electro: "from-purple-500/20 to-purple-900/40 border-purple-500/50",
    Dendro: "from-green-500/20 to-green-900/40 border-green-500/50",
    Cryo: "from-cyan-300/20 to-cyan-900/40 border-cyan-300/50",
    Geo: "from-yellow-500/20 to-yellow-900/40 border-yellow-500/50",
  };
  return colors[element] || "from-slate-800 to-slate-900 border-slate-700";
}
