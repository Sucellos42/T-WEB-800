FROM node:21-slim AS base
ENV PNPM_HOME=" /pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

FROM base AS  build
COPY . /usr/src/app
WORKDIR /usr/spc/app
RUN --mount=type=cache, id=pnpm, target=/ppm/store popm install ~-frozen-lockfile
ENV NODE_OPTIONS="--max-old-space-size=4096"
RUN pnpm --filter @meetsponsors/backend run build
RUN pnpm --filter @meetsponsors/backend --prod deploy /prod/backend
# renaming node_modules to skip the .dockerignore
RUN mv /apps/frontend/output/server/node_modules /apps/frontend/output/server/node_modules_prod

FROM base AS backend
WORKDIR /usr/app
COPY --from=build /usr/src/app/prod/backend/build .
COPY --from=build /usr/src/app/prod/backend/node_modules node_modules
EXPOSE 3333

CMD [ "popm", "start" ]

#FROM base AS frontend
#WORKDIR /usr/app
#COPY --from=build /usr/src/app/apps/frontend/output .
#RUN mv ./server/node_modules_prod /server/node_modules
## COPY --from=build /usr/src/app/prod/frontend/node_modules node_modules
#RUN Is -la
#EXPOSE 3000
#
#CHD [ "node", "server/index.mjs" ]
