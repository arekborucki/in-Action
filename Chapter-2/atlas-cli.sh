```bash
# Install the Atlas CLI using Homebrew
brew install mongodb-atlas

# Register for an Atlas account (follow instructions on screen)
atlas auth register

# Login to Atlas
atlas login

# Create an organization named "Manning Publications"
atlas organizations create "Manning Publications"

# List organizations to confirm creation and get the organization ID
atlas organizations list

# Set the organization ID in the Atlas CLI configuration
atlas config set org_id <your-organization-id>

# Create a project named "MongoDB 8.0 in Action"
atlas project create "MongoDB 8.0 in Action"

# List projects to confirm creation and get the project ID
atlas project list

# Set the project ID in the Atlas CLI configuration
atlas config set project_id <your-project-id>

# Create a MongoDB Atlas cluster named "MongoDB-in-Action" in the GCP Central US region with the M0 (free) tier
atlas cluster create "MongoDB-in-Action" --provider GCP --region CENTRAL_US --tier M0

# List clusters to confirm creation
atlas clusters list

# Load sample data into the newly created cluster
atlas clusters sampleData load "MongoDB-in-Action"

# Add the current IP address to the Atlas project access list
atlas accessList create --currentIp

# Create a database user named 'manning' with readWriteAnyDatabase privileges (you will be prompted to set a password)
atlas dbusers create readWriteAnyDatabase --username manning

# List database users to confirm creation
atlas dbusers list

# Describe the connection strings to connect to your MongoDB Atlas cluster
atlas clusters connectionStrings describe "MongoDB-in-Action"

# Connect to MongoDB using mongosh with the newly created user 'manning' (you will be prompted for the password)
mongosh "mongodb+srv://mongodb-in-action.fpomkk.mongodb.net" --username 'manning'
