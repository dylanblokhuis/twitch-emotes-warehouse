export interface TwitchResponse {
  emoticon_sets: {
    [key: string]: TwitchEmote;
  };
}

export interface TwitchEmote {
  id: number;
  code: string;
}

export interface BttvResponse {
  emote: BttvEmote;
  total: number;
}

export interface BttvEmote {
  id: string;
  code: string;
  imageType: "png" | "gif";
  user: {
    id: string;
    name: string;
    displayName: string;
    providerId: string;
  };
}

export interface FfzResponse {
  id: number;
  name: string;
  height: number;
  width: number;
  public: boolean;
  hidden: boolean;
  modifier: boolean;
  status: number;
  usage_count: number;
  created_at: Date;
  last_updated: Date;
}

export interface Emote {
  id: string;
  code: string;
  platform: Platform;
}

export type Platform = "bttv" | "ffz" | "twitch";

export interface GlobalRequest {
  platform: Platform;
  emotes: Emote[];
}

export interface BttvRequest {
  offset: number;
  emotes: Emote[];
}

export interface FfzRequest {
  page: number;
  emotes: Emote[];
}
