import { oak } from "../deps.ts";

async function errorHandler(ctx: oak.Context, next: any) {
  try {
    await next();
  } catch (err) {
    ctx.response.status = 500;
    ctx.response.body = { message: err.message };
  }
}

export default errorHandler;
