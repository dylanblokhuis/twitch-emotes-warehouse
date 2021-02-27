import { bttvCollection, ffzCollection } from "../db/mongo.ts";
import { clearCache } from "../routers/emotes.ts";
import type { BttvRequest, FfzRequest } from "../types.ts";

export function startBttvWorker(offset = 0) {
  console.log("Starting BTTV Worker");

  const worker = new Worker(
    new URL(`./bttv.ts?offset=${offset}`, import.meta.url).href,
    {
      type: "module",
    },
  );

  worker.onmessage = async (
    { data }: { data: BttvRequest },
  ) => {
    const { matchedCount } = await bttvCollection
      .updateOne(
        {
          offset: {
            $eq: data.offset,
          },
        },
        {
          $set: { emotes: data.emotes },
        },
      );

    // if doesnt exist, create it.
    if (matchedCount === 0) {
      await bttvCollection.insert({
        offset: data.offset,
        emotes: data.emotes,
      });
    }

    clearCache();
  };
}

export function startFfzWorker(page = 1) {
  console.log("Starting FFZ Worker");

  const worker = new Worker(
    new URL(`./ffz.ts?page=${page}`, import.meta.url).href,
    {
      type: "module",
    },
  );

  worker.onmessage = async (
    { data }: { data: FfzRequest },
  ) => {
    const { matchedCount } = await ffzCollection
      .updateOne(
        {
          page: {
            $eq: data.page,
          },
        },
        {
          $set: { emotes: data.emotes },
        },
      );

    // if doesnt exist, create it.
    if (matchedCount === 0) {
      await ffzCollection.insert({
        page: data.page,
        emotes: data.emotes,
      });
    }

    clearCache();
  };
}
