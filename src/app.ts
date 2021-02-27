import { oak } from "../deps.ts";
import emotesRouter from "./routers/emotes.ts";
import errorHandler from "./error.ts";
import {
  startBttvWorker,
  startFfzWorker,
  startGlobalWorker,
} from "./workers/mod.ts";

startGlobalWorker();
startBttvWorker();
startFfzWorker();

const env = Deno.env.toObject();
const PORT = env.PORT || 3000;
const HOST = env.HOST || "localhost";

const router = new oak.Router();
router.get("/", (ctx: oak.Context) => {
  ctx.response.body = "Healthy!";
});

const app = new oak.Application();
app.use(errorHandler);
app.use(router.routes());
app.use(router.allowedMethods());
app.use(emotesRouter.routes());
app.use(emotesRouter.allowedMethods());

console.log(`Server listening at port ${PORT}`);
await app.listen({
  hostname: HOST,
  port: typeof PORT === "string" ? parseInt(PORT) : PORT,
});
