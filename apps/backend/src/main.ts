import app from './app';
import { connectToDB } from './config/database';
import { config } from './config';

const startServer = async () => {
  try {
    await connectToDB();
    app.listen(config.port, () => {
      console.log(`Server running on port ${config.port}`);
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

startServer();
