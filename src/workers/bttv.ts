/**
 * Parameters
 * 
 * 1. ?offset={number}
 */
import fetcher from "../fetching/bttv.ts";
import type { Emote } from "../types.ts";

const url = new URL(import.meta.url);
const params = new URLSearchParams(url.searchParams);

console.log("BTTV worker started.");

const config = {
  batchSize: 1,
  requestInterval: 30000,
  limit: 100,
  maximum: 10000,
};

let offset = parseInt(params.get("offset") || "0");

async function exec() {
  for (let index = 0; index < config.batchSize; index++) {
    const result = await fetcher(offset, config.limit);

    const emotes: Emote[] = result
      .filter((item) => item.emote.imageType === "png")
      .map((item) => {
        return {
          id: item.emote.id,
          code: item.emote.code,
          platform: "bttv",
        };
      });

    // @ts-ignore
    self.postMessage({
      offset: offset,
      emotes,
    });

    offset += config.limit;

    if (offset >= config.maximum) {
      console.log("Reseting");
      offset = 0;
    }
  }
}

exec();

setInterval(async () => {
  await exec();
}, config.requestInterval);
