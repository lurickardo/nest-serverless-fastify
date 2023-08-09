export const config = Object.freeze({
  app: {
    port: Number(process.env.PORT),
    environment: process.env.APP_ENVIRONMENT,
  },
});
