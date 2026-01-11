
import Stripe from "stripe";
import dotenv from "dotenv";
dotenv.config({path: ".env.local"});

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
