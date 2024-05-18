import dotenv from 'dotenv';

if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}
const monDebug = process.env.MONGO_DEBUG === 'true' || false;
const dbUrl: string = process.env.BD_URL as string;

const config = {
  port: process.env.PORT || 3000,
  host: process.env.HOST || 'http://localhost:3000',
  dbUrl: dbUrl,
  monDebug: monDebug,
  JWT_KEY: process.env.JWT_KEY,
  dev: process.env.NODE_ENV !== "production",
  serviceAccount: {
    type: "service_account",
    project_id: process.env.PROJECT_ID,
    private_key_id: process.env.PRIVATE_KEY_ID,
    private_key: process.env.PRIVATE_KEY?.replace(/\\n/g, '\n'),
    client_email: process.env.CLIENT_EMAIL,
    client_id: process.env.CLIENT_ID,
    auth_uri: process.env.AUTH_URI,
    token_uri: process.env.TOKEN_URI,
    auth_provider_x509_cert_url: process.env.AUTH_PROVIDER_X509_CERT_URL,
    client_x509_cert_url: process.env.CLIENT_X509_CERT_URL,
    universe_domain: process.env.UNIVERSE_DOMAIN
  },
  mailer: {
    host: process.env.MAILER_HOST,
    port: process.env.MAILER_PORT,
    user: process.env.MAILER_USER,
    pass: process.env.MAILER_PASS,
    secure: process.env.MAILER_SECURE || false,
  },
  cloudinary: {
    CLOUD_NAME: process.env.CLOUD_NAME,
    CLOUDINARY_KEY: process.env.CLOUDINARY_KEY,
    CLOUDINARY_SECRET: process.env.CLOUDINARY_SECRET,
    FOLDER_NAME: process.env.FOLDER_NAME
  },
};



export default config;