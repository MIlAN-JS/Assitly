import dotenv from 'dotenv';

dotenv.config();

const config = {
    MONGO_URI : String(process.env.MONGO_URI),
    PORT : Number(process.env.PORT),
    JWT_SECRET : String(process.env.JWT_SECRET),
}


export default config