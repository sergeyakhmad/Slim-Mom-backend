const app = require("./app");
const { connectMongo } = require("./db/connection");
require("dotenv").config();

const start = async () => {
  try {
    await connectMongo();
    console.log("Database connection successful");

    app.listen(process.env.PORT || 3000, () => {
      console.log(`Server running. Use our API on port: ${process.env.PORT}`);
    });
  } catch (error) {
    console.error(`Failed to launch application with error: ${error.message}`);
    process.exit(1);
  }
};

start();
