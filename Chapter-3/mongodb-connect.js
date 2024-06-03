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

# Configuring mongosh
# Display the current configuration
config

# Set an external editor to 'vi'
config.set("editor", "vi")

# Set the history length to 3000
config.set("historyLength", 3000)

# Verify the configuration changes
config.get("historyLength")
