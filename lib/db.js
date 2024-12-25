import { MongoClient, ServerApiVersion } from "mongodb";

if (!process.env.MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}

const uri = process.env.MONGODB_URI;
const options = {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
};

let client;

if (process.env.NODE_ENV === "development") {
  if (!globalThis._mongoClient) {
    globalThis._mongoClient = new MongoClient(uri, options);
  }
  client = globalThis._mongoClient;
} else {
  client = new MongoClient(uri, options);
}

async function connectToDatabase() {
  try {
    await client.connect();
    console.log("Connected to MongoDB successfully");
  } catch (err) {
    console.error("Failed to connect to MongoDB:", err);
  }
}
connectToDatabase();

export default client;
