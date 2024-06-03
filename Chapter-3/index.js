# Connecting using MongoDB Drivers

# Using Node.js Driver
# Create a project directory
mkdir mongodb_book_project
cd mongodb_book_project

# Initialize a Node.js project
npm init -y

# Install the MongoDB Node.js driver
npm install mongodb@6.5

# Example Node.js script to connect and query MongoDB
const { MongoClient } = require("mongodb");

const uri = "<connection string uri>";
const client = new MongoClient(uri);

const run = async () => {
  try {
    const database = client.db("sample_training");
    const routes = database.collection("routes");
    const query = { src_airport: "JFK", "airline.id": 3201 };
    const route = await routes.findOne(query);
    console.log(route);
  } catch (error) {
    console.error(error);
  } finally {
    await client.close();
  }
};

run().catch(console.error);

# Execute the Node.js script
node index.js
