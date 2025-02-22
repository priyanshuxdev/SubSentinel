import { config } from 'dotenv';

config({ path: `.env.${process.env.NODE_ENV || 'development'}.local`});

export const {
    PORT,
    NODE_ENV,
    DB_URI,
    JWT_SECRET,
    JWT_EXPIRES_IN,
    ARCJET_KEY,
    ARCJET_ENV,
    QSTASH_URL,
    QSTASH_TOKEN,
    QSTASH_CURRENT_SIGNING_KEY,
    QSTASH_NEXT_SIGNING_KEY,
    SERVER_URL,
    EMAIL_PASSWORD
} = process.env;


//TOKEN = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2N2FlZjM4OWJlYWRkZGI4OWI0MmU4MmMiLCJpYXQiOjE3Mzk1MTg4NTcsImV4cCI6MTczOTYwNTI1N30.Kypdb1ct5u2C39zxm76g6OXGhDglAPxXUOEdtR4Ohr0
//_ID = 67aef389beadddb89b42e82c