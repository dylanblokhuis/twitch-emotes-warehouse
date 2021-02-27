import { Cache, oak } from "../../deps.ts";

const ttl = 30000;
export const cache: Cache<string, object> = new Cache<string, object>(ttl);

export default async function (ctx: oak.Context, next: any) {
  const key = ctx.request.url.pathname;

  const result = cache.get(key);

  if (!result) {
    await next();
    if (ctx.response.body && typeof ctx.response.body === "object") {
      cache.set(key, ctx.response.body);
    }
  } else {
    ctx.response.body = result;
    ctx.response.headers.set("Cache-TTL", `${ttl}`);
  }
}
