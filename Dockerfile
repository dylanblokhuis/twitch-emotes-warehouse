FROM hayd/deno:alpine-1.7.2

WORKDIR /app

RUN deno install -qAf --unstable https://deno.land/x/denon/denon.ts

COPY . .

RUN deno cache src/app.ts
RUN deno cache src/workers/*.ts

EXPOSE 3000

CMD ["deno", "run", "--allow-env", "--allow-net", "--allow-read", "src/app.ts"]
