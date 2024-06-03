```bash

# Connecting to MongoDB Atlas
# Use the mongosh command with SRV connection string, credentials, and options
mongosh "mongodb+srv://YOUR_CLUSTER.YOUR_HASH.mongodb.net/" --apiVersion API_VERSION --username USERNAME --password PASSWD

# Connecting to Self-Hosted Deployments
# Use mongosh to establish connections to local or remote MongoDB deployments
mongosh "mongodb://mongodb1.example.com:27017" --username book --password my_password --authenticationDatabase admin

# Performing operations
# Display the current database
db

# Display the list of databases
show dbs

# Change to the 'admin' database
use admin

# MongoDB Shell Help
help

# Display database methods
db.help()

# Display collection methods
db.collection.help()

# Running scripts in mongosh
# Example script to print MongoDB server details
function printMongoDBDetailsSimplified() {
  const dayjs = require('dayjs');
  const relativeTime = require('dayjs/plugin/relativeTime');
  dayjs.extend(relativeTime);

  try {
    const adminDB = db.getSiblingDB('admin');
    const serverStatus = adminDB.serverStatus();
    console.log("MongoDB Version:", serverStatus.version);
    console.log("Host:", serverStatus.host);
    console.log("Uptime:", dayjs().subtract(serverStatus.uptime, "second").fromNow(true));
    console.log("Currently open connections:", serverStatus.connections.current);
  } catch (err) {
    console.error("Failed to retrieve server status. Error:", err.message);
  }
}

printMongoDBDetailsSimplified();

# Load and run the script
load("/scripts/mongodb-script.js")

# Configuring mongosh
# Display the current configuration
config

# Set an external editor to 'vi'
config.set("editor", "vi")

# Set the history length to 3000
config.set("historyLength", 3000)

# Verify the configuration changes
config.get("historyLength")

# Using .mongoshrc.js to customize mongosh
# Example .mongoshrc.js script to switch to a specific database
const targetDatabase = "sample_training";

function switchToDatabase() {
  const currentDatabase = db.getName();
  if (currentDatabase !== targetDatabase) {
    print(`Switching to database: ${targetDatabase}`);
    db = db.getSiblingDB(targetDatabase);
  }
}

switchToDatabase();

# Playing with MongoDB Compass
# Download and install MongoDB Compass
# Connect to your MongoDB Atlas cluster using the URI from the Atlas GUI

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

# Using PyMongo (Python Driver)
# Install the PyMongo driver
python3 -m pip install pymongo

# Example PyMongo script to connect and query MongoDB
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from pprint import pprint

uri = "<connection_string>"
client = MongoClient(uri, server_api=ServerApi('1'))

database = client['sample_training']
routes_collection = database['routes']
query = {"src_airport": "JFK", "airline.id": 3201}

try:
  route = routes_collection.find_one(query)
  if route:
    print("Found a route:")
    pprint(route)
  else:
    print("No route found from JFK.")
except Exception as e:
  print(f"An error occurred: {e}")
finally:
  client.close()

# Execute the PyMongo script
python3 mongodb-pymongo.py

# Using Motor (Python Async Driver)
# Install the Motor driver
python3 -m pip install motor

# Example Motor script to connect and query MongoDB asynchronously
import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
from pymongo.server_api import ServerApi
from pprint import pprint

uri = "<connection_string>"

async def find_route():
  client = AsyncIOMotorClient(uri, server_api=ServerApi('1'))
  try:
    database = client['sample_training']
    routes_collection = database['routes']
    query = {"src_airport": "JFK", "airline.id": 3201}
    route = await routes_collection.find_one(query)
    if route:
      print("Found a route:")
      pprint(route)
    else:
      print("No route found from JFK.")
  except Exception as e:
    print(f"An error occurred: {e}")
  finally:
    client.close()

asyncio.run(find_route())

# Execute the Motor script
python3 mongodb-motor.py

# Using Ruby Driver
# Install the MongoDB Ruby driver
gem install mongo

# Example Ruby script to connect and query MongoDB
require 'mongo'

uri = "<connection string uri>"
client = Mongo::Client.new(uri)

begin
  database = client.use("sample_training")
  routes = database[:routes]
  query = { 'src_airport' => 'JFK' }
  route = routes.find(query).first
  puts route
rescue => error
  puts error.message
ensure
  client.close
end

# Execute the Ruby script
ruby mongodb-ruby.rb

# Learning Mongoid
# Install Mongoid ODM
gem install mongoid

# Include Mongoid in your Gemfile
gem 'mongoid', '~> 8.1.0'
