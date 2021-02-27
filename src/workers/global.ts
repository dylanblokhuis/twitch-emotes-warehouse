import {
  fetchBttvGlobal,
  fetchFfzGlobal,
  fetchTwitchGlobal,
} from "../fetching/global.ts";

console.log("Global Twitch Emotes worker started.");

async function exec() {
  // @ts-ignore
  self.postMessage({
    emotes: await fetchTwitchGlobal(),
    platform: "twitch",
  });

  // @ts-ignore
  self.postMessage({
    emotes: await fetchBttvGlobal(),
    platform: "bttv",
  });

  // @ts-ignore
  self.postMessage({
    emotes: await fetchFfzGlobal(),
    platform: "ffz",
  });
}

exec();
