import { FfzResponse } from "../types.ts";

export default async function fetcher(
  page = 1,
  limit = 100,
): Promise<FfzResponse[]> {
  const url =
    `https://api.frankerfacez.com/v1/emotes?sort=count-desc&page=${page}&per_page=${limit}`;

  console.log("Fetching from ffz", url);
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
      const { emoticons } = await response.json();
      return emoticons;
    } else {
      throw new Error(response.statusText);
    }
  } catch (e) {
    console.error(e);
    return [];
  }
}
