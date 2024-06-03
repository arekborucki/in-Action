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
