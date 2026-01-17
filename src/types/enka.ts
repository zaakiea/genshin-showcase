// src/types/enka.ts

export interface AvatarData {
  IconName: string;
  SideIconName: string;
  NameTextMapHash: number | string;
}

export type AvatarMap = Record<string, AvatarData>;
export type LocaleMap = Record<string, Record<string, string>>;

export interface EnkaResponse {
  playerInfo: {
    nickname: string;
    level: number;
    signature?: string;
  };
  avatarInfoList?: {
    avatarId: number;
    propMap: Record<string, { val?: string }>;
    fightPropMap: Record<string, number>;
    equipList: Array<{
      flat: {
        icon: string;
        itemType: string;
      };
    }>;
  }[];
}
