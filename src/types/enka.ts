// src/types/enka.ts

export interface AvatarData {
  IconName: string;
  SideIconName: string;
  NameTextMapHash: number | string;
  // Tambahkan field lain jika diperlukan dari avatars.json
}

export type AvatarMap = Record<string, AvatarData>;

export type LocaleMap = {
  [locale: string]: Record<string, string>;
};

export interface EnkaResponse {
  playerInfo: {
    nickname: string;
    level: number;
    signature?: string;
    finishAchievementNum?: number;
    towerFloorIndex?: number;
    towerLevelIndex?: number;
  };
  avatarInfoList: {
    avatarId: number;
    propMap: Record<string, { val?: string; type?: number }>;
    fightPropMap: Record<string, number>;
    skillLevelMap: Record<string, number>;
    equipList: Array<{
      flat: {
        nameTextMapHash: string;
        rankLevel: number;
        itemType: string;
        icon: string;
      };
    }>;
  }[];
}
