import { z } from 'zod';

export const appConfigSchema = z.object({
  DATABASE_CONNECTOR: z.string().min(1),
  DATABASE_USER: z.string().min(1),
  DATABASE_PASSWORD: z.string().min(1),
  DATABASE_PORT: z.string().regex(/\d+/, 'the port must be a number'),
  DATABASE_HOST: z.string().min(1),
  
  DATABASE_URL: z.string().url(),
  
  JWT_SECRET: z.string().min(1),
});

