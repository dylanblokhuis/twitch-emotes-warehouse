import type { BttvEmote, Emote, FfzResponse, TwitchEmote } from "../types.ts";

export async function fetchTwitchGlobal(): Promise<Emote[]> {
  const url = `https://api.twitch.tv/kraken/chat/emoticon_images?emotesets=0`;

  console.log("Fetching global emotes from Twitch", url);

  try {
    const response = await fetch(
      url,
      {
        headers: {
          "Accept": "application/vnd.twitchtv.v5+json",
        },
      },
    );

    if (response.ok) {
      const { emoticon_sets } = await response.json();

      return emoticon_sets["0"].map((emote: TwitchEmote) => {
        return {
          ...emote,
          platform: "twitch",
        };
      });
    } else {
      throw new Error(response.statusText);
    }
  } catch (e) {
    console.error(e);
    return [];
  }
}

export async function fetchBttvGlobal(): Promise<Emote[]> {
  const url = `https://api.betterttv.net/3/cached/emotes/global`;

  console.log("Fetching global emotes from BTTV", url);

  try {
    const response = await fetch(
      url,
      {
        headers: {
          "Accept": "application/json",
        },
      },
    );

    if (response.ok) {
      const items = await response.json();

      return items.map((emote: BttvEmote) => {
        return {
          id: emote.id,
          code: emote.code,
          platform: "bttv",
        };
      });
    } else {
      throw new Error(response.statusText);
    }
  } catch (e) {
    console.error(e);
    return [];
  }
}

export async function fetchFfzGlobal(): Promise<Emote[]> {
  const url = `https://api.frankerfacez.com/v1/set/global`;

  console.log("Fetching global emotes from FFZ", url);

  try {
    const response = await fetch(
      url,
      {
        headers: {
          "Accept": "application/json",
        },
      },
    );

    if (response.ok) {
      const { sets } = await response.json();

      return sets["3"].emoticons.map((emote: FfzResponse) => {
        return {
          id: `${emote.id}`,
          code: emote.name,
          platform: "ffz",
        };
      });
    } else {
      throw new Error(response.statusText);
    }
  } catch (e) {
    console.error(e);
    return [];
  }
}
