import { oak } from "../../deps.ts";
import { bttvCollection, ffzCollection } from "../db/mongo.ts";
import { cacheMiddleware } from "../middleware/mod.ts";
import { cache } from "../middleware/cache.ts";
import type { Emote } from "../types.ts";

const router = new oak.Router();

router.get("/v1/emotes", cacheMiddleware, async (ctx: oak.Context) => {
  const bttv = await bttvCollection.find().toArray();
  const ffz = await ffzCollection.find().toArray();

  let items: Emote[] = [];

  for (const item of bttv) {
    items = [...items, ...item.emotes];
  }

  for (const item of ffz) {
    items = [...items, ...item.emotes];
  }

  ctx.response.body = items;
});

router.get("/v1/emotes/bttv", async (ctx: oak.Context) => {
  const data = await bttvCollection.find().toArray();

  ctx.response.body = data;
});

router.get("/v1/emotes/ffz", async (ctx: oak.Context) => {
  const data = await ffzCollection.find().toArray();

  ctx.response.body = data;
});

export function clearCache() {
  cache.delete("/v1/emotes");
}

export default router;
