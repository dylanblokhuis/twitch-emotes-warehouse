import type { BttvResponse } from "../types.ts";

export default async function fetcher(
  offset = 0,
  limit = 100,
): Promise<BttvResponse[]> {
  const url =
    `https://api.betterttv.net/3/emotes/shared/top?offset=${offset}&limit=${limit}`;

  console.log("Fetching from bttv", url);

  try {
    const response = await fetch(
      url,
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    if (response.ok) {
      return await response.json();
    } else {
      throw new Error(response.statusText);
    }
  } catch (e) {
    console.error(e);
    return [];
  }
}
