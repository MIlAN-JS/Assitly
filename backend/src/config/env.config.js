import dotenv from 'dotenv';

dotenv.config();

const config = {
    MONGO_URI : String(process.env.MONGO_URI),
    PORT : process.env.PORT || 5000,
    JWT_SECRET : String(process.env.JWT_SECRET),
    RESEND_API_KEY : String(process.env.RESEND_API_KEY),
     GOOGLE_CLIENT_ID : process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET : process.env.GOOGLE_CLIENT_SECRET,
    GOOGLE_CALLBACK_URL : process.env.GOOGLE_CALLBACK_URL,
    GITHUB_CLIENT_ID : process.env.GITHUB_CLIENT_ID,
    GITHUB_CLIENT_SECRET : process.env.GITHUB_CLIENT_SECRET,
    GITHUB_CALLBACK_URL : process.env.GITHUB_CALLBACK_URL, 
   STRIPE_PRICE_ID : process.env.STRIPE_PRICE_ID, 
   IMAGEKIT_PRIVATE_KEY : process.env.IMAGEKIT_PRIVATE_KEY, 
   IMAGEKIT_PUBLIC_KEY : process.env.IMAGEKIT_PUBLIC_KEY, 
   IMAGEKIT_ENDPOINT : process.env.IMAGEKIT_ENDPOINT, 
   MISTRAL_API_KEY : process.env.MISTRAL_API_KEY, 
   PINECONE_API_KEY : process.env.PINECONE_API_KEY
}


export default config