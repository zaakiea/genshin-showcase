// src/lib/enka-utils.ts
import fs from "fs";
import path from "path";
import { AvatarMap, LocaleMap } from "@/types/enka";

// Fungsi untuk membaca JSON secara manual agar tidak merusak build/bundler
function readLocalJson(filePath: string) {
  try {
    const fullPath = path.join(process.cwd(), filePath);
    const fileContent = fs.readFileSync(fullPath, "utf8");
    return JSON.parse(fileContent);
  } catch (error) {
    console.error(`Gagal membaca file: ${filePath}`, error);
    return {};
  }
}

export function getCharacterData(avatarId: number) {
  const avatars = readLocalJson("src/data/gi/avatars.json") as AvatarMap;
  return avatars[avatarId.toString()];
}

export function getCharacterName(
  avatarId: number,
  locale: string = "id"
): string {
  const avatars = readLocalJson("src/data/gi/avatars.json") as AvatarMap;
  const locs = readLocalJson("src/data/loc.json") as LocaleMap;

  const character = avatars[avatarId.toString()];
  if (!character) return "Unknown";

  const hash = character.NameTextMapHash.toString();
  const translations = locs[locale] || locs["en"];
  return translations?.[hash] || "Unknown";
}
