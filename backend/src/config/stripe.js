import Stripe from "stripe"
import config from "./env.config.js"

const stripe = new Stripe (config.STRIPE_PRICE_ID)


export default stripe