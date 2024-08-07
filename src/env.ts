import dotenv from 'dotenv';

const env = process.env.NODE_ENV;
const envFile = `.env.${env}`;

dotenv.config({ path: envFile });

console.log(`Loaded environment variables from ${envFile}`);
