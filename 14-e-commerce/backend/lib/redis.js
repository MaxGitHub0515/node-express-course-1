import { Redis } from '@upstash/redis'
import dotenv from 'dotenv'; // reason - standalone file

dotenv.config({path: ".env.local"})

export const redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
});
if(!redis) {
    console.error("Redis connection failed");
} else {
    console.log("Redis connected successfully!!!");
}
await redis.set('foo', 'bar');