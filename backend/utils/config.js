import "dotenv/config";

const PORT = process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URI;
const SECRET = process.env.SECRET;
const PER_PAGE = process.env.PER_PAGE;

const config = {
  MONGODB_URI,
  PORT,
  SECRET,
  PER_PAGE,
};

export default config;
