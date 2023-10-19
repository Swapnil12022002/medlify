import { cleanEnv } from "envalid";
import { port, str } from "envalid/dist/validators";

export default cleanEnv(process.env, {
  MONGO_URI: str(),
  PORT: port(),
  JWT_SECRET: str(),
  EMAIL: str(),
  PASS: str(),
  GOOGLE_MAPS_API_KEY: str(),
});
