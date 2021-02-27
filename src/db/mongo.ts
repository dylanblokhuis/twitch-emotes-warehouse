import { MongoClient } from "../../deps.ts";
import type { BttvRequest, FfzRequest, GlobalRequest } from "../types.ts";

const env = Deno.env.toObject();
const MONGODB_HOST = env.MONGODB_HOST || "localhost";

const client = new MongoClient();
await client.connect(
  `mongodb://${MONGODB_HOST}:27017`,
);

const db = client.database("emotes");

interface GlobalSchema extends GlobalRequest {
  _id: { $oid: string };
}

interface BttvSchema extends BttvRequest {
  _id: { $oid: string };
}

interface FfzSchema extends FfzRequest {
  _id: { $oid: string };
}

const globalCollection = db.collection<GlobalSchema>("global");
const bttvCollection = db.collection<BttvSchema>("bttv");
const ffzCollection = db.collection<FfzSchema>("ffz");

export { bttvCollection, ffzCollection, globalCollection };
