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
