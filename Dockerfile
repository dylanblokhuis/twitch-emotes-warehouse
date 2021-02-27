FROM hayd/deno:alpine-1.7.2

WORKDIR /app

RUN deno install -qAf --unstable https://deno.land/x/denon/denon.ts

COPY . .

EXPOSE 3000

CMD ["deno", "run", "-A", "src/app.ts"]
