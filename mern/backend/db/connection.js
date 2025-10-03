import { MongoClient, ServerApiVersion } from "mongodb";

const URI = "mongodb://mongodb:27017";
const client = new MongoClient(URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

let db;

async function connectToMongo() {
  try {
    // Connect the client to the server
    await client.connect();

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. Successfully connected to MongoDB!");

    // Set the database instance
    db = client.db("employees");
    return db;
  } catch (err) {
    console.error("MongoDB connection failed:", err);
    process.exit(1); // Exit process on failure
  }
}

// Ensure proper disconnection on process termination
process.on("SIGINT", async () => {
  if (client.isConnected()) {
    await client.close();
    console.log("MongoDB connection closed due to process termination");
  }
  process.exit(0);
});

export default connectToMongo;
