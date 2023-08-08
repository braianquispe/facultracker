export default {
  PORT: process.env.PORT ? Number(process.env.PORT) : 3000,
} as const;
