/**
 * Parameters
 * 
 * 1. ?page={number}
 */
import fetcher from "../fetching/ffz.ts";
import type { Emote } from "../types.ts";

const url = new URL(import.meta.url);
const params = new URLSearchParams(url.searchParams);

console.log("FFZ worker started.");

const config = {
  batchSize: 1,
  requestInterval: 30000,
  limit: 100,
  maximum: 100,
};

let page = parseInt(params.get("page") || "1");

async function exec() {
  for (let index = 0; index < config.batchSize; index++) {
    const result = await fetcher(page, config.limit);

    const emotes: Emote[] = result
      .map((item) => {
        return {
          id: `${item.id}`,
          code: item.name,
          platform: "ffz",
        };
      });

    // @ts-ignore
    self.postMessage({
      page: page,
      emotes,
    });

    page++;

    if (page >= config.maximum) {
      console.log("Reseting");
      page = 1;
    }
  }
}

exec();

setInterval(async () => {
  await exec();
}, config.requestInterval);
