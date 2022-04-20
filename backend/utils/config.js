import "dotenv/config";

const PORT = process.env.PORT;
let MONGODB_URI = process.env.MONGODB_URI;

const config = {
  MONGODB_URI,
  PORT,
};

export default config;
