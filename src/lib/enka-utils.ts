// src/lib/enka-utils.ts
import avatarsData from "@/data/gi/avatars.json";
import locData from "@/data/loc.json";
import { AvatarMap, LocaleMap } from "@/types/enka";

// Cast data JSON ke tipe yang sudah didefinisikan
const avatars = avatarsData as AvatarMap;
const locs = locData as LocaleMap;

export function getCharacterName(
  avatarId: number,
  locale: string = "id"
): string {
  const charId = avatarId.toString();
  const character = avatars[charId];

  if (!character) return "Unknown Character";

  const hash = character.NameTextMapHash.toString();

  // Ambil bahasa, default ke 'en' jika locale yang diminta tidak ada
  const translations = locs[locale] || locs["en"];

  return translations?.[hash] || "Unknown Name";
}

export function getStatLabel(statId: string): string {
  const stats: Record<string, string> = {
    "20": "Crit Rate",
    "22": "Crit DMG",
    "23": "Energy Recharge",
    "40": "Pyro DMG Bonus",
    "41": "Electro DMG Bonus",
    "42": "Hydro DMG Bonus",
    "43": "Dendro DMG Bonus",
    "44": "Anemo DMG Bonus",
    "45": "Geo DMG Bonus",
    "46": "Cryo DMG Bonus",
  };
  return stats[statId] || "Other Stat";
}
