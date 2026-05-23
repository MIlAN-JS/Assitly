import dotenv from 'dotenv';

dotenv.config();

const config = {
    MONGO_URI : String(process.env.MONGO_URI),
    PORT : process.env.PORT || 5000,
    JWT_SECRET : String(process.env.JWT_SECRET),
    RESEND_API_KEY : String(process.env.RESEND_API_KEY)
}


export default config