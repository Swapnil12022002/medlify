import "dotenv/config";
import app from "./app";
import mongoConnection from "../config/database";
import env from "./utils/validateEnv";

const port = env.PORT;

const appStart = async (): Promise<void> => {
  try {
    await mongoConnection(env.MONGO_URI);
    app.listen(port, () => {
      console.log(`Server running on port: ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

appStart();
