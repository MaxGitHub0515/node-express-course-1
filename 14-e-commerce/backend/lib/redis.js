import Redis from 'ioredis';
import dotenv from 'dotenv'; // reason - standalone file

dotenv.config({path: ".env.local"})

export const redis = new Redis(process.env.UPSTASH_RESIS_URL);
await redis.set('foo', 'bar');